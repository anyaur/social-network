import React from 'react';
import classes from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Paginator from '../common/preloader/Paginator/Paginator';
import User from './User';

interface UsersProps {
    users: Array<{
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
    }>;
    totalUsersCount: number;
    pageSize: number;
    portionSize: number;
    currentPage: number;
    follow(userId: number): void;
    unfollow(userId: number): void;
    onPageChanged(pageNumber: number): void;
    toggleFollowingInProgress(isFollowingInProgress: boolean, userId: number): void;
    followingInProgress: Array<number>;
}

let Users = (props: UsersProps) => {
    return <div>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
            currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} />
            <div>
        {
            props.users.map(u => <User
                key={u.id}
                user={u}
                followingInProgress={props.followingInProgress}
                follow={props.follow}
                unfollow={props.unfollow}
            />
            )
        }
        </div>
    </div >
}

export default Users; 