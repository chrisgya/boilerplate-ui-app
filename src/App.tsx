import React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Home from './component/home/Home';
import { NotFound, PrivateRoute } from './component/shared';
import { ChangePassword, ForgotPassword, Login, Profile, ResetPassword, Signup } from './component/user';


const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <div>
      <ToastContainer position="bottom-right" />


      <Switch>
        <PrivateRoute exact path="/" component={Home} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />

        <PrivateRoute exact path="/change-password" component={ChangePassword} />
        {/* <PrivateRoute path="/activities/:id" component={ActivityDetails} /> */}
        {/* <PrivateRoute key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} /> */}
        <PrivateRoute path="/profile/:username" component={Profile} />
        <Route component={NotFound} />
      </Switch>



    </div>
  );
}

export default withRouter(App);
