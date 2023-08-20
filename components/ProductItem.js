/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext } from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card shadow-sm">
      <Link href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h5 className="card-title text-truncate text-dark cursor-pointer hover:text-success">
            {product.name}
          </h5>
        </Link>
        <p className="">{product.brand}</p>
        <h6 className="card-subtitle mb-3 text-muted">${product.price}</h6>
        <button className="btn btn-primary w-100">Ajouter au panier</button>
      </div>
    </div>
  );
}
