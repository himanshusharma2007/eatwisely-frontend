import { useEffect, useRef } from 'react';
import { Camera, Scan, Brain, CheckCircle, Upload, Search, Star } from 'lucide-react';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    // Animate header
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-item');
      elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'all 0.8s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }

    // Animate steps
    if (stepsRef.current) {
      const stepElements = stepsRef.current.children;
      Array.from(stepElements).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
          el.style.transition = 'all 0.8s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 400 + index * 200);
      });
    }
  }, []);

  const steps = [
    {
      icon: Upload,
      title: "Upload or Scan",
      description: "Take a photo of any food label or upload an image from your gallery. Our app works with any product label.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI instantly analyzes ingredients, nutritional information, and identifies potential health concerns.",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      icon: Search,
      title: "Get Insights",
      description: "Receive detailed health insights, ingredient explanations, and personalized recommendations in seconds.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      icon: CheckCircle,
      title: "Make Better Choices",
      description: "Use our recommendations to choose healthier alternatives and make informed decisions for your family.",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-r from-emerald-100/40 to-teal-100/40 rounded-full blur-2xl"></div>
      </div>

      <div ref={sectionRef} className="relative container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-item inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 rounded-full mb-6">
            <Scan className="w-5 h-5 text-slate-600" />
            <span className="text-slate-700 font-medium">How It Works</span>
          </div>
          
          <h2 className="animate-item text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Simple Steps to
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Healthier Eating
            </span>
          </h2>
          
          <p className="animate-item text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform the way you shop for food with our simple 4-step process. 
            From scanning to smart choices, we make healthy eating effortless.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-slate-800 to-slate-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>
              
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2 group-hover:border-emerald-200/50">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-8 h-8 bg-gradient-to-r ${step.color} bg-clip-text`} style={{color: 'transparent', backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, WebkitBackgroundClip: 'text'}} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-lg">
                  {step.description}
                </p>

                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-slate-200 to-transparent"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="animate-item bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-emerald-200/30">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-slate-600 ml-2">Trusted by 25,000+ users</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Ready to start scanning?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands who are already making healthier food choices with EatWisely's intelligent label analysis.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto">
              <Camera className="w-5 h-5" />
              Start Scanning Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;