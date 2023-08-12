import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { StateFromReducersMapObject } from 'redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingInProgress, getUsers } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import Users from './Users';
import axios from 'axios';
import Preloader from '../common/preloader/preloader';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import classes from './Users.module.css'

import {getUsersData, getPageSize, getTotalUsersCount, getPortionSize, getCurrentPage, getIsFetching, getFollowingInProgress} from '../../redux/users-selectors'


interface UsersApiCProps {
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
    setUsers(users: any): void;
    setCurrentPage(currentPage: number): void;
    setTotalUsersCount(totalCount: number): void;
    isFetching: boolean;
    toggleIsFetching(isFetching: boolean): void;
    toggleFollowingInProgress(isFollowingInProgress: boolean): void;
    followingInProgress: Array<number>;
    getUsers(currentPage: number, pageSize: number): void;
}

class UsersApiContainer extends React.Component<UsersApiCProps> {
    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <div className={classes.content}>
            {this.props.isFetching && <Preloader /> }
            <Users totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                portionSize={this.props.portionSize}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </div>
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: getUsersData(state),
        pageSize: getPageSize(state),
        portionSize: getPortionSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

const DialogsContainer = /*withAuthRedirect(*/connect(mapStateToProps, 
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        toggleFollowingInProgress,
        getUsers
    }
    )(UsersApiContainer)/*)*/;

export default DialogsContainer;