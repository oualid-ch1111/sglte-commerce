import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

export default function RegisterScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ name, email, password, confirmPassword }) => {
    console.log(name, email, password, confirmPassword);
  };

  return (
    <Layout title="Register">
      <div className="center-container">
        <div className="auth-container">
          <h1 className="mb-6 text-2xl font-semibold">Register</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label className="input-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                {...register('name', {
                  required: 'Please enter your name',
                })}
                className="input-field"
                id="name"
                autoFocus
              />
              {errors.name && (
                <div className="text-red-500 mt-1">{errors.name.message}</div>
              )}
            </div>
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
                    message: 'Please enter a valid email',
                  },
                })}
                className="input-field"
                id="email"
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
                    message: 'Password should be at least 6 characters',
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
            <div>
              <label className="input-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  minLength: {
                    value: 6,
                    message: 'Password should be at least 6 characters',
                  },
                })}
                className="input-field"
                id="confirmPassword"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <button className="auth-button" type="submit">
                Register
              </button>
            </div>
            <div>
              Already have an account?{' '}
              <Link href="/login" className="link-hover">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
