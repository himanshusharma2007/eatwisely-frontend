// Main ScanPage Component

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { uploadImageAuth, uploadImageGuest, getProgress, saveScanResult } from "../services/api";
import ImageUploadCard from "../screens/Scan/ImageUploadCard";
import ScanResults from "../screens/Scan/ScanResults";

const ScanPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [showExtractedText, setShowExtractedText] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Progress tracking states
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("");
  const [taskId, setTaskId] = useState(null);
  
  const user = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);
  const progressIntervalRef = useRef(null);

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

      if (formRef.current) {
        formRef.current.style.opacity = "0";
        formRef.current.style.transform = "translateY(20px)";
        setTimeout(() => {
          formRef.current.style.transition =
            "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          formRef.current.style.opacity = "1";
          formRef.current.style.transform = "translateY(0)";
        }, 300);
      }
    };

    animateElements();
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [previewUrl]);

  // Progress polling function
  const startProgressPolling = (taskId) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(async () => {
      try {
        const progressData = await getProgress(taskId);
        
        setProgress(progressData.progress);
        setProgressStatus(progressData.status);
        
        if (progressData.completed) {
          clearInterval(progressIntervalRef.current);
          setIsLoading(false);
          
          if (progressData.error) {
            setError(progressData.error);
            setProgress(0);
            setProgressStatus("");
          } else if (progressData.result) {
            setResult(progressData.result);
            
            // Animate result appearance
            if (resultRef.current) {
              resultRef.current.style.opacity = "0";
              resultRef.current.style.transform = "translateX(30px) scale(0.95)";
              setTimeout(() => {
                resultRef.current.style.transition =
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
                resultRef.current.style.opacity = "1";
                resultRef.current.style.transform = "translateX(0) scale(1)";
              }, 1000);
            }
          }
          
          // Reset progress states
          setTaskId(null);
          setProgress(0);
          setProgressStatus("");
        }
      } catch (error) {
        console.error("Progress polling error:", error);
        clearInterval(progressIntervalRef.current);
        setIsLoading(false);
        setError("Failed to get progress. Please try again.");
        setProgress(0);
        setProgressStatus("");
        setTaskId(null);
      }
    }, 500); // Poll every 2 seconds
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select or capture an image");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);
    setSaveMessage("");
    setProgress(0);
    setProgressStatus("Starting...");

    try {
      const uploadFunction = user ? uploadImageAuth : uploadImageGuest;
      const response = await uploadFunction(image);
      
      if (response.taskId) {
        setTaskId(response.taskId);
        setProgressStatus(response.message || "Processing...");
        startProgressPolling(response.taskId);
      } else {
        // Fallback for immediate response (if API doesn't return taskId)
        setResult(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setProgress(0);
      setProgressStatus("");
      setError(
        error.response?.data?.message ||
          "Failed to process image. Please try again."
      );
    }
  };

  const handleSaveScan = async () => {
    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (!result || !image) {
      setSaveMessage("No scan result to save. Please analyze an image first.");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("extractedText", result.extractedText);
      formData.append("analysis", JSON.stringify(result.analysis));

      await saveScanResult(formData);
      setSaveMessage(`Scan saved successfully! `);
    } catch (error) {
      setSaveMessage(
        error.response?.data?.message ||
          "Failed to save scan. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-94px)] py-2 sm:py-8 lg:py-16 px-2 sm:px-0">


      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-8 gap-6 justify-center">
          <ImageUploadCard
            image={image}
            setImage={setImage}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            setError={setError}
            setResult={setResult}
            setSaveMessage={setSaveMessage}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            dragActive={dragActive}
            setDragActive={setDragActive}
            fileInputRef={fileInputRef}
            headingRef={headingRef}
            formRef={formRef}
            error={error}
            progress={progress}
            progressStatus={progressStatus}
          />
          {result && (
            <ScanResults
              result={result}
              isSaving={isSaving}
              saveMessage={saveMessage}
              handleSaveScan={handleSaveScan}
              user={user}
              resultRef={resultRef}
              showExtractedText={showExtractedText}
              setShowExtractedText={setShowExtractedText}
              showAlternatives={showAlternatives}
              setShowAlternatives={setShowAlternatives}
            />
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
          0%, 100% {
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

export default ScanPage;