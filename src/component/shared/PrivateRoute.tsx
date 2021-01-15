import React from "react";
import { RouteProps, RouteComponentProps, Route, Redirect } from "react-router-dom";
import { AppContext } from "../../store/context";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

export const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const { state: { user: { isLoggedIn } } } = React.useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
    />
  );
};

