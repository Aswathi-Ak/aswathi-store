import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(json))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setAllProducts(json)
        setProducts(json)
        setLoading(false)
      })
  }, [])

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      setProducts(allProducts)
    } else {
      setProducts(allProducts.filter(product => product.category === category))
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="App">
      <header>
        <h1>Aswathi's Store</h1>
        <nav>
          <ul>
            <li><a onClick={() => handleCategoryClick('all')}>All</a></li>
            {categories.map(category => (
              <li key={category}>
                <a onClick={() => handleCategoryClick(category)}>{category}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <div className="productsContainer">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="productCard">
              <div className="productImage" style={{backgroundImage: `url(${product.image})`}}></div>
              <div className="productDetails">
                <p className="productCategory">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <h3>{product.title.slice(0, 20)}...</h3>
                <p className="productPrice">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductList; 