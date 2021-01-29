import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Home from './component/home/Home';
import { NotFound, PrivateRoute } from './component/shared';
import { ChangePassword, ForgotPassword, Login, Profile, ResetPassword, Signup, VerifyAccount } from './component/user';


const App = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" />


      <Switch>
        <PrivateRoute exact path="/" component={Home} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <Route exact path="/verify-account/:token" component={VerifyAccount} />

        <PrivateRoute exact path="/change-password" component={ChangePassword} />
        {/* <PrivateRoute path="/activities/:id" component={ActivityDetails} /> */}
        {/* <PrivateRoute key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} /> */}
        <PrivateRoute path="/profile/:id" component={Profile} />
        <Route component={NotFound} />
      </Switch>



    </div>
  );
}

export default App;

