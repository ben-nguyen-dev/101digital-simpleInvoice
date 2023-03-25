import { useCallback, useEffect, useState } from 'react';

import { IFilter, IInfo } from '../interfaces/CRUD/crud';
import { handleError } from '../utils/handleError';

function useList<T>({ get, title }: IInfo) {
    const [data, setData] = useState<T[]>([]);
    const [filters, setFilters] = useState<IFilter>({
        pageNum: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const changeFilters = (value: Partial<IFilter>) =>
        setFilters({
            ...filters,
            ...value,
        });

    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await get(filters);
            if (!res?.data) return;
            setData(res.data?.data);
            setTotal(res.data?.paging?.totalRecords);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
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
        loading,
    };
}

export default useList;
