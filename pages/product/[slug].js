import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();

  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div className="alert alert-danger">Product Not Found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className="container mt-5">
        <div className="mb-4">
          <Link href="/" className="btn btn-outline-primary">
            Retour
          </Link>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
              className="img-fluid"
            />
          </div>
          <div className="col-md-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h2>{product.name}</h2>
              </li>
              <li className="list-group-item">Category: {product.category}</li>
              <li className="list-group-item">Brand: {product.brand}</li>
              <li className="list-group-item">
                {product.rating} of {product.numReviews} reviews
              </li>
              <li className="list-group-item">
                Description: {product.description}
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="card border-primary p-4">
              <div className="mb-3 d-flex justify-content-between">
                <span>Price:</span>
                <strong>${product.price}</strong>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <span>Status:</span>
                <span>
                  {product.countInStock > 0 ? (
                    <span className="text-success">In stock</span>
                  ) : (
                    <span className="text-danger">Unavailable</span>
                  )}
                </span>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={addToCartHandler}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
