import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
    isAuth: boolean;
    login: string;
    logout(): void;
}

const Header = (props: HeaderProps) => {
    return (
        <header className={classes.header}>
            <div>TEST</div>
            <img src='https://static.vecteezy.com/system/resources/previews/002/581/816/original/cute-cat-head-cartoon-logo-cat-head-good-for-cat-care-related-products-free-vector.jpg'>
            </img>
            <div className={classes.loginBlock}>
                {props.isAuth ? 
                <div>
                    {props.login}
                    <button onClick={props.logout}>Log out</button>
                </div> :
                <NavLink to={'/login'}>
                    <button>Login</button>
                </NavLink>}
            </div>
        </header>
    )
}

export default Header;