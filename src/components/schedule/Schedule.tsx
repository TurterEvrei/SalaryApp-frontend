import React, {useContext, useEffect, useState} from 'react';
import TableWrapperCard from "../cards/TableWrapperCard";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Grid,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AddIcon, ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import {IDepartment} from "../../models/dto/IDepartment";
import UserService from "../../services/UserService";
import EmployeeService from "../../services/EmployeeService";
import {IEmployee} from "../../models/dto/IEmployee";
import WishModal from "../modals/WishModal";
import NoDepartment from "../calculator/exeptions/NoDepartment";
import {IWish} from "../../models/dto/IWish";
import {ScheduleData} from "../../models/schedule/ScheduleData";
import WishService from "../../services/WishService";
import ScheduleRow from "./ScheduleRow";
import ScheduleCell from "./ScheduleCell";
import {PaginationState} from "@tanstack/react-table";
import SwitchForms from "../calculator/transitions/SwitchForms";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Loader from "../UI/loader/Loader";

const pageSizeOptions: number[] = [1, 2, 4]

const Schedule = observer(() => {

    const [isChangeEffect, setChangeEffect] = useState<boolean>(false)
    const [scheduleDataList, setScheduleDataList] = useState<ScheduleData[]>([])
    const [departments, setDepartments] = useState<IDepartment[]>([])
    const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({} as IDepartment)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [principalEmployee, setPrincipalEmployee] = useState({} as IEmployee)
    const [targetEmployee, setTargetEmployee] = useState({} as IEmployee)
    const [targetWish, setTargetWish] = useState<IWish | null>(null)
    const [targetDate, setTargetDate] = useState<string>('')
    const [date, setDate] = useState<Date | null>(new Date())
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 2,
    })
    const {store} = useContext(Context)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchUserDepartments().then(() => setLoading(false))
        fetchUserEmployee()
    }, [])

    useEffect(() => {
        fetchEmployeesOfDepartment()
    }, [currentDepartment])

    useEffect(() => {
        if (currentDepartment.id) getScheduleData();
    }, [currentDepartment, date, pagination])

    async function fetchUserDepartments() {
        const {data} = await UserService.fetchUserDepartments()
        setDepartments(data)
        if (data?.length) setCurrentDepartment(data[0])
    }

    async function fetchEmployeesOfDepartment() {
        if (currentDepartment.id) {
            try {
                const {data} = await EmployeeService.fetchEmployeesByDepartmentId(currentDepartment.id)
                setEmployees(data)
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function fetchUserEmployee() {
        try {
            const {data} = await UserService.fetchUserEmployee()
            setPrincipalEmployee(data)
            setTargetEmployee(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getScheduleData() {
        try {
            setChangeEffect(!isChangeEffect)
            //@ts-ignore
            const {data} = await WishService.getScheduleData(currentDepartment.id, date?.toISOString().substring(0, 10), pagination)
            setScheduleDataList(data)
        } catch (e) {
            console.log(e)
        }
    }

    function onOpenNewWishModal() {
        // setTargetWish(null)
        setTargetEmployee(principalEmployee)
        // setTargetDate('')
        onOpen()
    }

    if (isLoading) {
        return <Loader/>;
    }

    if (departments.length === 0 || principalEmployee === null) {
        // setTimeout(() => {
            return (
                <NoDepartment/>
            );
        // },1000)

    }

    return (
        <TableWrapperCard title={'График'}>
            <>
                <Grid gridTemplateAreas={'"selection actions" "pagination actions"'}
                      gridTemplateRows={'auto auto'}
                      gridTemplateColumns={'1fr 150px'}
                      gridGap={2}
                      position={'relative'}
                      top={-4}
                >
                    <HStack gridArea={"selection"}
                            spacing={3}
                    >
                        <InputGroup w={'auto'}>
                            <InputLeftElement>
                                <SearchIcon/>
                            </InputLeftElement>
                            <Input type='date' placeholder='Начальная дата'
                                   value={date?.toISOString().substring(0, 10)}
                                   onChange={e => setDate(new Date(e.target.value))}
                            />
                        </InputGroup>
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
                    </HStack>
                    <HStack gridArea={"pagination"}
                            spacing={3}
                    >
                        <Menu offset={[0, 0]}>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                {`${pagination.pageSize} ${pagination.pageSize === 1 ? 'неделя' : 'недели'}`}
                            </MenuButton>
                            <MenuList>
                                {pageSizeOptions.map(pageSizeOption =>
                                    <MenuItem onClick={() => setPagination({...pagination, pageSize: pageSizeOption})}
                                              key={pageSizeOption}
                                    >
                                        {`${pageSizeOption} ${pageSizeOption === 1 ? 'неделя' : 'недели'}`}
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                        <ButtonGroup size="sm"
                                     isAttached
                                     variant="outline"
                        >
                            <Button onClick={() => setPagination({...pagination, pageIndex: pagination.pageIndex - 1})}>
                                {"<"}
                            </Button>
                            <Center mx={1}>
                                {`Смещение: ${pagination.pageIndex}`}
                            </Center>
                            <Button onClick={() => setPagination({...pagination, pageIndex: pagination.pageIndex + 1})}>
                                {">"}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                    <HStack gridArea={"actions"} justifyContent={'flex-end'}>
                        <Button letterSpacing={1}
                                size="sm"
                                colorScheme="primary"
                                justifySelf="flex-end"
                                onClick={onOpenNewWishModal}
                        >
                            <AddIcon/>
                        </Button>
                    </HStack>
                </Grid>

                <SwitchForms isChangeEffect={isChangeEffect}
                             timeout={1000}
                >
                    <Box>
                    {scheduleDataList.map((scheduleData, index) =>
                        <VStack gap={0}
                                key={index}
                        >

                            <Grid gridTemplateColumns={'80px repeat(7, 1fr)'}
                                  w={'100%'}
                            >
                                <ScheduleCell>-</ScheduleCell>
                                {scheduleData?.weekDates?.map(day =>
                                    <ScheduleCell key={day.date}>
                                        {`${day.day} ${day.date.substring(8, 10)}.${day.date.substring(5, 7)}`}
                                    </ScheduleCell>
                                )}
                            </Grid>

                            {scheduleData.rowsData?.map(row =>
                                <ScheduleRow row={row}
                                             weekDates={scheduleData.weekDates}
                                             currentDepartment={currentDepartment}
                                             setScheduleDataList={setScheduleDataList}
                                             scheduleDataIndex={index}
                                             employees={employees}
                                             setTargetEmployee={setTargetEmployee}
                                             onOpen={onOpen}
                                             setTargetWish={setTargetWish}
                                             key={row.employeeId}
                                             setTargetDate={setTargetDate}
                                />
                            )}

                        </VStack>
                    )}
                    </Box>
                </SwitchForms>
                <WishModal isOpen={isOpen}
                           onClose={onClose}
                           currentDepartment={currentDepartment}
                           targetEmployee={targetEmployee}
                           wish={targetWish}
                           setGlobalWish={setTargetWish}
                           employees={employees}
                           setScheduleDataList={setScheduleDataList}
                           targetDate={targetDate}
                           setTargetDate={setTargetDate}
                />
            </>
        </TableWrapperCard>
    );
});

export default Schedule;