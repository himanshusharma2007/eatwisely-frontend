import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Heart,
  Apple,
  Save,
  Check,
  Lock,
} from "lucide-react";
import { useSelector } from "react-redux";
// Scan Results Component
const ScanResults = ({
  result,
  isSaving,
  saveMessage,
  handleSaveScan,
  user,
  resultRef,
  showAlternatives,
  setShowAlternatives,
}) => {
  const getHealthScoreInfo = (score) => {
    if (score >= 80)
      return {
        color: "bg-gradient-to-r from-green-400 to-emerald-500",
        label: "Excellent",
        textColor: "text-green-600",
        bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
        borderColor: "border-green-200",
      };
    if (score >= 60)
      return {
        color: "bg-gradient-to-r from-yellow-400 to-amber-500",
        label: "Good",
        textColor: "text-yellow-600",
        bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
        borderColor: "border-yellow-200",
      };
    if (score >= 45)
      return {
        color: "bg-gradient-to-r from-orange-400 to-red-400",
        label: "Fair",
        textColor: "text-orange-600",
        bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
        borderColor: "border-orange-200",
      };
    return {
      color: "bg-gradient-to-r from-red-400 to-red-600",
      label: "Poor",
      textColor: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      borderColor: "border-red-200",
    };
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-5 h-5 mr-2 text-red-600" />;
      case "positive":
        return <CheckCircle className="w-5 h-5 mr-2 text-green-600" />;
      case "info":
        return <Info className="w-5 h-5 mr-2 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 mr-2 text-blue-600" />;
    }
  };

  return (
    <div ref={resultRef} className="w-full xl:w-[60%]">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/60 overflow-hidden">
        <div className="p-6 sm:p-8 overflow-y-auto sm:overflow-y-visible max-h-[calc(100vh-200px)] sm:max-h-full custom-scrollbar">
          <div className="mb-6">
            <div className="flex justify-end">
              <button
                onClick={handleSaveScan}
                disabled={isSaving || (user && !result)}
                className={`flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 transform active:scale-95 ${
                  isSaving || (user && !result)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                aria-label={user ? "Save scan result" : "Login to save scan"}
              >
                <Save className="w-5 h-5 mr-2" />
                {user
                  ? isSaving
                    ? "Saving..."
                    : "Save Scan"
                  : "Login to Save"}
              </button>
            </div>
            {saveMessage && (
              <div
                className={`mt-4 p-4 rounded-lg flex items-center animate-shake ${
                  saveMessage.includes("successfully")
                    ? "bg-green-50 border-l-4 border-green-400"
                    : "bg-red-50 border-l-4 border-red-400"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    saveMessage.includes("successfully")
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {saveMessage}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {result.analysis?.healthImpact && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Health Impact
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {result.analysis.healthImpact}
                </p>
              </div>
            )}

            {result.analysis?.healthScore && (
              <div
                className={`${
                  getHealthScoreInfo(result.analysis.healthScore).bgColor
                } ${
                  getHealthScoreInfo(result.analysis.healthScore).borderColor
                } border-2 rounded-2xl p-6 text-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                    <Heart className="w-6 h-6 mr-2 text-emerald-600" />
                    Health Score
                  </h4>
                  <div className="mb-6">
                    <div className="text-5xl sm:text-6xl font-bold text-slate-800 mb-2">
                      {result.analysis.healthScore}
                      <span className="text-2xl text-slate-500">/100</span>
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-full font-semibold ${
                        getHealthScoreInfo(result.analysis.healthScore)
                          .textColor
                      } bg-white/80`}
                    >
                      {getHealthScoreInfo(result.analysis.healthScore).label}
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
                        className={`${
                          getHealthScoreInfo(result.analysis.healthScore).color
                        } h-4 rounded-full transition-all duration-2000 ease-out shadow-lg`}
                        style={{ width: `${result.analysis.healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result.analysis?.shouldEat && (
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                <div className="flex space-x-2 items-center">
                  <h4 className="text-lg font-bold text-slate-800 flex items-center">
                    <Check Circle className="w-5 h-5 mr-2 text-teal-600" />
                    Should You Eat This?
                  </h4>
                  <div className="flex items-center text-lg">
                    <span
                      className={`inline-block px-4 py-2 rounded-full font-semibold ${
                        result.analysis.shouldEat === "Yes"
                          ? " text-green-800"
                          : result.analysis.shouldEat === "No"
                          ? " text-red-800"
                          : " text-yellow-800"
                      }`}
                    >
                      {result.analysis.shouldEat}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {result.analysis.shouldEatReason}
                </p>
              </div>
            )}

            {result.analysis?.nutritionalInfo && (
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Nutritional Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-300">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.analysis.nutritionalInfo.totalSugar}g
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      Total Sugar
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (result.analysis.nutritionalInfo.totalSugar / 50) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-300">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {result.analysis.nutritionalInfo.totalSodium}mg
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      Total Sodium
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (result.analysis.nutritionalInfo.totalSodium /
                              2300) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {result.analysis.nutritionalInfo.caloriesPerServing && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-300">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {result.analysis.nutritionalInfo.caloriesPerServing}
                      </div>
                      <div className="text-sm font-medium text-slate-600">
                        Calories/Serving
                      </div>
                    </div>
                  )}
                  {result.analysis.nutritionalInfo.servingSize && (
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 text-center hover:shadow-md transition-all duration-300">
                      <div className="text-lg font-bold text-purple-600 mb-2">
                        {result.analysis.nutritionalInfo.servingSize}
                      </div>
                      <div className="text-sm font-medium text-slate-600">
                        Serving Size
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.analysis?.harmfulIngredients?.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Ingredients of Concern
                </h4>
                <div className="space-y-4">
                  {result.analysis.harmfulIngredients.map(
                    (ingredient, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <h5 className="font-bold text-red-700 text-base">
                            {ingredient.name}
                          </h5>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 sm:mt-0 ${
                              ingredient.severity === "High"
                                ? "bg-red-200 text-red-800"
                                : ingredient.severity === "Medium"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-orange-200 text-orange-800"
                            }`}
                          >
                            {ingredient.severity} Risk
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                          {ingredient.warning}
                        </p>
                        {ingredient.alternative && (
                          <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                            <span className="font-semibold text-green-700 text-sm">
                              💡 Better Alternative:{" "}
                            </span>
                            <span className="text-green-600 text-sm">
                              {ingredient.alternative}
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {result.analysis?.healthyAlternatives?.length > 0 && (
              <div>
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="w-full flex items-center justify-between text-lg font-bold text-slate-800 mb-4 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-200"
                  aria-expanded={showAlternatives}
                  aria-controls="healthy-alternatives"
                >
                  <span className="flex items-center">
                    <Apple className="w-5 h-5 mr-2 text-green-600" />
                    Healthy Alternatives
                  </span>
                  {showAlternatives ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {showAlternatives && (
                  <div
                    id="healthy-alternatives"
                    className="bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
                      {result.analysis.healthyAlternatives.map((alt, index) => (
                        <li key={index}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {result.analysis?.recommendations?.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
                  Health Recommendations
                </h4>
                <div className="space-y-4">
                  {result.analysis.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 hover:shadow-md transition-all duration-300"
                    >
                      <h5 className="font-bold text-emerald-700 text-base mb-2 flex items-center">
                        {getRecommendationIcon(rec.type)}
                        {rec.title}
                      </h5>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {rec.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {user && result.analysis?.additionalNotes ? (
              <div className="bg-gradient-to-br from-pink-200 to-rose-100 border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Personal Advise
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {result.analysis.additionalNotes}
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-pink-200 to-rose-100 border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-yellow-600" />
                  Personal Advise
                </h4>
                <p className="text-sm text-slate-700">Login to get personal advices</p>{" "}
              </div>
            )}
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;
