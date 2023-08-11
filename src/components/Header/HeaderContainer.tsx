import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';


interface HeaderCProps {
    isAuth: boolean;
    login: string;
    logout(): void;
}

class HeaderContainer extends React.Component<HeaderCProps> {
    render() {
        return (
            <Header {...this.props} logout={this.props.logout}/>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout}) (HeaderContainer);