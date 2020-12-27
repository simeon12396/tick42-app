import { AnyAction, Dispatch } from "redux";
import { httpService } from "../../../services/httpService";
import * as companyAddresses from "../../types/companyAddresses/companyAddressesTypes";

interface ICompanyAddress {
  id: string;
  city: string;
  country: string;
  street: string;
  state: string;
  companyId: string;
}

const setCompanyAddresses = (payload: ICompanyAddress[]) => ({
  type: companyAddresses.SET_COMPANY_ADDRESSES,
  payload,
});

const fetchCompanyAddresses = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const response = await httpService("get", "company-addresses");
    dispatch(setCompanyAddresses(response));
  };
};

export type { ICompanyAddress };

export { fetchCompanyAddresses, setCompanyAddresses };
