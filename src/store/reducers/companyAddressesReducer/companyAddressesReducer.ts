import { AnyAction } from "redux";
import { ICompanyAddress } from "../../actions/companyAddresses/companyAddressesActions";
import * as companyAddresses from "../../types/companyAddresses/companyAddressesTypes";

type TState = {
  rawData: ICompanyAddress[] | null;
};

const initialState: TState = {
  rawData: null,
};

const companyAddressesReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case companyAddresses.SET_COMPANY_ADDRESSES:
      return {
        ...state,
        rawData: payload,
      };
    default:
      return state;
  }
};

export { companyAddressesReducer };
