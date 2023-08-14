import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));



interface AppCProps {
  initialized: boolean;
  initializeApp(): void;
}

class App extends React.Component<AppCProps> {
  componentDidMount(): void {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="wrapper">
        <HeaderContainer />
        <Navbar />
        <React.Suspense fallback={<div>loading</div>}>        
        <Routes>
          <Route path="/" element={<ProfileContainer />} />
          <Route path="/Profile" element={<ProfileContainer />} />
          <Route path="/Profile/:userId" element={<ProfileContainer />} />
          <Route path="/Messages/*" element={<DialogsContainer />} />
          <Route path="/Users" element={<UsersContainer />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        </React.Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    initialized: state.app.initialized
  }
}

export default connect(mapStateToProps, { initializeApp })(App);