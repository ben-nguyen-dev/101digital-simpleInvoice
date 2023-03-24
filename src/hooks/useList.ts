import { useCallback, useEffect, useState } from 'react';

import { IFilter, IInfo } from '../interfaces/CRUD/crud';

function useList<T>({ get, title }: IInfo) {
    const [data, setData] = useState<T[]>([]);
    const [filters, setFilters] = useState<IFilter>({
        pageNum: 1,
        pageSize: 10,
    });

    const changeFilters = (value: Partial<IFilter>) =>
        setFilters({
            ...filters,
            ...value,
        });

    const [total, setTotal] = useState<number>(0);

    const [searchString, setSearchString] = useState('');

    const getData = useCallback(async () => {
        try {
            const res = await get(filters);
            if (!res?.data) return;
            setData(res.data?.data);
            setTotal(res.data?.paging?.totalRecords);
        } catch (err: any) {
            console.log(err);
        }
    }, [filters]);

    useEffect(() => {
        document.title = title;
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return {
        data,
        total,
        filters,
        changeFilters,
        searchString,
        setSearchString,
    };
}

export default useList;
