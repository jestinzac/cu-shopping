import { createSelector } from "reselect";
/**
 * Memorization is the process in which you cache the previous value of something so that if the input has not changed,
 * then you just return back the same output.
 *
 * Pure function
 * const add = (a, b) => a + b;
 * add(3, 6)
 */

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer], // input selectors
  (categoriesSlice) => categoriesSlice.categories // output selectors, o/p from above 'state.categories' is the argument here as 'categoriesSlice'
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)

