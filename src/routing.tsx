import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/mainLayout";

const HomePage = lazy(() => import("./pages/homePage/homePage"));

const Routing = (): JSX.Element => (
  <Router>
    <MainLayout>
      <Suspense fallback={<div>{"Loading...."}</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routing;
