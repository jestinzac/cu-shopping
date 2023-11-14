import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesStart } from "../../store/categories/categories.action"; // saga listening to this action, in categories.saga at onFetchCategories() fn

import "./shop.styles.scss";

// Nested route structure
const Shop = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
