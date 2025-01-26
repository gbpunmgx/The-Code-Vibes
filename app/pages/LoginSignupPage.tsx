import { useState } from 'react';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white rounded-lg shadow-lg">
        {/* Toggle Buttons */}
        <div className="flex justify-around">
          <button
            onClick={toggleForm}
            className={`py-2 px-4 w-1/2 text-white font-semibold rounded-l-lg ${isLogin ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            Login
          </button>
          <button
            onClick={toggleForm}
            className={`py-2 px-4 w-1/2 text-white font-semibold rounded-r-lg ${isLogin ? 'bg-gray-300' : 'bg-blue-500'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms Container */}
        <div className="relative overflow-hidden">
          <div
            className={`absolute w-full transition-transform duration-500 ease-in-out ${
              isLogin ? 'transform translate-x-0' : 'transform translate-x-full'
            }`}
          >
            {/* Login Form */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Login</h2>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <button className="w-full p-3 bg-blue-500 text-white rounded-lg">Login</button>
            </div>
          </div>

          <div
            className={`absolute w-full transition-transform duration-500 ease-in-out ${
              isLogin ? 'transform translate-x-full' : 'transform translate-x-0'
            }`}
          >
            {/* Sign Up Form */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <button className="w-full p-3 bg-blue-500 text-white rounded-lg">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
