import { AnyAction } from "redux";
import { ICompany } from "../../actions/companies/companiesActions";
import * as companies from "../../types/companies/companiesTypes";

type TState = {
  rawData: ICompany[] | null;
};

const initialState: TState = {
  rawData: null,
};

const companiesReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case companies.SET_COMPANIES:
      return {
        ...state,
        rawData: payload,
      };
    default:
      return state;
  }
};

export { companiesReducer };
