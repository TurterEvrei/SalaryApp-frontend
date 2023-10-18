import React, {SetStateAction} from 'react';
import ActionsCell from "../cells/ActionsCell";
import {Column, Row, Table} from "@tanstack/react-table";
import {IDepartment} from "../../../models/dto/IDepartment";
import {IDailyReport} from "../../../models/dto/IDailyReport";
import DailyReportService from "../../../services/DailyReportService";

const ActionsReportCell = (
    {
        getValue,
        row,
        column,
        table,
        onOpen,
        setDailyReports,
        setCurrentGlobalDailyReport,
    }: {
        getValue: () => any,
        row: Row<IDailyReport>,
        column: Column<IDailyReport>,
        table: Table<IDailyReport>,
        onOpen: () => any,
        setDailyReports: React.Dispatch<SetStateAction<IDailyReport[]>>,
        setCurrentGlobalDailyReport: React.Dispatch<SetStateAction<IDailyReport>>,
    }
) => {
    const currentDailyReport = row.original

    function onOpenModal() {
        setCurrentGlobalDailyReport(currentDailyReport)
        onOpen()
    }

    async function deleteDailyReport(id: number) {
        try {
            const {data} = await DailyReportService.deleteDailyReport(id)
            if (data) setDailyReports(prev =>
                prev.filter(r => r.id !== id)
            )
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ActionsCell currentEntity={currentDailyReport}
                     deleteEntity={deleteDailyReport}
                     onInfoEntity={onOpenModal}
        />
    );
};

export default ActionsReportCell;