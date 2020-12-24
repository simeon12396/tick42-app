import { AnyAction, Dispatch } from "redux";
import { httpService } from "../../../services/httpService";
import * as employees from "../../types/employees/employeesTypes";

interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirht: string;
  companyId: string;
  jobTitle: string;
  jobArea: string;
  jobType: string;
}

const setEmployees = (payload: IEmployee[]) => ({
  type: employees.SET_EMPLOYEES,
  payload,
});

const fetchEmployees = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const employeesResponse = await httpService("get", "employees");
    dispatch(setEmployees(employeesResponse));
  };
};

export type { IEmployee };

export { fetchEmployees, setEmployees };
