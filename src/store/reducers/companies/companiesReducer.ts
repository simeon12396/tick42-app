import { AnyAction } from "redux";
import { ICompany } from "../../actions/companies/companiesActions";
import * as companies from "../../types/companies/companiesTypes";

type TInitialState = {
  companies: ICompany[] | null;
};

const initialState: TInitialState = {
  companies: null,
};

const companiesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case companies.SET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    default:
      return state;
  }
};

export { companiesReducer };
