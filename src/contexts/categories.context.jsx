import { createContext, useState, useEffect } from "react";

//import SHOP_DATA from "../shop-data";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  // this is performed to insert data into DB for the first time, rather me creating it manually
  // useEffect(() => {
  //   addCollectionAndDocument('categories', SHOP_DATA); // firebase util method
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async() => {
      const categoryMap = await getCategoriesAndDocuments();
      //console.log(categoryMap);
      setCategoriesMap(categoryMap)
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
