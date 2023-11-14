// Saga's is that they fire after the reducers have updated
import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/categories.saga";
import { userSagas } from "./user/user.saga";

// ES6 Generator Function
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
