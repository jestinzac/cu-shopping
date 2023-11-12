import { compose, createStore, applyMiddleware } from "redux";

import { rootReducer } from "./root-reducer";
//import logger from 'redux-logger';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

import customLoggerMiddleware from "./common/middleware/custom-logger";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  //blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && customLoggerMiddleware,
  thunk,
].filter(Boolean);
/**
 * 2 === 3 && { a: 'string' } => false
 * [2 === 3 && { a: 'string' }].filter(Boolean) => [] : if false it will filter and return empty array
 * [3 === 3 && { a: 'string' }].filter(Boolean) => [{ a: 'string' }]
 */

// enables usage of Redux devtools
const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persister = persistStore(store); // Persist and rehydrate a redux store
