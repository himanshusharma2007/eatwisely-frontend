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
  Camera,
  Weight,
  AlertTriangle,
  Shield,
  X,
  Plus,
} from "lucide-react";
import {
  selectUserProfile,
  logoutUser,
  fetchUserProfile,
} from "../redux/slices/userSlice";
import { updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

// Common suggestions for diseases and allergies
const COMMON_DISEASES = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  "High Cholesterol",
  "Thyroid",
  "Migraine",
  "COPD",
  "Depression",
  "Anxiety",
  "Obesity",
  "Osteoporosis",
  "Kidney Disease",
  "Liver Disease",
];

const COMMON_ALLERGIES = [
  "Peanuts",
  "Tree Nuts",
  "Shellfish",
  "Fish",
  "Milk",
  "Eggs",
  "Soy",
  "Wheat",
  "Dust Mites",
  "Pollen",
  "Pet Dander",
  "Latex",
  "Penicillin",
  "Aspirin",
  "Ibuprofen",
  "Sulfa Drugs",
  "Bee Stings",
  "Nickel",
  "Fragrance",
  "Gluten",
];

const ProfilePage = () => {
  const user = useSelector(selectUserProfile);
  console.log('user', user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || "",
    email: user?.email || "",
    password: "",
    diseases: user?.diseases || [],
    allergies: user?.allergies || [],
    weight: user?.weight || "",
  });

  // Autocomplete states
  const [diseaseInput, setDiseaseInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [showDiseaseSuggestions, setShowDiseaseSuggestions] = useState(false);
  const [showAllergySuggestions, setShowAllergySuggestions] = useState(false);

  const headingRef = useRef(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        age: user.age || "",
        gender: user.gender || "",
        email: user.email || "",
        password: "",
        diseases: user.diseases || [],
        allergies: user.allergies || [],
        weight: user.weight || "",
      });
      if (user.profileImage) {
        setImagePreview(user.profileImage);
      }
    }
  }, [user]);
  useEffect(() => {
    if (errors.submit) {
      const timer = setTimeout(() => {
        setErrors((prev) => ({ ...prev, submit: "" }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors.submit]);

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = [
      formData.name,
      formData.age,
      formData.gender,
      formData.email,
      formData.weight,
      imagePreview,
      formData.diseases.length > 0,
      formData.allergies.length > 0,
    ];

    const completedFields = fields.filter(
      (field) => field && field !== "" && field !== false
    ).length;

    return Math.round((completedFields / fields.length) * 100);
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file", file);
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setErrors("Image size should be less than 5MB");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle disease input and suggestions
  const handleDiseaseInputChange = (e) => {
    const value = e.target.value;
    setDiseaseInput(value);
    setShowDiseaseSuggestions(value.length > 0);
  };

  const addDisease = (disease) => {
    if (disease && !formData.diseases.includes(disease)) {
      setFormData((prev) => ({
        ...prev,
        diseases: [...prev.diseases, disease],
      }));
    }
    setDiseaseInput("");
    setShowDiseaseSuggestions(false);
  };

  const removeDisease = (diseaseToRemove) => {
    setFormData((prev) => ({
      ...prev,
      diseases: prev.diseases.filter((disease) => disease !== diseaseToRemove),
    }));
  };

  // Handle allergy input and suggestions
  const handleAllergyInputChange = (e) => {
    const value = e.target.value;
    setAllergyInput(value);
    setShowAllergySuggestions(value.length > 0);
  };

  const addAllergy = (allergy) => {
    if (allergy && !formData.allergies.includes(allergy)) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, allergy],
      }));
    }
    setAllergyInput("");
    setShowAllergySuggestions(false);
  };

  const removeAllergy = (allergyToRemove) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter(
        (allergy) => allergy !== allergyToRemove
      ),
    }));
  };

  const filterSuggestions = (suggestions, input) => {
    return suggestions
      .filter((item) => item.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
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

    if (
      formData.weight &&
      (isNaN(formData.weight) || formData.weight < 1 || formData.weight > 500)
    ) {
      newErrors.weight = "Please enter a valid weight";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const submitData = new FormData();

    submitData.append("name", formData.name);
    submitData.append("age", parseInt(formData.age));
    submitData.append("gender", formData.gender);
    submitData.append("email", formData.email);
    if (formData.password) submitData.append("password", formData.password);
    if (formData.weight) submitData.append("weight", formData.weight);
    // Remove JSON.stringify and append each disease/allergy individually
    formData.diseases.forEach((disease) => {
      submitData.append("diseases[]", disease);
    });

    formData.allergies.forEach((allergy) => {
      submitData.append("allergies[]", allergy);
    });
    console.log("profileImage", profileImage);
    if (profileImage) submitData.append("profileImage", profileImage);
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      await updateProfile(submitData);
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

  const completionPercentage = calculateProfileCompletion();
  const progressColor = () =>{
    if (completionPercentage >= 60) {
      return "text-green-500";
    } else if (completionPercentage >= 45) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  }
  return (
    <section className="relative  py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="relative z-10 w-full max-w-2xl">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          {/* Header with Progress Circle */}
          <div ref={headingRef} className="text-center mb-8">
            <div className="relative inline-block mb-6">
              {/* Profile Image with Progress Circle */}
              <div className="relative">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 45 * (1 - completionPercentage / 100)
                    }`}
                    className={`${progressColor()} transition-all duration-500`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    onClick={handleImageClick}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {completionPercentage}%
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Hi {user?.name?.split(" ")[0] || "there"}!
            </h2>

            <p className="text-slate-600">
              Complete your profile for better recommendations
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  {console.log("formData.name", formData.name)}
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
                  Age *
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender *
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

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Weight (kg)
                </label>
                <div className="relative">
                  <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                      errors.weight
                        ? "border-red-300"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                    placeholder="Enter your weight"
                  />
                </div>
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {errors.weight}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address *
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

            {/* Password */}
            {/* <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white px-4 py-4 text-zinc-700 border-2 border-slate-200 hover:border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter new password"
              />
            </div> */}

            {/* Diseases */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Medical Conditions
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={diseaseInput}
                  onChange={handleDiseaseInputChange}
                  onFocus={() =>
                    setShowDiseaseSuggestions(diseaseInput.length > 0)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowDiseaseSuggestions(false), 200)
                  }
                  className="w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 border-slate-200 hover:border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Type to add medical conditions"
                />
                {showDiseaseSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                    {filterSuggestions(COMMON_DISEASES, diseaseInput).map(
                      (disease, index) => (
                        <div
                          key={index}
                          onClick={() => addDisease(disease)}
                          className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-slate-700"
                        >
                          {disease}
                        </div>
                      )
                    )}
                    {diseaseInput && (
                      <div
                        onClick={() => addDisease(diseaseInput)}
                        className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-emerald-600 border-t border-slate-100"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add "{diseaseInput}"
                      </div>
                    )}
                  </div>
                )}
              </div>
              {formData.diseases.length > 0 && (
                <div className="flex flex-wrap  items-center gap-2 mt-3">
                  <span className="text-sm text-emerald-500">Added : </span>
                  {formData.diseases.map((disease, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                    >
                      {disease}
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-red-900"
                        onClick={() => removeDisease(disease)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Allergies
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={allergyInput}
                  onChange={handleAllergyInputChange}
                  onFocus={() =>
                    setShowAllergySuggestions(allergyInput.length > 0)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowAllergySuggestions(false), 200)
                  }
                  className="w-full pl-12 bg-white pr-4 py-4 text-zinc-700 border-2 border-slate-200 hover:border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Type to add allergies"
                />
                {showAllergySuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                    {filterSuggestions(COMMON_ALLERGIES, allergyInput).map(
                      (allergy, index) => (
                        <div
                          key={index}
                          onClick={() => addAllergy(allergy)}
                          className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-slate-700"
                        >
                          {allergy}
                        </div>
                      )
                    )}
                    {allergyInput && (
                      <div
                        onClick={() => addAllergy(allergyInput)}
                        className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-emerald-600 border-t border-slate-100"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add "{allergyInput}"
                      </div>
                    )}
                  </div>
                )}
              </div>
              {formData.allergies.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-sm text-emerald-500">Added : </span>

                  {formData.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {allergy}
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-orange-900"
                        onClick={() => removeAllergy(allergy)}
                      />
                    </span>
                  ))}
                </div>
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
                }-200 rounded-xl p-4 flex items-center`}
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

            {/* Buttons */}
            <div className="space-y-4">
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

              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-4 rounded-xl font-semibold text-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
