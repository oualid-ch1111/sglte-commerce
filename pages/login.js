import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title="Login">
      <div className="center-container">
        <div className="auth-container">
          <h1 className="mb-6 text-2xl font-semibold">Login</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
                className="input-field"
                id="email"
                autoFocus
              />
              {errors.email && (
                <div className="text-red-500 mt-1">{errors.email.message}</div>
              )}
            </div>
            <div>
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Please enter password',
                  minLength: {
                    value: 6,
                    message: 'password is more than 5 chars',
                  },
                })}
                className="input-field"
                id="password"
              />
              {errors.password && (
                <div className="text-red-500 mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <button className="auth-button" type="submit">
                Login
              </button>
            </div>
            <div>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="link-hover">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
