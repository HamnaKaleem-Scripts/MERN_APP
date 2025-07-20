import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./components/ProductForm";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    quantity: "",
    img: ""
  });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      img: product.img
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/products/${editingProduct._id}`, editForm);
    setEditingProduct(null);
    fetchProducts();
  };

  const updateProduct = async (id, currentProduct) => {
    const name = window.prompt("Enter new name:", currentProduct.name);
    const price = window.prompt("Enter new price:", currentProduct.price);
    const quantity = window.prompt("Enter new quantity:", currentProduct.quantity);
    const img = window.prompt("Enter new image URL:", currentProduct.img);

    await axios.put(`http://localhost:3000/api/products/${id}`, {
      name,
      price,
      quantity,
      img
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/api/products/${id}`);
    fetchProducts(); // Refresh the list after deletion
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Product List</h1>
      <ProductForm onProductAdded={fetchProducts} />
      {editingProduct && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="product-form">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={editForm.name}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editForm.price}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={editForm.quantity}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="img"
                placeholder="Image URL"
                value={editForm.img}
                onChange={handleEditChange}
              />
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="submit" className="update-btn">Save</button>
                <button type="button" className="delete-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={product.img || "https://placehold.co/150x150"}
              alt={product.name}
              onError={e => e.target.src = "https://placehold.co/150x150"}
            />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="quantity">Quantity: {product.quantity}</p>
            <div className="product-card-actions">
              <button className="update-btn" onClick={() => openEditModal(product)}>Update</button>
              <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;