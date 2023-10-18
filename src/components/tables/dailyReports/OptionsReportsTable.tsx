import React, {SetStateAction} from 'react';
import {
    Button,
    Grid,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import {AddIcon, ChevronDownIcon} from "@chakra-ui/icons";
import ColumnVisiblityPopover from "../addons/ColumnVisiblityPopover";
import {Table} from "@tanstack/react-table";
import {IDailyReport} from "../../../models/dto/IDailyReport";
import {IDepartment} from "../../../models/dto/IDepartment";
import {DatePeriod} from "../../../models/payments/DatePeriod";

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



    return (
        <Grid gridTemplateAreas={'"selection actions" "filters actions"'}
              gridTemplateRows={'auto auto'}
              gridTemplateColumns={'1fr 150px'}
              gridGap={2}
        >
            <HStack gridArea={"selection"}
                    spacing={3}
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
            </HStack>
            <HStack gridArea={"filters"}
                    spacing={3}
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
            </HStack>
            <HStack gridArea={"actions"} justifyContent={'flex-end'}>
                {/*<Button letterSpacing={1}*/}
                {/*        size="sm"*/}
                {/*        colorScheme="primary"*/}
                {/*        justifySelf="self-end"*/}
                {/*        // onClick={saveAllChanges}*/}
                {/*        // isDisabled={!changingIds.length}*/}
                {/*>*/}
                {/*    <CheckIcon/>*/}
                {/*</Button>*/}
                <Button letterSpacing={1}
                        size="sm"
                        colorScheme="primary"
                        justifySelf="flex-end"
                        onClick={() => {
                            // setCurrentGlobalDailyReport({} as IDailyReport)
                            onOpen()
                        }}
                >
                    <AddIcon/>
                </Button>
            </HStack>
        </Grid>
    );
};

export default OptionsReportsTable;