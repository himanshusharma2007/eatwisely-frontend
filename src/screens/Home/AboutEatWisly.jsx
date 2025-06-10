import { useEffect, useRef } from 'react';
import { Heart, Shield, Users, Target, Lightbulb, Award } from 'lucide-react';

const AboutEatWisly = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Animate main content
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

    // Animate stats
    if (statsRef.current) {
      const statElements = statsRef.current.children;
      Array.from(statElements).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'all 0.6s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 400 + index * 100);
      });
    }

    // Animate feature cards
    if (cardsRef.current) {
      const cardElements = cardsRef.current.children;
      Array.from(cardElements).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
          el.style.transition = 'all 0.8s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 600 + index * 150);
      });
    }
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Ingredient Analysis",
      description: "Advanced AI scans and identifies harmful ingredients, additives, and allergens in real-time."
    },
    {
      icon: Heart,
      title: "Health Insights",
      description: "Get personalized nutritional advice based on your dietary preferences and health goals."
    },
    {
      icon: Users,
      title: "Family Safety",
      description: "Protect your loved ones with family-specific dietary recommendations and allergen alerts."
    },
    {
      icon: Target,
      title: "Smart Alternatives",
      description: "Discover healthier product alternatives that match your taste preferences and budget."
    },
    {
      icon: Lightbulb,
      title: "Educational Content",
      description: "Learn about nutrition with easy-to-understand explanations and dietary tips."
    },
    {
      icon: Award,
      title: "Trusted Results",
      description: "Backed by nutritional science and constantly updated with the latest health research."
    }
  ];

  const stats = [
    { number: "50K+", label: "Labels Analyzed" },
    { number: "25K+", label: "Happy Users" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-r from-emerald-100/40 to-teal-100/40 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-r from-cyan-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className="relative container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="animate-item inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">About EatWisely</span>
          </div>
          
          <h2 className="animate-item text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Empowering Healthier
            </span>
            <br />
            <span className="text-slate-800">Food Choices</span>
          </h2>
          
          <p className="animate-item text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            At EatWisely, our mission is to empower you to make informed food choices by demystifying food labels. 
            We believe that understanding what's in your food shouldn't be complicated.
          </p>
          
          <p className="animate-item text-base sm:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Our platform analyzes food labels to highlight harmful ingredients, provide nutritional insights, 
            and offer healthier alternatives, ensuring you and your loved ones can eat wisely and live healthily.
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

       

    
      </div>
    </section>
  );
};

export default AboutEatWisly;