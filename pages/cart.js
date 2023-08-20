import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const checkOutHandler = () => {
    if (!userInfo) {
      router.push('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    } else {
      router.push('/shipping'); // Sinon, continuez comme d'habitude
    }
  };
  return (
    <Layout title="Shopping Cart">
      <div className="pt-20">
        <h1 className="mb-8 text-2xl font-bold">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-lg">
            Cart is empty.{' '}
            <Link href="/" className="text-blue-500 hover:underline">
              Go shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-6">
            <div className="overflow-x-auto md:col-span-3 shadow-lg rounded p-4 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold">Item</th>
                    <th className="py-4 px-6 text-right font-semibold">
                      Quantity
                    </th>
                    <th className="py-4 px-6 text-right font-semibold">
                      Price
                    </th>
                    <th className="py-4 px-6 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.slug}>
                      <td className="py-4 px-6 flex items-center">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="ml-4">{item.name}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right">${item.price}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => removeItemHandler(item)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="shadow-lg rounded p-6 bg-white">
                <div className="mb-4 flex justify-between text-lg">
                  <span>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}):
                  </span>
                  <span className="font-semibold">
                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </span>
                </div>
                <button
                  onClick={checkOutHandler}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
