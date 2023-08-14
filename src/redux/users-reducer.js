import { UsersAPI } from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_IS_FRIEND = 'SET_IS_FRIEND'


let initialState = {
    users: [],
    pageSize: 10,
    portionSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    friend: true
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                /*state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })*/
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                /*state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })*/
            };
        case SET_USERS:
            return { ...state, users: action.users };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };
        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFollowingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        case SET_IS_FRIEND:
            return {...state, friend: action.friend}
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT, totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingInProgress = (isFollowingInProgress, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowingInProgress, userId })
export const setIsFriend = (friend) => ({ type: SET_IS_FRIEND, friend })


export const getUsers = (page, pageSize, friend) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setIsFriend(friend))
        let data = await UsersAPI.getUsers(page, pageSize, friend);
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
        dispatch(toggleFollowingInProgress(true, userId));
        let data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleFollowingInProgress(false, userId));
    }


export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.followUser.bind(UsersAPI), followSuccess)
    }
}


export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.unfollowUser.bind(UsersAPI), unfollowSuccess)
    }
}


export default usersReducer;