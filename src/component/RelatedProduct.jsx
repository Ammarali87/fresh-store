import React from "react";
import shortTitle from "../help/shortTitle"; // Ensure this import is correct
import { Link } from "react-router-dom";

export default function RelatedProduct({ product }) {
  return (
  <Link to={`deetails/${product.id}`}>
    <div className="product-item ">
      <h4 className="mb-2">{shortTitle(product.title)}</h4>
      <img
        className="w-full h-full object-cover mb-2"
        src={product.imageCover}
        alt={product.title}
        />
      <p>{product.price} $</p>
      
    </div>
        </Link>

  );
}
