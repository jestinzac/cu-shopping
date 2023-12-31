import CATEGORIES_ACTION_TYPES from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";


import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)


// thunk actions - Thunk also recommends that you declare your thunk actions with that last word async 
// (action driven architecture and separate async behaviour)
// function that returns, a function that gets a dispatch
export const fetchCategoriesAsync = () => async(dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
}

