export enum InputInfoType {
    SALES = 'Sales',
    SERVICE = 'Service',
}

export interface IInfoElement {
    id: string,
    type: InputInfoType,
    value: number,
}

export interface ICalcFormInput {
    id: string,
    name: string,
    type: InputInfoType,
    inputType: string,
    inputName: string,
    value?: number | string,
}

export const lastPeriodInputsArray: ICalcFormInput[] = [
    {
        id: 'defaulters',
        name: 'Неплатильщики',
        type: InputInfoType.SALES,
        inputType: 'number',
        inputName: 'defaulters',
        value: -1,
    },
    {
        id: 'serviceCash',
        name: 'Чаевые (нал)',
        type: InputInfoType.SERVICE,
        inputType: 'number',
        inputName: 'defaulters',
        value: -1,
    },
    {
        id: 'serviceWeb',
        name: 'НетМонет (чай)',
        type: InputInfoType.SERVICE,
        inputType: 'number',
        inputName: 'defaulters',
        value: -1,
    },
    {
        id: 'salesCard',
        name: 'Кредит.карты (з)',
        type: InputInfoType.SALES,
        inputType: 'number',
        inputName: 'defaulters',
        value: -1,
    },
    {
        id: 'serviceCard',
        name: 'Кредит.карты (обс)',
        type: InputInfoType.SERVICE,
        inputType: 'number',
        inputName: 'defaulters',
        value: -1,
    },
    {
        id: 'salesCash',
        name: 'Рубли (з)',
        type: InputInfoType.SALES,
        inputType: 'number',
        inputName: 'defaulters',
        value: -1,
    },
]