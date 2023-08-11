import React, {useState, useEffect} from 'react';
import classes from './ProfileInfo.module.css';

interface ProfileStatusProps {
    status: string;
    updateUserStatus(status: string): void;
}

const ProfileStatusWithHooks = (props: any) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    }
    
    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value)
    }

    return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input autoFocus={true} onChange={onStatusChange} onBlur={deActivateEditMode} value={status} />
                    </div>
                }
            </div>
        )
    }

export default ProfileStatusWithHooks;