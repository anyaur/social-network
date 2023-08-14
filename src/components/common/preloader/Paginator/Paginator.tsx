import React, { useState, useEffect } from 'react';
import classes from './Paginator.module.css'
import prev from "../../../../assets/images/prev.png";

interface PaginatorProps {
    totalItemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged(pageNumber: number): void;
    portionSize: number;
}

let Paginator = (props: PaginatorProps) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let portionSize = props.portionSize;
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = pagesCount / portionSize;
    let [portionNumber, setPortionNumber] = useState(1);
    let leftBorder = portionNumber * portionSize - portionSize + 1;
    let rightBorder = portionNumber * portionSize;


  

    return <div className={classes.paginator}>

            {portionNumber > 1 &&
                <span>
                    <button className={classes.pagination} onClick={() => { setPortionNumber(1) }}>{`<<`}</button>
                    <button className={classes.pagination} onClick={() => { setPortionNumber(portionNumber - 1) }}>{`<`}</button>
                </span>
            }
            {
                pages
                    .filter(p => p >= leftBorder && p <= rightBorder)
                    .map(p => {
                        return <span className={props.currentPage === p ? classes.selectedPage : classes.pagination}
                            onClick={() => props.onPageChanged(p)}>{p}</span>
                    })
            }
            {portionNumber < portionCount &&
                <span>
                    <button className={classes.pagination} onClick={() => { setPortionNumber(portionNumber + 1) }}>{`>`}</button>
                    <button className={classes.pagination} onClick={() => { setPortionNumber(portionCount) }}>{`>>`}</button>
                </span>
            }
    </div>
}

export default Paginator; 