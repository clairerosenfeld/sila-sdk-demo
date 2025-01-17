import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import CustomRoute from './CustomRoute';

import { useAppContext } from '../context/AppDataProvider';

const RouteConfig = ({ routes, inFlow }) => {
  const { app } = useAppContext();
  console.log(inFlow);
  return (
    <Switch>
      {routes.map((route, i) => <Route
        key={i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        routes={route.routes}
        render={(props) => {
          if ((app.activeUser && route.restricted && inFlow) || (!app.activeUser && !route.restricted && inFlow) || route.all) {
            return <CustomRoute route={route} app={app} inFlow={inFlow} {...props} />
          } else {
            return <Redirect to="/" />
          }
        }} />
      )}
    </Switch>
  );
};

RouteConfig.propTypes = {
  /**
   * The routes array
   */
  routes: PropTypes.array,
  /**
   * If the current route is in the selected flow
   */
  inFlow: PropTypes.bool.isRequired
};

export default RouteConfig;




