import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Calendar,
  Heart,
  Mail,
  CheckCircle,
  Loader,
  LogOut,
} from "lucide-react";
import {
  selectUserProfile,
  logoutUser,
  fetchUserProfile,
} from "../redux/slices/userSlice";
import { updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || "",
    email: user?.email || "",
  });
  const headingRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    }
  }, [user, navigate]);
  useEffect(() => {
    if (errors.submit) {
      const timer = setTimeout(() => {
        setErrors(prev => ({ ...prev, submit: '' }));
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, [errors.submit]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Please enter a valid age";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await updateProfile({
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email,
      });

      // Refresh user profile in Redux
      await dispatch(fetchUserProfile()).unwrap();

      setErrors({ submit: "Profile updated successfully" });
    } catch (error) {
      console.error("Update profile error:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setErrors({ submit: "Failed to logout. Please try again." });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center ">
     

      <div className="relative z-10 w-full max-w-md">
       

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Your Profile
            </h2>
            <p className="text-slate-600">Update your details below</p>
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
                  className={`w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.name
                      ? "border-red-300"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.age
                      ? "border-red-300"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                  placeholder="Enter your age"
                />
              </div>
              {errors.age && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">
                  {errors.age}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Gender
              </label>
              <div className="relative">
                <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none ${
                    errors.gender
                      ? "border-red-300"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">
                  {errors.gender}
                </p>
              )}
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
                  className={`w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                    errors.email
                      ? "border-red-300"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Error/Success */}
            {errors.submit && (
              <div
                className={`alert ${
                  errors.submit.includes("successfully")
                    ? "alert-success"
                    : "alert-error"
                } bg-${
                  errors.submit.includes("successfully") ? "green" : "red"
                }-50 border border-${
                  errors.submit.includes("successfully") ? "green" : "red"
                }-200 rounded-xl p-4 `}
              >
                <CheckCircle
                  className={`w-5 h-5 ${
                    errors.submit.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  } mr-2`}
                />
                <span
                  className={`text-${
                    errors.submit.includes("successfully") ? "green" : "red"
                  }-600 text-sm`}
                >
                  {errors.submit}
                </span>
              </div>
            )}

            {/* Update Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Update Profile
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full btn btn-outline border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-4 rounded-xl font-semibold text-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
