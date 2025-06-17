import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

const FeedbackForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call for feedback submission
      // Replace with actual API call: await submitFeedback(formData);
      console.log('Feedback submitted:', formData);
      setFormData({ name: '', email: '', feedbackType: '', message: '' });
      setErrors({ submit: 'Thank you for your feedback!' });
    } catch (error) {
      console.error('Feedback submission error:', error);
      setErrors({
        submit: 'Failed to submit feedback. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative  py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      {/* Background decorative elements */}
      

      <div className="relative z-10 w-full max-w-md">
       

        {/* Feedback Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Share Your Feedback
            </h2>
            <p className="text-slate-600">
              Help us improve EatWisely! Your input is invaluable.
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-12 bg-white pr-4 py-4 border-2  text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-300' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.name}</p>}
            </div>

            {/* Email */}
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
                  className={`w-full pl-12 bg-white pr-4 py-4 border-2  text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-300' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Feedback Type
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleInputChange}
                  className={`w-full pl-12 bg-white pr-4 py-4 border-2  text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none ${
                    errors.feedbackType ? 'border-red-300' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <option value="" disabled>Select feedback type</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="bug">Bug Report</option>
                  <option value="general">General Feedback</option>
                </select>
              </div>
              {errors.feedbackType && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.feedbackType}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Feedback
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full bg-white p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-y min-h-[120px] ${
                    errors.message ? 'border-red-300' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                  placeholder="Tell us your thoughts..."
                ></textarea>
              </div>
              {errors.message && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.message}</p>}
            </div>

            {/* Submit Error/Success */}
            {errors.submit && (
              <div
                className={`border rounded-xl p-4 ${
                  errors.submit.includes('Thank you')
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <p
                  className={`text-sm ${
                    errors.submit.includes('Thank you') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
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
                  Submit Feedback
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;