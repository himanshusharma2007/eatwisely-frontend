import { useEffect, useRef, useState } from 'react';
import { Camera, Scan, Brain, FileText, Shield, CheckCircle, Upload, Zap, Target, ArrowRight, Smartphone, Eye } from 'lucide-react';

const Steps = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);
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

    // Animate steps with staggered effect
    if (stepsRef.current) {
      const stepElements = stepsRef.current.children;
      Array.from(stepElements).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px) scale(0.9)';
        setTimeout(() => {
          el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
      });
    }

    // Auto-cycle through steps for demonstration
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const steps = [
    {
      number: '01',
      title: 'Snap & Upload',
      subtitle: 'Capture Your Food Label',
      description: 'Simply take a photo of any food product label using your smartphone camera or upload an existing image. Our system accepts all image formats and automatically optimizes them for analysis.',
      icon: Camera,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      features: ['📱 Mobile-friendly camera', '🖼️ Multiple image formats', '⚡ Instant upload'],
      illustration: '📸'
    },
    {
      number: '02',
      title: 'AI Analysis',
      subtitle: 'Advanced Label Processing',
      description: 'Our cutting-edge OCR technology extracts text from your image, while our AI engine analyzes every ingredient against our comprehensive health database containing thousands of food additives and their effects.',
      icon: Brain,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50',
      features: ['🔍 OCR text extraction', '🧠 AI ingredient analysis', '📊 Health database matching'],
      illustration: '🔬'
    },
    {
      number: '03',
      title: 'Get Insights',
      subtitle: 'Personalized Health Report',
      description: 'Receive a comprehensive report with clear health warnings, nutritional breakdown, allergen alerts, and personalized recommendations for healthier alternatives that match your dietary preferences.',
      icon: FileText,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
      features: ['⚠️ Health risk warnings', '🎯 Personalized recommendations', '🛡️ Allergen detection'],
      illustration: '📋'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden max-w-6xl mx-auto">
    

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-6">
            <Zap className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">How It Works</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Get Started in</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform confusing food labels into clear health insights in under 30 seconds. 
            No technical knowledge required – just point, click, and discover.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index <= activeStep 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-125' 
                        : 'bg-gray-300'
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div 
                      className={`w-20 h-1 mx-2 transition-all duration-500 ${
                        index < activeStep 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div ref={stepsRef} className="space-y-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content Side */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20`}>
                      {step.number}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-emerald-600 font-semibold text-lg mb-2">{step.subtitle}</p>
                    <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {step.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button className={`inline-flex items-center gap-2 bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                      <span>Try Step {index + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500`}></div>
                    <div className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-12 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500`}>
                      
                      {/* Step Illustration */}
                      <div className="text-center mb-8">
                        <div className="text-8xl sm:text-9xl mb-4 animate-bounce">
                          {step.illustration}
                        </div>
                        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl shadow-lg mb-4`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      {/* Mock Interface */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}></div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000`}
                              style={{ width: `${((index + 1) / 3) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-600">{Math.round(((index + 1) / 3) * 100)}%</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded-full"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                        </div>
                        
                        <div className="mt-4 flex justify-center">
                          <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}>
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
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
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Food Safety Journey?
            </h3>
            <p className="text-emerald-50 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of health-conscious users who trust EatWisly for smarter food choices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                <Camera className="w-5 h-5" />
                Start Analyzing Labels
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-3">
                <Eye className="w-5 h-5" />
                See Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;