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
