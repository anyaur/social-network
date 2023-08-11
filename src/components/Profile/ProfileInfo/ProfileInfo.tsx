import React from 'react';
import Preloader from '../../common/preloader/preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

interface ProfileInfoProps {
    profile: any;
    status: string;
    updateUserStatus(status: string): void;
}

const ProfileInfo = (props: ProfileInfoProps) => {
    if (!props.profile) {
        return (
            <Preloader />
        )
    }
    return (
        <div>
            <div>
                <img className={classes.img} src='https://sun9-68.userapi.com/impg/_UisA255HgErF4edMvM4oDe5PijotE6bKnlrfA/Ge0al1zqo_Q.jpg?size=1620x2160&quality=96&sign=05f5381ca0b42fdc147f884f6b78ba51&type=album'>
                </img>
            </div>
            <div>
                <img src={props.profile.photos.small}>
                </img>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;