// Products.js

import './model.css';
import React, { useState } from 'react';
import Modal from './Modal';

const Products = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setIsOpen(false);
  };

  return (
    <div className="products-container">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.recipe.image} alt={item.recipe.label} onClick={() => openModal(item.recipe)} />
          <div className="card-body">
            <h5 className="card-title">{item.recipe.label}</h5>
            <p className="card-text">Total amount of Calories: {item.recipe.calories}</p>
            <button className="card-link" onClick={() => openModal(item.recipe)}>View Details</button>
          </div>
        </div>
      ))}
      <Modal isOpen={isOpen} handleClose={closeModal} recipe={selectedRecipe} />
    </div>
  );
};

export default Products;
