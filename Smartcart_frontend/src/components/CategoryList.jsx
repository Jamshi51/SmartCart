import { useEffect, useState } from "react";
import { getCategories } from "../api/products";

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <ul>
      <li onClick={() => onSelectCategory(null)}>
        All Products
      </li>

      {categories.map((cat) => (
        <li
          key={cat.id}
          onClick={() => onSelectCategory(cat.slug)}
          style={{ cursor: "pointer" }}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;

