export interface IFilter {
    pageNum: number;
    pageSize: number;
    keyword?: string;
    ordering?: 'ASCENDING' | 'DESCENDING' | null;
    fromDate?: string;
    toDate?: string;
    sortBy?: string;
    status?: string;
}

export interface IInfo {
    get: Function;
    title: string;
}
