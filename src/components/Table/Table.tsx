import React, { FC } from 'react';
import * as _ from 'lodash';

import { ReactComponent as NoSortIcon } from '../../assets/icons/NoSort.svg';
import { IHeaderCell } from './ITable';

export interface ITableProps {
    headerCell: IHeaderCell[];
    data: any;
}

const Table: FC<ITableProps> = ({ headerCell, data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headerCell.map((header) => (
                            <th key={header.label} scope="col" className="px-6 py-3">
                                {header.label}
                                {header.sortable ? (
                                    <span className="cursor-pointer">
                                        <NoSortIcon />
                                    </span>
                                ) : null}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: number) => (
                        <tr
                            key={`${item.id}-${index}`}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            {headerCell.map((header) => (
                                <td key={header.field} className="px-6 py-4">
                                    {_.get(item, header.field)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
