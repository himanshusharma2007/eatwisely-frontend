// Image Upload Card Component
import {
    Camera,
    Upload,
    AlertCircle,
    Loader,
    X,
    Zap,
    Image as ImageIcon,
  } from "lucide-react";
import demoImagePath from '/lable3.jpg'
const ImageUploadCard = ({
    image,
    setImage,
    previewUrl,
    setPreviewUrl,
    setError,
    setResult,
    setSaveMessage,
    isLoading,
    handleSubmit,
    dragActive,
    setDragActive,
    fileInputRef,
    headingRef,
    formRef,
    error,
    // Add demo image path as prop (you can set a default)
   
  }) => {
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          setImage(file);
          setPreviewUrl(URL.createObjectURL(file));
          setError("");
          setResult(null);
          setSaveMessage("");
        }
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError("");
        setResult(null);
        setSaveMessage("");
      }
    };

    const handleCaptureClick = () => {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    };

    const handleUploadClick = () => {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    };

    const handleDemoImageClick = async () => {
      try {
        // Fetch the demo image
        const response = await fetch(demoImagePath);
        const blob = await response.blob();
        
        // Create a File object from the blob
        const file = new File([blob], "demo-food-label.jpg", { type: blob.type });
        
        // Set the demo image
        setImage(file);
        setPreviewUrl(demoImagePath);
        setError("");
        setResult(null);
        setSaveMessage("");
      } catch (error) {
        setError("Failed to load demo image. Please try uploading your own image.");
      }
    };

    const handleDeleteImage = () => {
      setImage(null);
      setPreviewUrl(null);
      setError("");
      setResult(null);
      setSaveMessage("");
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };

    return (
      <div className="w-full xl:w-[40%] xl:max-w-lg mx-auto xl:mx-0">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-500 ">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 sm:p-8 text-center">
            <div ref={headingRef}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Scan Food Label
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base">
                Get instant health insights from any food label
              </p>
            </div>
          </div>

          <div ref={formRef} className="p-6 sm:p-8 space-y-6">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                aria-label="Upload food label image"
              />

              {!previewUrl ? (
                <div
                  className={`sm:border-2 sm:border-dashed sm:p-8 rounded-2xl text-center transition-all duration-300 ${
                    dragActive
                      ? "border-emerald-400 bg-emerald-50 scale-105"
                      : "border-gray-300 hover:border-emerald-300 hover:bg-emerald-50/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full">
                      <Upload className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Drop your image here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        or choose an option below
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleCaptureClick}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 transform active:scale-95"
                        aria-label="Take photo of food label"
                      >
                        <Camera className="w-5 h-5 mr-2 inline" />
                        <span className="text-nowrap">Take Photo</span>
                      </button>
                      <button
                        onClick={handleUploadClick}
                        className="flex-1 border-2 border-emerald-200 text-emerald-600 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transform active:scale-95"
                        aria-label="Browse files for food label image"
                      >
                        <Upload className="w-5 h-5 mr-2 inline" />
                        <span className="text-nowrap">Browse Files</span>
                      </button>
                    </div>
                    
                    {/* Demo Image Button */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">or</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleDemoImageClick}
                      className="flex  mx-auto justify-between w-full items-center gap-4 border-2 border-emerald-200 text-emerald-600 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transform active:scale-95"
                      aria-label="Use demo food label image"
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span>Upload Demo Image</span>
                      <div className="w-8 h-8 rounded-md overflow-hidden border border-white/30 flex-shrink-0">
                        <img
                          src={demoImagePath}
                          alt="Demo preview"
                          className="w-full h-full object-fill"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={previewUrl}
                      alt="Selected food label"
                      className="w-full h-auto max-h-64 object-contain bg-gray-50"
                    />
                  </div>
                  <button
                    onClick={handleDeleteImage}
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg z-10 transform hover:scale-110 transition-all duration-200"
                    aria-label="Remove selected image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 rounded-2xl"></div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-shake">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-red-700 text-sm font-medium">
                    {error}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading || !image}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                isLoading || !image
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-105 active:scale-95 hover:-translate-y-1"
              }`}
              aria-label="Analyze food label"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin mr-2" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Analyze Label
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ImageUploadCard;