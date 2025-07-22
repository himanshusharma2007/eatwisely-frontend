import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { login, socialLogin } from '../services/api';
import { fetchUserProfile } from '../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig'; // Import initialized auth
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const headingRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        headingRef.current.style.transition = 'all 0.8s ease-out';
        headingRef.current.style.opacity = '1';
        headingRef.current.style.transform = 'translateY(0)';
      }, 100);
    }
    
    if (formRef.current) {
      formRef.current.style.opacity = '0';
      formRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        formRef.current.style.transition = 'all 0.6s ease-out';
        formRef.current.style.opacity = '1';
        formRef.current.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      
      // Fetch user profile and set in Redux
      await dispatch(fetchUserProfile()).unwrap();
      
      // Redirect to scan page
      navigate('/scan');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        submit: error.response?.data?.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await socialLogin({
        email: user.email,
        name: user.displayName,
        socialId: user.uid
      });

      // Fetch user profile and set in Redux
      await dispatch(fetchUserProfile()).unwrap();
      
      // Redirect to scan page
      navigate('/scan');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrors({
        submit: error.message || 'Google sign-in failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-r from-cyan-200/15 to-emerald-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
          <h1 className="text-4xl font-bold leading-[2] font-pacifico bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            EatWisely
          </h1>
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          <div ref={headingRef} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-slate-600">
              Sign in to continue your healthy journey
            </p>
          </div>

          <div ref={formRef} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-300' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 bg-white pr-12 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-300' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password}</p>}
            </div>

            
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="divider text-slate-600">OR</div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:border-emerald-300 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
             <FcGoogle />
              Sign in with Google
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={handleSignupRedirect}
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-500">
          <p className="text-sm">
            By signing in, you agree to our{' '}
            <span className="text-emerald-600 cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-emerald-600 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;