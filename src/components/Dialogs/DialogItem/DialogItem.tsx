import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

interface DialogItemProps {
    name: string;
    id: number;
}

const DialogItem = (props: DialogItemProps) => {
    return (
        <div className={classes.dialog}>
            <NavLink to={'/Messages/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;