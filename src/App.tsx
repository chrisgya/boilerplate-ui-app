import React from 'react';
import { Route, Switch, useLocation, } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ReactTooltip from 'react-tooltip';
import { Home, ForgotPassword, Login, ResetPassword, Signup, VerifyAccount, NotFound, ProfilePage } from './pages';
import { PrivateRoute } from './components/routes/PrivateRoute';


const App = () => {
  const location = useLocation();
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <ReactTooltip />

      <Switch>
        <PrivateRoute exact path="/" component={Home} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <Route exact path="/verify-account/:token" component={VerifyAccount} />

        {/* <PrivateRoute path="/activities/:id" component={ActivityDetails} /> */}
        <PrivateRoute key={location.key} path={["/profile", "/profile/:id"]} component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>



    </div>
  );
}

export default App;

