import React from 'react';

const Modal = ({ isOpen, handleClose, recipe }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{recipe.label}</h2>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
        <h3>Nutrients:</h3>
        <ul>
          {Object.keys(recipe.totalNutrients).map((nutrient, index) => (
            <li key={index}>
              {recipe.totalNutrients[nutrient].label}: {recipe.totalNutrients[nutrient].quantity} {recipe.totalNutrients[nutrient].unit}
            </li>
          ))}
        </ul>
        <h3>Fats:</h3>
        <ul>
          {Object.keys(recipe.totalDaily).map((fat, index) => (
            <li key={index}>
              {recipe.totalDaily[fat].label}: {recipe.totalDaily[fat].quantity}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
