import React from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { StateFromReducersMapObject, compose } from 'redux';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';


const mapStateToProps = (state: any) => {
    return {
        DialogsData: state.dialogsData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}


let AuthRedirectComponent = withAuthRedirect(Dialogs)
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);

/*const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);*/

export default DialogsContainer;

/*
export default compose<any, any, ElementsProps>(connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    Dialogs
);*/