import React, { Component } from 'react';
import {
    BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Attendance from './Components/Attendance';
import Profile from './Components/Profile';

export class AppRouting extends Component {

  render() {
    return (
        <>
            <Router>
              <Routes>
                <Route path={`*`} element={<Navigate replace  to="/Isckon/Attendance"/>}/>
                <Route path={`/Isckon/Attendance`} element={<Attendance/>}/>
                <Route path={`/Isckon/Profile`} element={<Profile/>}/>
              </Routes>
            </Router>
        </>
    )
  }
}

export default AppRouting
