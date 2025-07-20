import React, { useState } from "react";
import axios from "axios";
import './ProductForm.css';

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name) return "Name is required";
    if (!price) return "Price is required";
    if (isNaN(price) || Number(price) <= 0) return "Price must be a positive number";
    if (!quantity) return "Quantity is required";
    if (isNaN(quantity) || Number(quantity) < 0) return "Quantity must be a non-negative number";
    if (!img) return "Image URL is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    try {
      await axios.post("http://localhost:3000/api/products", {
        name,
        price,
        img,
        quantity
      });
      setName("");
      setPrice("");
      setImg("");
      setQuantity("");
      onProductAdded();
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2 style={{textAlign: "center"}}>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={img}
        onChange={e => setImg(e.target.value)}
      />
      <button type="submit">Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;