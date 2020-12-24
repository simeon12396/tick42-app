import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { companiesReducer } from "./companiesReducer/companiesReducer";
import { employeesReducer } from "./employeesReducer/employeesReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["companies"],
};

const rootReducer = combineReducers({
  companiesReducer,
  employeesReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
