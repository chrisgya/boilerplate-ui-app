import { useAtom } from "jotai";
import React from "react";
import { RouteProps, RouteComponentProps, Route, Redirect } from "react-router-dom";
import { isLoginAtom } from "../../store/userAtom";
import Navbar from "./Navbar";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

export const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  // const { state: { user: { isLoggedIn } } } = React.useContext(AppContext);
  const [isLoggedIn] = useAtom(isLoginAtom)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <>< Navbar /> <Component {...props} /></> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
    />
  );
};

