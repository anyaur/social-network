import React from 'react';
import classes from './Message.module.css';


interface MessageProps {
    message: string;
    id: number;
}

const Message = (props: MessageProps) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    )
}

export default Message;