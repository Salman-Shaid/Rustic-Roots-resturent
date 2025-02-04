import React, { useContext, useState } from 'react';
import { authContext } from '../../Providers/AuthProvider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { handleGoogleLogin, handleLogin } = useContext(authContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    handleLogin(email, password)
      .then(() => {
        setLoading(false);
        navigate(location.state?.from || '/');
        toast.success('Logged in successfully!');
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Invalid email or password!');
      });
  };

  const googleLoginHandle = () => {
    setLoading(true);
    handleGoogleLogin()
      .then(() => {
        setLoading(false);
        navigate(location.state?.from || '/');
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Google login failed!');
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card border-2 rounded-xl w-full max-w-lg shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="card-body text-green-900">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              className="absolute top-12 right-4 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <label className="label">
              <NavLink
                to="/forget-password"
                state={{ email: document.querySelector("input[name='email']")?.value || '' }}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </NavLink>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-neutral mb-4"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <button
            className="btn border-green-600 text-green-700 w-full"
            onClick={googleLoginHandle}
            disabled={loading}
          >
            <FcGoogle className="mr-2" />
            {loading ? 'Logging in with Google...' : 'Google Login'}
          </button>

          <p className="mt-3">
            New to this website?{' '}
            <NavLink to="/register" className="text-red-500 font-semibold">
              Register
            </NavLink>
          </p>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
