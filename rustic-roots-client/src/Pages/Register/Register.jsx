import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Providers/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { handleRegister, manageProfile } = useContext(authContext);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [comPasswordVisible, setComPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
    comPassword: ""
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { name, image, email, password, comPassword } = formData;

    
    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }
    if (password !== comPassword) {
      toast.error("Passwords didn't match");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter");
      return;
    }

    setLoading(true);

    
    handleRegister(email, password)
      .then(() => {
        manageProfile(name, image);
        toast.success("Registration successful!");
        setError(""); 
        setFormData({
          name: "",
          image: "",
          email: "",
          password: "",
          comPassword: ""
        });
        saveUserToDatabase(name, email); 
      })
      .catch((err) => {
        setError(err.message);
        toast.error(`Registration failed: ${err.message}`);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

 
  const saveUserToDatabase = (name, email) => {
    const newUser = { name, email };

    fetch('https://sports-zone-a10-server.vercel.app/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => console.log('User created in DB:', data))
      .catch(error => console.error('Error saving user:', error));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card border-2 rounded-xl w-full max-w-lg shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center">Register your account</h2>
        <form onSubmit={handleSubmit} className="card-body text-white">
          <InputField 
            label="Name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Name" 
            required 
          />
          <InputField 
            label="Photo" 
            name="image" 
            value={formData.image} 
            onChange={handleInputChange} 
            placeholder="Image URL" 
            required 
          />
          <InputField 
            label="Email" 
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleInputChange} 
            placeholder="Email" 
            required 
          />
          <PasswordField 
            label="Password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
            required
          />
          <PasswordField 
            label="Confirm Password" 
            name="comPassword" 
            value={formData.comPassword} 
            onChange={handleInputChange} 
            passwordVisible={comPasswordVisible}
            setPasswordVisible={setComPasswordVisible}
            required
          />
          {error && <p className="text-red-600">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-neutral" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <p className="text-center font-semibold">
          Already Have An Account? 
          <Link className="text-red-500" to="/login">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};


const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered"
      required={required}
    />
  </div>
);


const PasswordField = ({ label, name, value, onChange, passwordVisible, setPasswordVisible, required }) => (
  <div className="form-control relative">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      name={name}
      type={passwordVisible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="input input-bordered"
      required={required}
    />
    <button
      type="button"
      className="absolute top-12 right-4 text-gray-500"
      onClick={() => setPasswordVisible(!passwordVisible)}
      aria-label="Toggle password visibility"
    >
      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
);

export default Register;
