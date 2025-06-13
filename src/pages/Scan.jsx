import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, AlertCircle, Loader, CheckCircle, Send, X } from 'lucide-react';
import { uploadImageAuth, uploadImageGuest } from '../services/api';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../redux/slices/userSlice';

const ScanPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const user = useSelector(selectUserProfile);
  const fileInputRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  // Check authentication status
  useEffect(() => {
    // Animation on mount
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setResult(null);
    }
  };

  const handleCaptureClick = () => {
    fileInputRef.current.setAttribute('capture', 'environment');
    fileInputRef.current.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current.removeAttribute('capture');
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setError('');
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select or capture an image');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const uploadFunction = user ? uploadImageAuth : uploadImageGuest;
      const response = await uploadFunction(image);
      setResult(response);

      // Animate result display
      if (resultRef.current) {
        resultRef.current.style.opacity = '0';
        resultRef.current.style.transform = 'translateY(20px)';
        setTimeout(() => {
          resultRef.current.style.transition = 'all 0.6s ease-out';
          resultRef.current.style.opacity = '1';
          resultRef.current.style.transform = 'translateY(0)';
        }, 100);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get health score color and label
  const getHealthScoreInfo = (score) => {
    if (score >= 80) return { color: 'bg-green-500', label: 'Excellent', textColor: 'text-green-600' };
    if (score >= 60) return { color: 'bg-yellow-500', label: 'Good', textColor: 'text-yellow-600' };
    if (score >= 40) return { color: 'bg-orange-500', label: 'Fair', textColor: 'text-orange-600' };
    return { color: 'bg-red-500', label: 'Poor', textColor: 'text-red-600' };
  };

  return (
    <section className="relative min-h-[calc(100vh-94px)] py-4 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row lg:space-x-10 space-y-6 lg:space-y-0  ">
        
        {/* Scan Card */}
        <div className="w-full lg:w-[40%] bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50 hover:shadow-3xl transition-all duration-500 mx-auto sm:h-fit ">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Scan Food Label
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Capture or upload a food label to get instant health insights.
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className="space-y-4 sm:space-y-6">
            {/* Image Input */}
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              {!previewUrl && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <button
                    onClick={handleCaptureClick}
                    className="btn btn-primary flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-3 sm:p-2 text-sm sm:text-base font-medium rounded-xl w-full"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Capture Image
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="btn btn-outline flex-1 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transform hover:-translate-y-1 transition-all duration-300 p-3 sm:p-2 text-sm sm:text-base font-medium rounded-xl"
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Upload Image
                  </button>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4 relative">
                <img
                  src={previewUrl}
                  alt="Selected food label"
                  className="w-full h-auto rounded-xl shadow-md max-h-48 sm:max-h-64 object-contain"
                />
                <button
                  onClick={handleDeleteImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transform hover:scale-110 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-error bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-red-600 text-xs sm:text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !image}
              className={`btn btn-primary w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 p-3 sm:p-4 text-sm sm:text-base font-medium rounded-xl ${
                isLoading || !image ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <>
                  Analyze Label
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div ref={resultRef} className="w-full lg:w-[60%] bg-white  rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50 max-h-[80vh] sm:max-h-none overflow-y-auto flex items-center flex-col sm:ml-4">
            <div className='w-full'>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Scan Results</h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Health Score - Featured at top */}
              {result.analysis?.healthScore && (
                <div className="bg-gradient-to-r from-slate-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-emerald-100">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4 text-center">
                    Health Score
                  </h4>
                  <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
                      {result.analysis.healthScore}
                      <span className="text-lg sm:text-xl text-slate-500">/100</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full max-w-md">
                      <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-2">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                        <div
                          className={`${getHealthScoreInfo(result.analysis.healthScore).color} h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${result.analysis.healthScore}%` }}
                        ></div>
                      </div>
                      <div className={`text-center mt-2 font-semibold text-sm sm:text-base ${getHealthScoreInfo(result.analysis.healthScore).textColor}`}>
                        {getHealthScoreInfo(result.analysis.healthScore).label}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Nutritional Info - Compact cards for mobile */}
              {result.analysis?.nutritionalInfo && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-700 mb-3">Nutritional Information</h4>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
                      <div className="text-lg sm:text-xl font-bold text-blue-600">
                        {result.analysis.nutritionalInfo.totalSugar}g
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600">Total Sugar</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-3 sm:p-4 border border-orange-200">
                      <div className="text-lg sm:text-xl font-bold text-orange-600">
                        {result.analysis.nutritionalInfo.totalSodium}mg
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600">Total Sodium</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Harmful Ingredients */}
              {result.analysis?.harmfulIngredients?.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-700 mb-3">⚠️ Harmful Ingredients</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {result.analysis.harmfulIngredients.map((ingredient, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <span className="font-semibold text-red-700 text-sm sm:text-base">{ingredient.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium mt-1 sm:mt-0 w-fit ${
                            ingredient.severity === 'High' ? 'bg-red-200 text-red-800' :
                            ingredient.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-orange-200 text-orange-800'
                          }`}>
                            {ingredient.severity}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-2">{ingredient.warning}</p>
                        {ingredient.alternative && (
                          <div className="text-xs sm:text-sm">
                            <span className="font-medium text-green-600">Alternative: </span>
                            <span className="text-slate-600">{ingredient.alternative}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.analysis?.recommendations?.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-700 mb-3">💡 Recommendations</h4>
                  <div className="space-y-3 sm:space-y-4">
                    {result.analysis.recommendations.map((rec, index) => (
                      <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4">
                        <h5 className="font-semibold text-emerald-700 text-sm sm:text-base mb-2">{rec.title}</h5>
                        <p className="text-xs sm:text-sm text-slate-600">{rec.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracted Text - Collapsible on mobile */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-700 mb-3">📝 Extracted Text</h4>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-h-32 sm:max-h-none overflow-y-auto">
                    {result.extractedText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScanPage;