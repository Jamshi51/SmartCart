import { useState } from "react";
import api from "../../api/axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/seller/products/add/", {
      name,
      price,
    });

    alert("Product Added!");
    setName("");
    setPrice("");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
