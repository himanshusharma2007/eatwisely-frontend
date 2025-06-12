import { useEffect, useRef } from 'react';
import { Scan, Users, Shield, ArrowRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const floatingElementsRef = useRef(null);
 const navigate = useNavigate();
  useEffect(() => {
    // Simple fade-in animations using CSS transitions
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(40px)';
      setTimeout(() => {
        headingRef.current.style.transition = 'all 1.2s ease-out';
        headingRef.current.style.opacity = '1';
        headingRef.current.style.transform = 'translateY(0)';
      }, 100);
    }
    
    if (subheadingRef.current) {
      subheadingRef.current.style.opacity = '0';
      subheadingRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        subheadingRef.current.style.transition = 'all 1s ease-out';
        subheadingRef.current.style.opacity = '1';
        subheadingRef.current.style.transform = 'translateY(0)';
      }, 300);
    }
    
    if (buttonsRef.current) {
      buttonsRef.current.style.opacity = '0';
      buttonsRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        buttonsRef.current.style.transition = 'all 1s ease-out';
        buttonsRef.current.style.opacity = '1';
        buttonsRef.current.style.transform = 'translateY(0)';
      }, 500);
    }
    
    if (featuresRef.current) {
      featuresRef.current.style.opacity = '0';
      featuresRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        featuresRef.current.style.transition = 'all 0.8s ease-out';
        featuresRef.current.style.opacity = '1';
        featuresRef.current.style.transform = 'translateY(0)';
      }, 700);
    }
  }, []);

  const handleLogin = () => {
    // Add your navigation logic here
    console.log('Navigate to login');
  };

  const handleSignup = () => {
    // Add your navigation logic here
    console.log('Navigate to signup');
  };

  const handleGuestTry = () => {
    // Add your navigation logic here
    console.log('Navigate to scan');
  };

  const features = [
    { icon: Scan, text: 'Instant Label Scanning' },
    { icon: Users, text: 'Family-Safe Choices' },
    { icon: Shield, text: 'Health Insights' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={floatingElementsRef} className="absolute inset-0">
          <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-gradient-to-r from-cyan-200/20 to-emerald-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-200/25 to-cyan-200/25 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-emerald-300/30 to-teal-300/30 rounded-full blur-lg"></div>
        </div>
      </div> */}

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12 text-center max-w-6xl">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={headingRef} 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Understand Your Food
            </span>
            <br />
            <span className="text-slate-800">
              Labels with{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                EatWisely
              </span>
            </span>
          </h1>
          
          <p 
            ref={subheadingRef} 
            className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Upload a food label and get instant health insights to make smarter, 
            healthier choices for you and your family. Your journey to better nutrition starts here.
          </p>

          {/* Action buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => navigate('/scan')}
            >
              <Camera className="w-5 h-5 " />
              start Scaning 
            </button>
            
            {/* <button
              className="bg-white/80 backdrop-blur-sm text-emerald-600 border-2 border-emerald-200 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-white/90 hover:border-emerald-300 transform hover:-translate-y-1 transition-all duration-300"
              onClick={handleSignup}
            >
              Create Account
            </button>
            
            <button
              className="text-slate-600 hover:text-emerald-600 px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/50 transition-all duration-300 backdrop-blur-sm"
              onClick={handleGuestTry}
            >
              Try as Guest
            </button> */}
          </div>

          {/* Feature highlights */}
          {/* <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/40"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-slate-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-20 fill-white"
        >
          <path d="M0,120 C120,100 240,80 360,85 C480,90 600,120 720,110 C840,100 960,60 1080,65 C1140,67.5 1170,82.5 1200,120 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;