export interface StatType {
    name: string,
    value: string,
}

export const STAT_TYPES: StatType[] = [
    {
        name: 'Личная',
        value: 'STAT_OWN',
    },
    {
        name: 'Общая',
        value: 'STAT_ALL',
    },
]