import React, {useContext, useEffect, useState} from 'react';
import TableWrapperCard from "../cards/TableWrapperCard";
import {
    Box,
    Button,
    Center,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Table,
    VStack
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {DatePeriod} from "../../models/payments/DatePeriod";
import {IDepartment} from "../../models/dto/IDepartment";
import UserService from "../../services/UserService";
import {STAT_TYPES, StatType} from "./StatType";
import BarChart from "../charts/BarChart";
import {Context} from "../../index";
import StatisticService from "../../services/StatisticService";
import {StatisticData, StatTableRow} from "../../models/statistic/StatisticData";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable
} from "@tanstack/react-table";
import TablePagination from "../tables/addons/TablePagination";
import TableHead from "../tables/addons/TableHead";
import TableBody from "../tables/addons/TableBody";
import NoDepartment from "../calculator/exeptions/NoDepartment";
import Loader from "../UI/loader/Loader";

const Statistic = () => {

    const [data, setData] = useState<StatisticData>({} as StatisticData)
    const [columns, setColumns] = useState<ColumnDef<StatTableRow>[]>([])
    const [tableData, setTableData] = useState<StatTableRow[]>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 15,
        pageIndex: 0,
    })
    const [departments, setDepartments] = useState<IDepartment[]>([])
    const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({} as IDepartment)
    const [period, setPeriod] = useState<DatePeriod>(DatePeriod.LAST)
    const [statType, setStatType] = useState<StatType>(STAT_TYPES[0])
    const [dateStart, setDateStart] = useState<string | null>(null)
    const [dateFinish, setDateFinish] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)

    const {store} = useContext(Context)

    useEffect(() => {
        fetchUserDepartments().then(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchData()
        setColumns([
                {
                    accessorKey: 'key',
                    header: statType.value === 'STAT_OWN' ? 'Дата' : 'Работник',
                    //@ts-ignore
                    cell: ({getValue}) => <div>{getValue()}</div>
                },
                {
                    accessorKey: 'value',
                    header: 'Выплата',
                    //@ts-ignore
                    cell: ({getValue}) => <div>{getValue()}</div>
                }
            ]
        )
    }, [currentDepartment, period, statType, dateStart, dateFinish])

    async function fetchUserDepartments() {
        const {data} = await UserService.fetchUserDepartments()
        setDepartments(data)
        if (data?.length) setCurrentDepartment(data[0])
    }

    async function fetchData() {
        //@ts-ignore
        const curPer = Object.keys(DatePeriod).find(o => DatePeriod[o] === period)
        if (currentDepartment.id && curPer) {
            const {data} = store.isMaster()
                ? await StatisticService.getStatisticDataForMaster(currentDepartment.id, curPer, statType.value, dateStart, dateFinish)
                : await StatisticService.getStatisticDataForUser(currentDepartment.id, curPer, dateStart, dateFinish)
            setData(data)
            setTableData(Object.keys(data.tableData).map(k => {
                return {
                    key: k,
                    //@ts-ignore
                    value: Number(data.tableData[k]) || 0,
                } as StatTableRow
            }))
        }
    }

    const table = useReactTable({
        data: tableData,
        columns,
        state: {
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (isLoading) {
        return <Loader/>;
    }

    if (departments.length === 0) {
        return <NoDepartment/>;
    }

    return (
        <TableWrapperCard title={'Статистика'}>
            <VStack>
                <HStack gridArea={"selection"}
                        spacing={3}
                >
                    <Menu>
                        <MenuButton as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    isDisabled={departments.length < 2}
                        >
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
                                <MenuItem onClick={() => {
                                    setPeriod(datePeriod)
                                    if (datePeriod !== DatePeriod.CUSTOM) {
                                        setDateStart(null)
                                        setDateFinish(null)
                                    }
                                }}
                                          key={datePeriod}
                                >
                                    {datePeriod}
                                </MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    isDisabled={!store.isMaster()}
                        >
                            {statType.name}
                        </MenuButton>
                        <MenuList>
                            {STAT_TYPES.map(type =>
                                <MenuItem onClick={() => setStatType(type)}
                                          key={type.value}
                                >
                                    {type.name}
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
                               value={dateStart || ''}
                               onChange={e => setDateStart(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup w={'auto'}>
                        <InputLeftAddon children='по' />
                        <Input type='date' placeholder='Конечная дата'
                               isDisabled={period !== DatePeriod.CUSTOM}
                               value={dateFinish || ''}
                               onChange={e => setDateFinish(e.target.value)}
                        />
                    </InputGroup>
                    <Center fontSize={'lg'} color={'whiteAlpha.800'}>
                        Итого: {data.total}
                    </Center>
                </HStack>
                <Box h={'500px'} w={'100%'}>
                    <BarChart data={data.chartData}
                              keys={data.keys}
                    />
                </Box>
                <Table variant="simple">
                    <TablePagination table={table}
                                     setPagination={setPagination}
                    />
                    <TableHead table={table}/>
                    <TableBody table={table}/>
                </Table>
            </VStack>
        </TableWrapperCard>
    );
};

export default Statistic;