import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { companiesReducer } from "./companiesReducer/companiesReducer";
import { employeesReducer } from "./employeesReducer/employeesReducer";
import { projectsReducer } from "./projectsReducer/projectsReducer";
import { companyAddressesReducer } from "./companyAddressesReducer/companyAddressesReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["companiesReducer", "employeesReducer", "projectsReducer", "companyAddressesReducer"],
};

const rootReducer = combineReducers({
  companiesReducer,
  employeesReducer,
  projectsReducer,
  companyAddressesReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
