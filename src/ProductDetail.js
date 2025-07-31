import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="productDetailContainer">
      <Link to="/" className="backButton">← Back to Products</Link>
      
      <div className="productDetailContent">
        <div className="productDetailImage">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="productDetailInfo">
          <div className="productDetailCategory">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </div>
          
          <h1 className="productDetailTitle">{product.title}</h1>
          
          <div className="productDetailPrice">${product.price}</div>
          
          <div className="productDetailRating">
            <span className="ratingStars">
              {'★'.repeat(Math.round(product.rating.rate))}
              {'☆'.repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="ratingText">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="productDetailDescription">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 