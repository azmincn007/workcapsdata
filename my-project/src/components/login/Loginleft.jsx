// src/components/LeftSection.jsx
import { Link } from 'react-router-dom';
import illustration from '../../assets/signupilus.png';

export default function LoginLeft() {
  return (
    <div className="w-full lg:w-[60%]  flex-col justify-end font-Poppins hidden md:flex">
      <div className="max-w-md flex-1 flex flex-col justify-end text-left">
        <h2 className="text-4xl font-bold mb-2 font-Poppins tracking-wide">Log In to</h2>
        <p className="text-xl text-gray-600 mb-6 tracking-wide">Capsdata Technology</p>
      </div>

      <div className="flex-1 flex items-start justify-left">
        <div className="text-sm mr-4 mt-[80px] text-left">
          <div className="text-gray-600">If you don't have an account</div>
          <div>
            <Link to="/signup" className="text-blue-500">Sign Up Here</Link>
          </div>
        </div>
        <img src={illustration} alt="signup" className="w-[250px] h-[400px] object-cover" />
      </div>
    </div>
  );
}