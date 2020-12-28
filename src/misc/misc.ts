import { ICompany } from "../store/actions/companies/companiesActions";
import { ICompanyAddress } from "../store/actions/companyAddresses/companyAddressesActions";
import { IEmployee } from "../store/actions/employees/employeesActions";
import { IProject } from "../store/actions/projects/projectsActions";

type TRequest = "get" | "post" | "put" | "patch" | "delete";

type TEndPoint = "companies" | "company-addresses" | "employees" | "projects";

type TVariant = "inherit" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly" | undefined;

type TButton = "button" | "submit" | "reset";

type TOption = {
  type: (IEmployee | ICompany | ICompanyAddress | IProject)[];
};

export type { TRequest, TEndPoint, TVariant, TButton, TOption };
