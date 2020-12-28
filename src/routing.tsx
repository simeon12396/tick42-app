import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomAlert from "./components/common/customProgress/customProgress";
import MainLayout from "./layouts/mainLayout/mainLayout";

const HomePage = lazy(() => import("./pages/homePage/homePage"));
const CompanyDetailsPage = lazy(() => import("./pages/companyDetailsPage/companyDetailsPage"));
const EmployeeDetailsPage = lazy(() => import("./pages/employeeDetaislPage/employeeDetailsPage"));
const JobAreaDetailsPage = lazy(() => import("./pages/jobAreaDetailsPage/jobAreaDetailsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/projectDetailsPage/projectDetailsPage"));
const AddProjectPage = lazy(() => import("./pages/addProjectPage/addProjectPage"));

const Routing = (): JSX.Element => (
  <Router>
    <MainLayout>
      <Suspense fallback={<div>{<CustomAlert />}</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/company/:id" component={CompanyDetailsPage} />
          <Route exact path="/employee/:id" component={EmployeeDetailsPage} />
          <Route exact path="/job-area/:jobAreaName" component={JobAreaDetailsPage} />
          <Route exact path="/project-details/:id" component={ProjectDetailsPage} />
          <Route exact path="/add-project/" component={AddProjectPage} />
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routing;
