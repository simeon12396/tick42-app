import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { companiesReducer } from "./companies/companiesReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["companies"],
};

const rootReducer = combineReducers({
  companies: companiesReducer,
});

export default persistReducer(persistConfig, rootReducer);
