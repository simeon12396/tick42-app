import { AnyAction, Dispatch } from "redux";
import { httpService } from "../../../services/httpService";
import * as companies from "../../types/companies/companiesTypes";

interface ICompany {
  id: string;
  name: string;
  business: string;
  slogan: string;
}

const setCompanies = (payload: ICompany[]) => ({
  type: companies.SET_COMPANIES,
  payload,
});

const fetchCompanies = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const response = await httpService("get", "companies");
    dispatch(setCompanies(response));
  };
};

export type { ICompany };

export { fetchCompanies, setCompanies };
