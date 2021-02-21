import React, { useState } from 'react';
import cx from "classnames";
import { format, parseISO } from "date-fns";
import '../../assets/styles/table.css';
import Icon from './svg/Icon';
import Pagination from './Pagination';
import Spin from './svg/Spin';

interface IProp {
    data: any[];
    headers: any[];
    title?: string;
    loadingData?: boolean;
    onMultiSelect?: (selectedRows: any[]) => void;
    collapseOnSelect?: boolean;
    onSelect?: (selectedRow: any) => void;
    onCloseIcon?: () => void;
    totalElements?: number;
    totalPages?: number;
    pagesRange?: number;
    onPageSelected?: (selectedValue: number) => void;
    onMainAddButtonClick?: () => void;
    onSort?: (field: string, direction: string) => void;
}


const Table = ({ data, headers, title, loadingData, onMultiSelect, onSelect, collapseOnSelect, onCloseIcon, totalElements, totalPages, pagesRange, onPageSelected, onMainAddButtonClick, onSort }: IProp) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [removedRows, setRemovedRows] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [checkedAll, setCheckedAll] = useState(false);
    const [allWasChecked, setAllWasChecked] = useState(false);
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
        const index = getRowIndex(newSelection, selRow);

        if (index > -1) {
            const removedRow = newSelection.splice(index, 1);
            if (allWasChecked) { setRemovedRows(prv => [...prv, removedRow[0]]); }
        } else {
            newSelection.push(selRow);
            if (allWasChecked) {
                const index = getRowIndex(removedRows, selRow);
                if (index > -1) {
                    const rows = removedRows.filter(row => JSON.stringify(row) !== JSON.stringify(selRow))
                    setRemovedRows(rows);
                }
            }
        }

        setSelectedRows(newSelection);
        setCheckedAll(newSelection.length === totalElements ? true : false);
        if (onMultiSelect) onMultiSelect(newSelection);
    }


    const setAllCheckedItems = () => {
        const newSelection = [...selectedRows];
        console.log('!checkedAll', !checkedAll);
        if (!checkedAll) {
            data.forEach(r => {
                const indx = getRowIndex(newSelection, r);
                if (indx === -1) {
                    newSelection.push(r);
                }
            });
        } else {
            setRemovedRows([]);
            data.forEach(r => {
                const indx = getRowIndex(newSelection, r);
                if (indx > -1) {
                    newSelection.splice(indx, 1);
                }
            });
        }

        setSelectedRows(newSelection);
        setCheckedAll(prv => !prv);
        setAllWasChecked(prv => !prv);
        if (onMultiSelect) onMultiSelect(newSelection);
    }

    const isChecked = (selRow: any) => {
        if (checkedAll) {
            if (!rowExists(selectedRows, selRow)) { setSelectedRows(prv => [...prv, selRow]); }
            return true;
        }
        if (allWasChecked) {
            if (rowExists(removedRows, selRow)) {
                return false;
            } else {
                if (!rowExists(selectedRows, selRow)) { setSelectedRows(prv => [...prv, selRow]); }
                return true;
            }

        }

        return rowExists(selectedRows, selRow) ? true : false;
    }

    const rowExists = (rows: any[], selRow: any) => {
        return rows.findIndex(row => JSON.stringify(row) === JSON.stringify(selRow)) > -1;
    }
    const getRowIndex = (rows: any[], selRow: any) => {
        return rows.findIndex(row => JSON.stringify(row) === JSON.stringify(selRow));
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
            <div>removedRows: {JSON.stringify(removedRows, null, 2)}</div>
            <div>SelectedRows: {selectedRows?.length}</div>
            <div>removedRows: {removedRows?.length}</div>
            <div>totalElements: {totalElements}</div>
            <div className='flex items-center justify-between'>
                <div className='text-base font-bold text-gray-600'>{title}</div>
                <div className='space-x-2'>
                    {onMainAddButtonClick && <button className='px-3 py-1 my-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-sm shadow-xl focus:ring focus:outline-none bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700' onClick={onMainAddButtonClick}>Add+</button>}
                    {onCloseIcon && <div className='text-white bg-red-600 rounded-full cursor-pointer' onClick={onCloseIcon}><Icon icon='close' /></div>}
                </div>
            </div>
            <div className="relative shadow-md table-responsive-vertical shadow-z-1">
                {loadingData && <div className="absolute w-10 h-10 text-blue-700 top-2/4 left-2/4"><Spin /></div>}
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
            { onPageSelected && <Pagination isBusy={loadingData} totalPages={totalPages!} range={pagesRange!} onClick={(value) => onPageSelected(value)} />}

        </>
    )
}

export default Table
