import { useEffect, useState } from "react";
import api from "../../api/axios";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/seller/products/");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>My Products</h2>

      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SellerProducts;
