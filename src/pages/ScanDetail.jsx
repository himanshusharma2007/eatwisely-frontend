import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, Heart, AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { getScans } from '../services/api';

const ScanDetailsPage = () => {
  const { scanId } = useParams();
  const [scan, setScan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExtractedText, setShowExtractedText] = useState(false);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    const animateElements = () => {
      if (headingRef.current) {
        headingRef.current.style.opacity = '0';
        headingRef.current.style.transform = 'translateY(30px)';
        setTimeout(() => {
          headingRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          headingRef.current.style.opacity = '1';
          headingRef.current.style.transform = 'translateY(0)';
        }, 100);
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'translateY(20px)';
        setTimeout(() => {
          contentRef.current.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }, 300);
      }
    };

    animateElements();
  }, []);

  // Fetch scan details
  useEffect(() => {
    const fetchScan = async () => {
      setIsLoading(true);
      try {
        const response = await getScans(1, 10); // Modify API to support single scan fetch if needed
        const scanData = response.scans.find((s) => s._id === scanId);
        if (scanData) {
          setScan(scanData);
        } else {
          setError('Scan not found.');
        }
      } catch (err) {
        setError('Failed to load scan details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchScan();
  }, [scanId]);

  // Health score styling
  const getHealthScoreInfo = (score) => {
    if (score >= 80) return { 
      color: 'bg-gradient-to-r from-green-400 to-emerald-500', 
      label: 'Excellent', 
      textColor: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    };
    if (score >= 60) return { 
      color: 'bg-gradient-to-r from-yellow-400 to-amber-500', 
      label: 'Good', 
      textColor: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200'
    };
    if (score >= 40) return { 
      color: 'bg-gradient-to-r from-orange-400 to-red-400', 
      label: 'Fair', 
      textColor: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      borderColor: 'border-orange-200'
    };
    return { 
      color: 'bg-gradient-to-r from-red-400 to-red-600', 
      label: 'Poor', 
      textColor: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      borderColor: 'border-red-200'
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-94px)]">
        <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (error || !scan) {
    return (
      <section className="relative min-h-[calc(100vh-94px)] py-4 sm:py-8 lg:py-16 px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-60"></div>
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-shake">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
              <span className="text-red-700 text-sm font-medium">{error || 'Scan not found.'}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-94px)] py-4 sm:py-8 lg:py-16 px-4 sm:px-0 max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-60"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div ref={headingRef} className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 sm:p-8 text-center rounded-2xl sm:rounded-3xl shadow-xl border border-white/60 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Scan Details
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base">
            {new Date(scan.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div ref={contentRef} className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/60 overflow-hidden">
          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            <div className="space-y-8">
              {/* Image */}
              <div className="relative group">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={scan.imagePath}
                    alt="Scanned food label"
                    className="w-full h-auto max-h-96 object-contain bg-gray-50"
                  />
                </div>
              </div>

              {/* Health Score */}
              <div className={`${getHealthScoreInfo(scan.analysis.healthScore).bgColor} ${getHealthScoreInfo(scan.analysis.healthScore).borderColor} border-2 rounded-2xl p-6 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                    <Heart className="w-6 h-6 mr-2 text-emerald-600" />
                    Health Score
                  </h4>
                  <div className="mb-6">
                    <div className="text-5xl sm:text-6xl font-bold text-slate-800 mb-2">
                      {scan.analysis.healthScore}
                      <span className="text-2xl text-slate-500">/100</span>
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getHealthScoreInfo(scan.analysis.healthScore).textColor} bg-white/80`}>
                      {getHealthScoreInfo(scan.analysis.healthScore).label}
                    </div>
                  </div>
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-slate-600 mb-3">
                      <span>Poor</span>
                      <span>Fair</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                    <div className="w-full bg-white/60 rounded-full h-4 shadow-inner">
                      <div
                        className={`${getHealthScoreInfo(scan.analysis.healthScore).color} h-4 rounded-full transition-all duration-2000 ease-out shadow-lg`}
                        style={{ width: `${scan.analysis.healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nutritional Info */}
              {scan.analysis?.nutritionalInfo && (
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Nutritional Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-300">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {scan.analysis.nutritionalInfo.totalSugar}g
                      </div>
                      <div className="text-sm font-medium text-slate-600">Total Sugar</div>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${Math.min(scan.analysis.nutritionalInfo.totalSugar / 50 * 100, 100)}%`}}></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-300">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {scan.analysis.nutritionalInfo.totalSodium}mg
                      </div>
                      <div className="text-sm font-medium text-slate-600">Total Sodium</div>
                      <div className="w-full bg-orange-200 rounded-full h-2 mt-3">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: `${Math.min(scan.analysis.nutritionalInfo.totalSodium / 2300 * 100, 100)}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Harmful Ingredients */}
              {scan.analysis?.harmfulIngredients?.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    Ingredients of Concern
                  </h4>
                  <div className="space-y-4">
                    {scan.analysis.harmfulIngredients.map((ingredient, index) => (
                      <div key={index} className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <h5 className="font-bold text-red-700 text-base">{ingredient.name || 'Unnamed Ingredient'}</h5>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 sm:mt-0 ${
                            ingredient.severity === 'High' ? 'bg-red-200 text-red-800' :
                            ingredient.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-orange-200 text-orange-800'
                          }`}>
                            {ingredient.severity} Risk
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-3 leading-relaxed">{ingredient.warning}</p>
                        {ingredient.alternative && (
                          <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                            <span className="font-semibold text-green-700 text-sm">💡 Better Alternative: </span>
                            <span className="text-green-600 text-sm">{ingredient.alternative}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {scan.analysis?.recommendations?.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
                    Health Recommendations
                  </h4>
                  <div className="space-y-4">
                    {scan.analysis.recommendations.map((rec, index) => (
                      <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                        <h5 className="font-bold text-emerald-700 text-base mb-2 flex items-center">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                          {rec.title}
                        </h5>
                        <p className="text-sm text-slate-700 leading-relaxed">{rec.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracted Text */}
              <div>
                <button
                  onClick={() => setShowExtractedText(!showExtractedText)}
                  className="w-full flex items-center justify-between text-lg font-bold text-slate-800 mb-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200"
                >
                  <span className="flex items-center">
                    <div className="w-5 h-5 mr-2 text-slate-600">📜</div>
                    Extracted Text
                  </span>
                  {showExtractedText ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {showExtractedText && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto custom-scrollbar">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {scan.extractedText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ScanDetailsPage;