import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

interface ProfileProps {
    profile: any;
    status: string;
    updateUserStatus(status: string): void;
}

const Profile = (props: ProfileProps) => {
    return (
        <div className={classes.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;