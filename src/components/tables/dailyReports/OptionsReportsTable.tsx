import React, {SetStateAction} from 'react';
import {
    Button, Flex,
    Grid,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, VStack
} from "@chakra-ui/react";
import {AddIcon, ChevronDownIcon, DownloadIcon} from "@chakra-ui/icons";
import ColumnVisiblityPopover from "../addons/ColumnVisiblityPopover";
import {Table} from "@tanstack/react-table";
import {IDailyReport} from "../../../models/dto/IDailyReport";
import {IDepartment} from "../../../models/dto/IDepartment";
import {DatePeriod} from "../../../models/payments/DatePeriod";
import DailyReportService from "../../../services/DailyReportService";

const OptionsReportsTable = (
    {
        table,
        departments,
        setDepartments,
        currentDepartment,
        setCurrentDepartment,
        period,
        setPeriod,
        onOpen,
        setCurrentGlobalDailyReport,
        dateStart,
        setDateStart,
        dateFinish,
        setDateFinish,
    }: {
        table: Table<IDailyReport>,
        departments: IDepartment[],
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        currentDepartment: IDepartment,
        setCurrentDepartment: React.Dispatch<SetStateAction<IDepartment>>,
        period: DatePeriod,
        setPeriod: React.Dispatch<SetStateAction<DatePeriod>>,
        onOpen: () => any,
        setCurrentGlobalDailyReport: React.Dispatch<SetStateAction<IDailyReport>>,
        dateStart: Date | null,
        setDateStart: React.Dispatch<SetStateAction<Date | null>>,
        dateFinish: Date | null,
        setDateFinish: React.Dispatch<SetStateAction<Date | null>>,
    }
) => {

    function downloadReportsTable() {

        // @ts-ignore
        const curPer = Object.keys(DatePeriod).find(o => DatePeriod[o] === period)
        if (curPer && currentDepartment.id) {
            try {
                DailyReportService.exportReportsTable(
                    currentDepartment.id,
                    curPer,
                    dateStart?.toISOString().substring(0, 10) || null,
                    dateFinish?.toISOString().substring(0, 10) || null
                ).then((response) => {
                    // create file link in browser's memory
                    const href = URL.createObjectURL(response.data);

                    // create "a" HTML element with href to file & click
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'reports.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                    // clean up "a" element & remove ObjectURL
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                });
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Grid gridTemplateAreas={'"selection actions" "filters actions"'}
              gridTemplateRows={'auto auto'}
              gridTemplateColumns={'1fr 45px'}
              gridGap={2}
              position={'relative'}
              top={-4}
        >
            <Flex gridArea={"selection"}
                  gap={3}
                  flexWrap={'wrap'}
            >
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {currentDepartment.name}
                    </MenuButton>
                    <MenuList>
                        {departments.map(department =>
                            <MenuItem onClick={() => setCurrentDepartment(department)}
                                      key={department.id}
                            >
                                {department.name}
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {period}
                    </MenuButton>
                    <MenuList>
                        {Object.values(DatePeriod).map(datePeriod =>
                            <MenuItem onClick={() => setPeriod(datePeriod)}
                                      key={datePeriod}
                            >
                                {datePeriod}
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
            <Flex gridArea={"filters"}
                  gap={3}
                  flexWrap={'wrap'}
            >

                <InputGroup w={'auto'}>
                    <InputLeftAddon children='с' />
                    <Input type='date' placeholder='Начальная дата'
                           isDisabled={period !== DatePeriod.CUSTOM}
                           value={dateStart?.toISOString().substring(0, 10) || new Date().toISOString().substring(0, 10)}
                           onChange={e => setDateStart(new Date(e.target.value))}
                    />
                </InputGroup>
                <InputGroup w={'auto'}>
                    <InputLeftAddon children='по' />
                    <Input type='date' placeholder='Конечная дата'
                           isDisabled={period !== DatePeriod.CUSTOM}
                           value={dateFinish?.toISOString().substring(0, 10) || new Date().toISOString().substring(0, 10)}
                           onChange={e => setDateFinish(new Date(e.target.value))}
                    />
                </InputGroup>
                <ColumnVisiblityPopover table={table}/>
            </Flex>
            <VStack gridArea={"actions"} justifyContent={'flex-end'}>
                <Button letterSpacing={1}
                        size="sm"
                        colorScheme="primary"
                        justifySelf="flex-end"
                        onClick={onOpen}
                >
                    <AddIcon/>
                </Button>
                <Button onClick={downloadReportsTable}
                        size="sm"
                        colorScheme="primary"
                >
                    <DownloadIcon/>
                </Button>
            </VStack>
        </Grid>
    );
};

export default OptionsReportsTable;