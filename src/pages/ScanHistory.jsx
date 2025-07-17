import React, { useState, useEffect, useRef } from "react";
import { Trash2, Loader, Heart, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getScans, deleteScan } from "../services/api";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalScans, setTotalScans] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const listRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    const animateElements = () => {
      if (headingRef.current) {
        headingRef.current.style.opacity = "0";
        headingRef.current.style.transform = "translateY(30px)";
        setTimeout(() => {
          headingRef.current.style.transition =
            "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          headingRef.current.style.opacity = "1";
          headingRef.current.style.transform = "translateY(0)";
        }, 100);
      }

      if (listRef.current) {
        listRef.current.style.opacity = "0";
        listRef.current.style.transform = "translateY(20px)";
        setTimeout(() => {
          listRef.current.style.transition =
            "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          listRef.current.style.opacity = "1";
          listRef.current.style.transform = "translateY(0)";
        }, 300);
      }
    };

    animateElements();
  }, []);

  // Fetch scans
  useEffect(() => {
    const fetchScans = async () => {
      setIsLoading(true);
      try {
        const response = await getScans(page, 10);
        // Remove duplicates by checking _id
        setScans((prevScans) => {
          const existingIds = new Set(prevScans.map((scan) => scan._id));
          const newScans = response.scans.filter(
            (scan) => !existingIds.has(scan._id)
          );
          return [...prevScans, ...newScans];
        });
        setTotalScans(response.total);
      } catch (err) {
        setError("Failed to load scan history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchScans();
  }, [page]);

  // Handle delete scan
  const handleDelete = async (scanId) => {
    try {
      await deleteScan(scanId);
      setScans(scans.filter((scan) => scan._id !== scanId));
      setTotalScans((prev) => prev - 1);
    } catch (err) {
      setError("Failed to delete scan. Please try again.");
    }
  };

  // Filter functions
  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(date).toDateString() === yesterday.toDateString();
  };

  const isLastMonth = (date) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const scanDate = new Date(date);
    return (
      scanDate.getMonth() === lastMonth.getMonth() &&
      scanDate.getFullYear() === lastMonth.getFullYear()
    );
  };

  // Group scans
  const yesterdayScans = scans.filter((scan) => isYesterday(scan.createdAt));
  const lastMonthScans = scans.filter((scan) => isLastMonth(scan.createdAt));
  const allScans = scans.filter(
    (scan) => !isYesterday(scan.createdAt) && !isLastMonth(scan.createdAt)
  );

  const loadMore = () => {
    if (scans.length < totalScans) {
      setPage((prev) => prev + 1);
    }
  };

  // Health score styling
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
    if (score >= 40)
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

  const ScanList = ({ scans, title }) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
      {scans.length === 0 ? (
        <p className="text-slate-600">No scans found :(</p>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan._id}
              className="bg-white/95 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 cursor-pointer border border-white/60 hover:scale-[1.01]"
              onClick={() => navigate(`/scan/${scan._id}`)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={scan.imageUrl}
                  alt="Scanned food label"
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                />
                <div className="flex flex-col items-center">
                  
                  <div
                    className={`inline-block  py-1 rounded-full  font-semibold mt-2 ${
                      getHealthScoreInfo(scan.analysis.healthScore).textColor
                    } bg-white/80`}
                  >
                    {scan.analysis.healthScore}/100 -{" "}
                    {getHealthScoreInfo(scan.analysis.healthScore).label}
                  </div>
                  <div className="text-xs  text-slate-600">
                    {new Date(scan.createdAt)
                      .toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .toLowerCase()}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(scan._id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="relative min-h-[calc(100vh-94px)] py-4 sm:py-8 lg:py-16 px-4 sm:px-0 max-w-3xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-60"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div
          ref={headingRef}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 sm:p-8 text-center rounded-2xl sm:rounded-3xl shadow-xl border border-white/60 mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Scan History
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base">
            Review your past food label scans
          </p>
        </div>

        <div ref={listRef}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6 animate-shake">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-red-700 text-sm font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}

          {isLoading && scans.length === 0 ? (
            <div className="flex justify-center items-center">
              <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-12">
              {yesterdayScans.length > 0 && (
                <ScanList scans={yesterdayScans} title="Yesterday" />
              )}
              {lastMonthScans.length > 0 && (
                <ScanList scans={lastMonthScans} title="Last Month" />
              )}
              <ScanList scans={allScans} title="All Scans" />
              {scans.length < totalScans && (
                <button
                  onClick={loadMore}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              )}
              {scans.length >= totalScans && scans.length > 0 && (
                <p className="text-center text-slate-600">
                  No more scans to load.
                </p>
              )}
            </div>
          )}
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
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ScanHistory;
