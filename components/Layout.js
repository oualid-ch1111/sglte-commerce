import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} - SGLT` : 'SGLT'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>

      <div className="flex flex-col min-h-screen bg-light">
        <header
          className={`fixed w-full z-10 ${
            scrolling
              ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
              : 'bg-black'
          } text-red-900 shadow-sm transition-all duration-300`}
        >
          <nav className="container d-flex justify-content-between py-2 px-6 animate__animated animate__fadeInDown">
            <Link
              href="/"
              className="text-white text-decoration-none display-4 font-weight-bold transform transition-transform hover:scale-105 animate-rotateIn animate-pulse"
            >
              SGLT
            </Link>

            <div className="space-x-7 d-flex align-items-center">
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white animate__animated animate__tada">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link
                href="/login"
                className="btn btn-warning ml-3 transition-all hover:shadow-lg animate__animated animate__pulse"
              >
                Se connecter
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto my-8 p-6 bg-light rounded mt-20 animate__animated animate__fadeInUp">
          {children}
        </main>
        <footer className="bg-dark text-white animate__animated animate__fadeIn">
          <div className="container py-4 text-center">
            <p className="mb-0">
              Copyright © 2023 <b>SGLT</b>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
