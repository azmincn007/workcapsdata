import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import fbicon from '../../assets/icons/fbicon.png';
import appleicon from '../../assets/icons/appleicon.png';
import googleicon from '../../assets/icons/googleicon.png';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginRight() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const mutation = useMutation(data => {
    return axios.post('http://localhost:5001/login', data)
      .then(response => {
        localStorage.setItem('authtoken', response.data.token);
        navigate('/'); 
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid email or password");
        }
        throw error;
      });
  });

  const isLoading = mutation.isLoading;

  const onSubmit = (data) => {
    setErrorMessage('');
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto md:my-0 p-0 md:p-6 font-Poppins">
      <h2 className="text-2xl font-semibold mb-8 text-left hidden md:block">Login</h2>
      
      {errorMessage && (
        <div className="bg-red-100 text-[12px] text-red-600 p-2 rounded mb-4 opacity-75">
          {errorMessage}
        </div>
      )}

<div className="text-sm mr-4  text-left md:hidden mb-4">
<div className="max-w-md flex-1 flex flex-col justify-end text-left">
        <h2 className="text-2xl font-bold mb-2 font-Poppins tracking-wide">Log In to</h2>
        <p className="text-xl text-gray-600 mb-6 tracking-wide">Capsdata Technology</p>
      </div>
        <div className="text-gray-600">If you don't have an account</div>
        <div>
          <Link to="/signup" className="text-blue-500">Sign Up Here</Link>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div className="relative mb-4">
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 py-3 bg-[#F3F4FF] rounded-lg text-sm focus:outline-none"
            {...register('email')}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#F3F4FF] rounded-lg text-sm focus:outline-none pr-10"
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#5B5FED] hover:bg-[#4A4EDC]'} text-white py-3 px-4 rounded-lg mt-6`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
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

      
    </div>
  );
}