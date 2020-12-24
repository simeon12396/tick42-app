import { AnyAction } from "redux";
import { IEmployee } from "../../actions/employees/employeesActions";
import * as employees from "../../types/employees/employeesTypes";

type TState = {
  rawData: IEmployee[] | null;
};

const initialState: TState = {
  rawData: null,
};

const employeesReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case employees.SET_EMPLOYEES:
      return {
        ...state,
        rawData: payload,
      };
    default:
      return state;
  }
};

export { employeesReducer };
