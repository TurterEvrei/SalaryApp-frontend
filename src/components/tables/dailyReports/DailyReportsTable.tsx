import React, {useEffect, useState} from 'react';
import {
    ColumnDef,
    ColumnFilter,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {IDailyReport} from "../../../models/dto/IDailyReport";
import {Table, useDisclosure} from "@chakra-ui/react";
import TablePagination from "../addons/TablePagination";
import TableHead from "../addons/TableHead";
import TableBody from "../addons/TableBody";
import TableWrapperCard from "../../cards/TableWrapperCard";
import OptionsReportsTable from "./OptionsReportsTable";
import {IDepartment} from "../../../models/dto/IDepartment";
import UserService from "../../../services/UserService";
import {DatePeriod} from "../../../models/payments/DatePeriod";
import DailyReportService from "../../../services/DailyReportService";
import PaymentsCell from "./PaymentsCell";
import DailyReportModal from "../../modals/DailyReportModal";
import {IEmployee} from "../../../models/dto/IEmployee";
import EmployeeService from "../../../services/EmployeeService";
import ActionsReportCell from "./ActionsReportCell";
import NoDepartment from "../../calculator/exeptions/NoDepartment";
import Loader from "../../UI/loader/Loader";

const columns: ColumnDef<IDailyReport>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false,
        //@ts-ignore
        cell: ({getValue}) => <div>{getValue()}</div>
    },
    {
        accessorKey: 'date',
        header: 'Дата',
        //@ts-ignore
        cell: ({getValue}) => <div>{getValue()}</div>
    },
    {
        accessorKey: 'payments',
        header: 'Выплаты',
        enableSorting: false,
        //@ts-ignore
        cell: PaymentsCell,
    },
    {
        accessorKey: 'actions',
        header: 'Действия',
        enableSorting: false,
        maxWidth: 10,
        //@ts-ignore
        cell: ActionsReportCell,
    },
]

const DailyReportsTable = () => {

    const [departments, setDepartments] = useState<IDepartment[]>([])
    const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({} as IDepartment)
    const [period, setPeriod] = useState<DatePeriod>(DatePeriod.LAST)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [currentGlobalDailyReport, setCurrentGlobalDailyReport] = useState<IDailyReport>({} as IDailyReport)
    const [dateStart, setDateStart] = useState<Date | null>(null)
    const [dateFinish, setDateFinish] = useState<Date | null>(null)

    const [dailyReports, setDailyReports] = useState<IDailyReport[]>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0,
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchUserDepartments().then(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchEmployeesOfDepartment()
    }, [currentDepartment])

    useEffect(() => {
        fetchDailyReports()
    }, [currentDepartment, period, dateStart, dateFinish])

    async function fetchUserDepartments() {
        const {data} = await UserService.fetchUserDepartments()
        setDepartments(data)
        if (data?.length) setCurrentDepartment(data[0])
    }

    async function fetchDailyReports() {
        // @ts-ignore
        const curPer = Object.keys(DatePeriod).find(o => DatePeriod[o] === period)
        if (curPer && currentDepartment.id) {
            try {
                const {data} = await DailyReportService.fetchDailyReports(
                    currentDepartment.id,
                    curPer,
                    dateStart?.toISOString().substring(0, 10) || null,
                    dateFinish?.toISOString().substring(0, 10) || null
                )
                setDailyReports(data)
            } catch (e) {
                console.log(e)
            }
        }
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


    const {isOpen, onOpen, onClose} = useDisclosure();

    const table = useReactTable({
        data: dailyReports,
        columns,
        state: {
            pagination,
            columnFilters,
            columnVisibility,
        },
        initialState: {
            sorting: [
                {
                    id: 'date',
                    desc: false,
                }
            ]
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        meta: {
            updateData: (rowIndex: number, columnId: string, data: any) => {
                setDailyReports(prev =>
                    prev.map((report, index) =>
                        rowIndex === index
                            ? {
                                ...report,
                                [columnId]: data
                            }
                            : report
                    )
                )
            }
        }
    })

    if (isLoading) {
        return <Loader/>;
    }

    if (departments.length === 0) {
        return (
            <NoDepartment/>
        );
    }

    return (
        <TableWrapperCard title={'Отчеты'}>
            <>
                <OptionsReportsTable table={table}
                                     departments={departments}
                                     setDepartments={setDepartments}
                                     currentDepartment={currentDepartment}
                                     setCurrentDepartment={setCurrentDepartment}
                                     period={period}
                                     setPeriod={setPeriod}
                                     onOpen={onOpen}
                                     setCurrentGlobalDailyReport={setCurrentGlobalDailyReport}
                                     dateStart={dateStart}
                                     setDateStart={setDateStart}
                                     dateFinish={dateFinish}
                                     setDateFinish={setDateFinish}
                />
                <Table variant="simple">
                    <TablePagination table={table}
                                     setPagination={setPagination}
                    />
                    <TableHead table={table}/>
                    <TableBody table={table}
                               extraCellProps={{
                                   onOpen,
                                   setDailyReports,
                                   setCurrentGlobalDailyReport,
                               }}
                    />
                </Table>
                <DailyReportModal isOpen={isOpen}
                                  onClose={onClose}
                                  currentDepartment={currentDepartment}
                                  employees={employees}
                                  setDailyReports={setDailyReports}
                                  dailyReport={currentGlobalDailyReport.id ? currentGlobalDailyReport : undefined}
                                  setCurrentGlobalDailyReport={setCurrentGlobalDailyReport}
                />
            </>
        </TableWrapperCard>
    );
};

export default DailyReportsTable;