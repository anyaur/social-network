import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';

function withRouter(Componen: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Componen
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

interface ProfileCProps {
    getUserProfile(userId: number): void;
    getUserStatus(status: string): void;
    updateUserStatus(status: string): void;
    profile: any;
    isAuth: boolean;
    router: any;
    status: string;
    authorizedUserId: number;
    history: any
}

class ProfileContainer extends React.Component<ProfileCProps> {
    componentDidMount(): void {
        let userId = this.props.router.params.userId;
        if (!userId) {

            userId = this.props.authorizedUserId;
            /*if (!userId) {
                this.props.history.push("/login")
            }*/
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus} />
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


const mapStateToProps = (state: any) => {
    return {
        profile: state.postsData.profile,
        status: state.postsData.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

/*let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)*/

export default connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}) (withRouter(AuthRedirectComponent)) // (withRouter(AuthRedirectComponent))