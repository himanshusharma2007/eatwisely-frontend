import { useEffect, useRef } from 'react';
import { Scan, Users, Shield, ArrowRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
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


  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden ">
   

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
            className="text-base sm:text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
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
            
           
          </div>

        
        </div>
      </div>

     
    </section>
  );
};

export default Hero;