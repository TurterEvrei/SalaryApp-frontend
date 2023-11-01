export interface StatisticData {
    total: number;
    keys: string[];
    chartData: Map<string, string>[];
    tableData: Map<string, number>;
}

export interface StatTableRow {
    key: string;
    value: number;
}