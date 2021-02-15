import React, { useState } from 'react';
import cx from "classnames";
import { format, parseISO } from "date-fns";
import '../../assets/styles/table.css';
import Icon from './svg/Icon';
import Pagination from './Pagination';

interface IProp {
    data: any[];
    headers: any[];
    title?: string;
    onMultiSelect?: (selectedRows: any[]) => void;
    collapseOnSelect?: boolean;
    onSelect?: (selectedRow: any) => void;
    onCloseIcon?: () => void;
    totalPages?: number;
    pagesRange?: number;
    onPageSelected?: (selectedValue: number) => void;
    onMainAddButtonClick?: () => void;
    onSort?: (field: string, direction: string) => void;
}


const Table = ({ data, headers, title, onMultiSelect, onSelect, collapseOnSelect, onCloseIcon, totalPages, pagesRange, onPageSelected, onMainAddButtonClick, onSort }: IProp) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [checkedAll, setCheckedAll] = useState(false);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<string | null>(null);
    const [sortIcon, setSortIcon] = useState('chevron-right');

    const onRowSelect = (index: number, row: any) => {
        if (onSelect) {
            setSelectedIndex(index);
            onSelect(row);
        }
    }

    const onSorting = (field: string) => {
        let sortDir = sortDirection;
        if (sortField === field) {
            if (sortDirection === null) {
                sortDir = 'asc';
                setSortDirection(sortDir);
                setSortIcon('chevron-down');
            } else if (sortDirection === 'asc') {
                sortDir = 'desc';
                setSortDirection(sortDir);
                setSortIcon('chevron-up');
            } else if (sortDirection === 'desc') {
                sortDir = 'asc';
                setSortDirection(sortDir);
                setSortIcon('chevron-down');
            }
        } else {
            sortDir = 'asc';
            setSortDirection(sortDir);
            setSortIcon('chevron-down');
        }
        setSortField(field);
        if (onSort) {
            onSort(field, sortDir as string);
        }
    }


    const setCheckedItem = (selRow: any) => {
        const newSelection = [...selectedRows];

        const indx = newSelection.findIndex(row => JSON.stringify(row) === JSON.stringify(selRow));

        if (indx > -1) {
            newSelection.splice(indx, 1);
        } else {
            newSelection.push(selRow);
        }

        setSelectedRows(newSelection);
        setCheckedAll(newSelection.length === data.length ? true : false);
        if (onMultiSelect) onMultiSelect(newSelection);
    }


    const setAllCheckedItems = () => {
        const newSelection = [...selectedRows];

        if (!checkedAll) {
            data.forEach(r => {
                const indx = newSelection.findIndex(n => JSON.stringify(n) === JSON.stringify(r));
                if (indx === -1) {
                    newSelection.push(r);
                }
            });
        } else {
            data.forEach(r => {
                const indx = newSelection.findIndex(n => JSON.stringify(n) === JSON.stringify(r));
                if (indx > -1) {
                    newSelection.splice(indx, 1);
                }
            });
        }

        setSelectedRows(newSelection);
        setCheckedAll(prv => !prv);
        if (onMultiSelect) onMultiSelect(newSelection);
    }

    const isChecked = (selRow: any) => {
        return selectedRows.findIndex(row => JSON.stringify(row) === JSON.stringify(selRow)) > -1 ? true : false;
    }

    const formatData = (type: string, data: any) => {
        switch (type) {
            case 'date':
                return format(parseISO(data), 'dd MMM yyyy H:m');
            default:
                return data;
        }
    }


    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='text-base font-bold text-gray-600'>{title}</div>
                <div className='space-x-2'>
                    {onMainAddButtonClick && <button className='px-3 py-1 my-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-sm shadow-xl focus:ring focus:outline-none bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700' onClick={onMainAddButtonClick}>Add+</button>}
                    {onCloseIcon && <div className='text-white bg-red-600 rounded-full cursor-pointer' onClick={onCloseIcon}><Icon icon='close' /></div>}
                </div>
            </div>
            <div className="shadow-md table-responsive-vertical shadow-z-1">
                <table id="table" className="table table-hover table-mc-light-blue">
                    <thead>
                        <tr>
                            {onMultiSelect && <th> <input id="checkAll" className="cursor-pointer" type="checkbox" onChange={setAllCheckedItems} checked={checkedAll} /></th>}
                            <th>#</th>
                            {headers.map(h => <th key={h.key}>{h.title} {onSort && <Icon icon={h.key === sortField ? sortIcon : 'chevron-right'} onClick={() => onSorting(h.key)} customClass='w-3 h-3 float-right cursor-pointer' />}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) =>
                            <tr key={d['id']} className={cx(onSelect && 'cursor-pointer', collapseOnSelect && selectedIndex && selectedIndex !== i && 'hidden')} onClick={() => onRowSelect(i, d)}>
                                {onMultiSelect && <td> <input id="checkitem" className="cursor-pointer" type="checkbox" checked={isChecked(d)} onChange={() => setCheckedItem(d)} /></td>}
                                <td data-title="#">{i + 1}</td>
                                {headers.map((h, key) => <td data-title={h.title} key={key}>{formatData(h.type, d[h.key])}</td>)}
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            { onPageSelected && <Pagination totalPages={totalPages!} range={pagesRange!} onClick={(value) => onPageSelected(value)} />}

        </>
    )
}

export default Table
