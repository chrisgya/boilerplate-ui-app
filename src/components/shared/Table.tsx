import React, { useState } from 'react';
import cx from "classnames";
import '../../assets/styles/table.css';
import { CloseIcon } from './svg/icons';

interface IProp {
    data: any[];
    headers: any[];
    title?: string;
    isMultiSelectable?: boolean;
    onMultiSelect?: (selectedRows: any[]) => void;
    isSelectable?: boolean;
    collapseOnSelect?: boolean;
    onSelect?: (selectedRow: any) => void;
    canDrilldown?: boolean;
    showCloseIcon?: boolean;
    onCloseIcon?: () => void;
}


const Table = ({ data, headers, title, isMultiSelectable, onMultiSelect, isSelectable, onSelect, collapseOnSelect, canDrilldown, showCloseIcon, onCloseIcon }: IProp) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [checkedAll, setCheckedAll] = useState(false);

    const onRowSelect = (index: number, row: any) => {
        if (isSelectable && onSelect) {
            setSelectedIndex(index);
            onSelect(row);
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


    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='text-base font-bold text-gray-600'>{title}</div>
                {showCloseIcon && <div data-tip='close table' className='text-white bg-red-600 rounded-full cursor-pointer' onClick={onCloseIcon}><CloseIcon /></div>}
            </div>
            <div className="shadow-md table-responsive-vertical shadow-z-1">
                <table id="table" className="table table-hover table-mc-light-blue">
                    <thead>
                        <tr>
                            {isMultiSelectable && <th> <input id="checkAll" className="cursor-pointer" type="checkbox" onChange={setAllCheckedItems} checked={checkedAll} /></th>}
                            <th>#</th>
                            {headers.map(h => <th key={h.key}>{h.title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) =>
                            <tr key={d['id']} className={cx(isSelectable && ' cursor-pointer', collapseOnSelect && selectedIndex && selectedIndex !== i && 'hidden')} onClick={() => isSelectable && onRowSelect(i, d)}>
                                {isMultiSelectable && <td> <input id="checkitem" className="cursor-pointer" type="checkbox" checked={isChecked(d)} onChange={() => setCheckedItem(d)} /></td>}
                                <td data-title="#">{i + 1}</td>
                                {headers.map((h, key) => <td data-title={h.title} key={key}>{d[h.key]}</td>)}
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table
