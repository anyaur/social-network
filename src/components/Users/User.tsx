import React from 'react';
import classes from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Paginator from '../common/preloader/Paginator/Paginator';

interface UserProps {
    user: {
        id: number;
        photos: {
            small: string;
            large: string;
        };
        followed: boolean;
        name: string;
        status: string;
        /*location: {
            city: string;
            country: string;
        }*/
    };
    follow(userId: number): void;
    unfollow(userId: number): void;
    followingInProgress: Array<number>;
}

let User = (props: UserProps) => {
    let user = props.user
    return <div>
        <div className={classes.users}>
            <span>
                <div>
                    <NavLink to={'/Profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={classes.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.unfollow(user.id)
                        }}>Unfollow</button>
                        :
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.follow(user.id)
                        }}>Follow</button>}
                </div>
            </span>
            <span className={classes.userInfo}>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.city"}</div>
                    <div>{"u.location.country"}</div>
                </span>
            </span>
        </div>
    </div>
}

export default User; 