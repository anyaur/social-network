import {createSelector} from "reselect"

export const getUsersDataSelector = (state) => {
    return state.usersData.users;
}

export const getUsersData = createSelector(getUsersDataSelector, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state) => {
    return state.usersData.pageSize;
}

export const getPortionSize = (state) => {
    return state.usersData.portionSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersData.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersData.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersData.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersData.followingInProgress;
}