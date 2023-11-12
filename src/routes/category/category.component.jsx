import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectCategoriesLoading,
} from "../../store/categories/categories.selector";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  //console.log("render/re-rendering category component")
  const categoriesMap = useSelector(selectCategoriesMap); // selector, runs every time the state object has updated in the root reducer.
  const [products, setProducts] = useState(categoriesMap[category]); // components replies on async fetch code, we need some safe guards in #20
  const isLoading = useSelector(selectCategoriesLoading);

  useEffect(() => {
    //console.log("effect fired call")
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Link to=".." relative="path">
        &#10558; back to shop
      </Link>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
