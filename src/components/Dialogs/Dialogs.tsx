import React from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Profile from '../Profile/Profile';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import { Formik, Form, Field, ErrorMessage } from "formik";

interface ElementsProps {
    DialogsData: {
        dialogs: Array<{
            name: string;
            id: number;
        }>;
        messages: Array<{
            message: string;
            id: number;
        }>;
        newMessageText: string;
    };
    onSendMessage(text: any): void;
    isAuth?: boolean;
}

const Dialogs = (props: ElementsProps) => {
    let DialogElements = props.DialogsData.dialogs
        .map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)


    let MessageData = props.DialogsData.messages
        .map(m => <Message message={m.message} id={m.id} />)


    const addNewMessage = (values: any) => {
        props.onSendMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div>
                {DialogElements}
            </div>
            <div>
                {MessageData}
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const AddMessageForm = (props: any) => {
    return (
        <Formik
            initialValues={{ newMessageBody: "" }}
            onSubmit={(values, submitProps) => {
                props.onSubmit(values);
                submitProps.resetForm();
            }}
        >
            {() => (
                <Form>
                    <div>
                        <Field type={'text'} name={'newMessageBody'} placeholder={'Введите текст сообщения'} />
                    </div>
                    <ErrorMessage name="email" component="div" />
                    <button type={'submit'}>Отправить</button>
                </Form>
            )}
        </Formik>
    )
}

export default Dialogs;