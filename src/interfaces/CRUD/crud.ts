export enum ORDERING {
    ASC = 'ASCENDING',
    DESC = 'DESCENDING',
}

export interface IFilter {
    pageNum: number;
    pageSize: number;
    keyword?: string;
    ordering?: ORDERING | null;
    dateType?: string;
    fromDate?: string;
    toDate?: string;
    sortBy?: string;
    status?: string;
}

export interface IInfo {
    get: Function;
    title: string;
}

export interface IFormFiled {
    label: string;
    field: string;
    isRequired: boolean;
    type: FORM_TYPE;
}
export enum FORM_TYPE {
    TEXT = 'text',
    NUMBER = 'number',
    DATE = 'date',
    TEXTAREA = 'textarea',
}
