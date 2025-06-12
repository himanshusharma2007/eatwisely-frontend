import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, AlertCircle, Loader, CheckCircle, Send } from 'lucide-react';
import { uploadImageAuth, uploadImageGuest } from '../services/api';

const ScanPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const text = "następnie";

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

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

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select or capture an image');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const uploadFunction = isAuthenticated ? uploadImageAuth : uploadImageGuest;
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

  return (
    <section className="relative min-h-[calc(100vh-94px)] py-16 px-4 sm:px-6 lg:px-8  flex items-center justify-center">
      {/* Background decorative elements */}
    

      <div className="relative z-10 w-full max-w-xl">
        
        {/* Scan Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Scan Food Label
            </h2>
            <p className="text-slate-600">
              Capture or upload a food label to get instant health insights.
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className="space-y-6">
            {/* Image Input */}
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={handleCaptureClick}
                  className="btn btn-primary flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Image
                </button>
                <button
                  onClick={handleUploadClick}
                  className="btn btn-outline flex-1 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </button>
              </div>
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Selected food label"
                  className="w-full h-auto rounded-xl shadow-md max-h-64 object-contain"
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-error bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !image}
              className={`btn btn-primary w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading || !image ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Analyze Label
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div ref={resultRef} className="mt-8 bg-white/juice backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Scan Results</h3>
            <div className="space-y-6">
              {/* Extracted Text */}
              <div>
                <h4 className="text-lg font-semibold text-slate-700">Extracted Text</h4>
                <p className="text-slate-600 text-sm mt-2">{result.extractedText}</p>
              </div>

              {/* Harmful Ingredients */}
              {result.analysis?.harmfulIngredients?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-700">Harmful Ingredients</h4>
                  <ul className="list-disc list-inside text-slate-600 text-sm mt-2 space-y-2">
                    {result.analysis.harmfulIngredients.map((ingredient, index) => (
                      <li key={index}>
                        <span className="font-medium text-red-600">{ingredient.name}</span> ({ingredient.severity}): {ingredient.warning} 
                        {ingredient.alternative && <span> - Suggested alternative: {ingredient.alternative}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutritional Info */}
              {result.analysis?.nutritionalInfo && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-700">Nutritional Info</h4>
                  <p className="text-slate-600 text-sm mt-2">
                    Total Sugar: {result.analysis.nutritionalInfo.totalSugar}g<br />
                    Total Sodium: {result.analysis.nutritionalInfo.totalSodium}mg
                  </p>
                </div>
              )}

              {/* Health Score */}
              {result.analysis?.healthScore && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-700">Health Score</h4>
                  <p className="text-slate-600 text-sm mt-2">{result.analysis.healthScore}/100</p>
                </div>
              )}

              {/* Recommendations */}
              {result.analysis?.recommendations?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-700">Recommendations</h4>
                  <div className="mt-2 space-y-4">
                    {result.analysis.recommendations.map((rec, index) => (
                      <div key={index} className="card bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <h5 className="font-medium text-emerald-600">{rec.title}</h5>
                        <p className="text-slate-600 text-sm">{rec.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScanPage;