import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomePage = lazy(() => import("./pages/homePage/homePage"));

const Routing = (): JSX.Element => (
  <Router>
    <Suspense fallback={<div>{"Loading...."}</div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routing;
