import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]); // components replies on async fetch code, we need some safe guards in #20

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Link to=".." relative="path">
        &#10558; back to shop
      </Link>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
