import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import CATEGORIES_ACTION_TYPES from "./categories.types";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments); //Anywhere you have a function and you want to turn it into an effect you essentially use the call() keyword.
    yield put(fetchCategoriesSuccess(categories)); // instead of dispatch we call yield put()
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// generators respond to actions the same way that reducers do inside of their switch
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); // receives latest actions
}

export function* categoriesSaga() {
  yield all([call(fetchCategoriesAsync)]); // category saga aggregator. essentially an effect, which run everything and only complete when all of its done - pause, finish and then continue rest of code underneath if any
}
