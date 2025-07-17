import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Brain,
  FileText,
  ArrowRight,
  Play,
  CheckCircle2,
  Upload,
  Scan,
  Target,
} from "lucide-react";

const Steps = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      title: "Capture Label",
      subtitle: "Upload or photograph any food label",
      description:
        "Take a clear photo of your food product label using your device camera or upload an existing image. Our system processes all standard image formats with enterprise-grade accuracy.",
      icon: Camera,
      status: "Started",
      features: [
        "High-resolution image processing",
        "Multiple format support",
        "Instant cloud upload",
      ],
      mockup: {
        type: "camera",
        elements: ["Viewfinder", "Capture Button", "Gallery Access"],
      },
    },
    {
      number: "02",
      title: "AI Processing",
      subtitle: "Advanced ingredient analysis",
      description:
        "Our proprietary AI engine performs optical character recognition, ingredient identification, and cross-references our comprehensive database of food additives and nutritional data.",
      icon: Brain,
      status: "Processing",

      features: [
        "OCR text extraction",
        "Ingredient recognition",
        "Real-time processing",
      ],
      mockup: {
        type: "analysis",
        elements: ["Text Recognition", "Data Processing", "Database Query"],
      },
    },
    {
      number: "03",
      title: "Health Report",
      subtitle: "Personalized insights delivered",
      description:
        "Receive a comprehensive health assessment with risk analysis, nutritional breakdown, allergen alerts, and evidence-based recommendations for healthier alternatives.",
      icon: FileText,
      status: "Completed",
      features: [
        "Health risk assessment",
        "Allergen detection",
        "Alternative suggestions",
      ],
      mockup: {
        type: "report",
        elements: ["Health Score", "Risk Analysis", "Recommendations"],
      },
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#02C39A]/10 text-[#02C39A] px-4 py-2 rounded-lg font-medium mb-6">
            <Play className="w-4 h-4" />
            How It Works
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Three Simple Steps to
            <span className="block bg-gradient-to-r from-[#02C39A] to-[#00A896] bg-clip-text text-transparent">
              Safer Food Choices
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional-grade food analysis technology made accessible. Get
            comprehensive health insights in under 30 seconds.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index <= activeStep
                      ? "bg-[#02C39A] scale-125"
                      : "bg-gray-300"
                  }`}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-500 ${
                      index < activeStep ? "bg-[#02C39A]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  !isEven ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div className={`space-y-8 ${!isEven ? "lg:col-start-2" : ""}`}>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  {/* Features */}
                  <div className="space-y-3">
                    {step.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#02C39A]" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 bg-[#02C39A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00A896] transition-colors duration-200">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Visual */}
                <div
                  className={`${
                    !isEven ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#02C39A] rounded-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-6xl font-bold text-gray-200 select-none">
                      {step.number}
                    </span>
                  </div>
                  <div className="mb-10">
                    <p className="text-[#02C39A] font-medium text-lg mb-2">
                      {step.subtitle}
                    </p>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <div className="relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#02C39A]/5 to-[#00A896]/5 rounded-2xl transform rotate-3"></div>

                    {/* Main mockup */}
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                      {/* Mockup header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-[#02C39A]"></div>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#02C39A] to-[#00A896] transition-all duration-1000"
                            style={{ width: `${((index + 1) / 3) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {Math.round(((index + 1) / 3) * 100)}%
                        </span>
                      </div>

                      {/* Mockup content */}
                      <div className="space-y-4">
                        {step.mockup.elements.map((element, eIndex) => (
                          <div key={eIndex} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                              {eIndex === 0 && (
                                <Camera className="w-4 h-4 text-gray-400" />
                              )}
                              {eIndex === 1 && (
                                <Brain className="w-4 h-4 text-gray-400" />
                              )}
                              {eIndex === 2 && (
                                <Target className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-gray-100 rounded-full mb-1"></div>
                              <div className="text-sm text-gray-500">
                                {element}
                              </div>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-[#02C39A]" />
                          </div>
                        ))}
                      </div>

                      {/* Status indicator */}
                      <div className="mt-6 flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-[#02C39A]/10 text-[#02C39A] px-4 py-2 rounded-lg">
                          <div className="w-2 h-2 bg-[#02C39A] rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">
                            {step.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-[#02C39A] to-[#00A896] rounded-2xl p-12">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Food Choices?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of health-conscious users making smarter decisions
              with EatWisly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#02C39A] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3">
                <Camera className="w-5 h-5" />
                Start Analyzing
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200 border border-white/20 flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
