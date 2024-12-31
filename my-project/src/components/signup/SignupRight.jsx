import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import fbicon from '../../assets/icons/fbicon.png';
import appleicon from '../../assets/icons/appleicon.png';
import googleicon from '../../assets/icons/googleicon.png';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupRight() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: data => axios.post('http://localhost:5001/register', data),
    onSuccess: () => {
      toast.success("Signup successful!");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    },
    onError: (error) => {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage(error.response.data.message || "User already exists");
        } else {
          setErrorMessage(error.response.data.message || "Signup failed");
        }
      } else {
        setErrorMessage("Signup failed");
      }
    }
  });

  const onSubmit = (data) => {
    setErrorMessage('');
    
    // Validate that password and confirmPassword match
    if (data.password !== data.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
    }

    // Prepare data for API
    const payload = {
        name: data.username, // Assuming username is used as name
        email: data.email,
        password: data.password,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto md:my-0 p-0 md:p-6 font-Poppins">
      <h2 className="text-2xl font-semibold mb-8 text-left hidden md:block">Sign Up</h2>
      
      {errorMessage && (
        <div className="bg-red-100 text-[12px] text-red-600 p-2 rounded mb-4 opacity-75">
          {errorMessage}
        </div>
      )}

      <div className="text-sm text-left mb-4 md:hidden">
        <h2 className="text-2xl font-bold mb-2 tracking-wide">Create an Account</h2>
        <p className="text-gray-600 mb-2">Join us to enjoy our services.</p>
        <div>
          <Link to="/login" className="text-blue-500">Already have an account? Log In Here</Link>
        </div>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 py-3 bg-[#F3F4FF] rounded-lg text-sm focus:outline-none"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        {/* Username Input */}
        <div className="relative">
          <input
            id="username"
            placeholder="Create User name"
            className="w-full px-4 py-3 bg-[#F3F4FF] rounded-lg text-sm focus:outline-none"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#F3F4FF] rounded-lg text-sm focus:outline-none pr-10"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 bg-[#F3F4FF] rounded-lg text-sm focus:outline-none pr-10"
            {...register('confirmPassword', { required: 'Please confirm your password' })}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#5B5FED] hover:bg-[#4A4EDC]'} text-white py-3 px-4 rounded-lg mt-6`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Register'}
        </button>

        <div className="text-center text-sm text-gray-500 mt-6">
          or continue with
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button className="p-2 rounded-full hover:bg-gray-50">
            <img src={fbicon} alt="Facebook" className="w-8 h-8" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-50">
            <img src={appleicon} alt="Apple" className="w-8 h-8" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-50">
            <img src={googleicon} alt="Google" className="w-8 h-8" />
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}