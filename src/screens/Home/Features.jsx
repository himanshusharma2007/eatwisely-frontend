import { useEffect, useRef } from "react";
import { Heart, Shield, Users, Target, Lightbulb, Award, Scan, Brain, AlertTriangle, CheckCircle } from "lucide-react";

const Features = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Animate main content
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".animate-item");
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        setTimeout(() => {
          el.style.transition = "all 0.8s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });
    }

    // Animate stats
    if (statsRef.current) {
      const statElements = statsRef.current.children;
      Array.from(statElements).forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
          el.style.transition = "all 0.6s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 400 + index * 100);
      });
    }

    // Animate feature cards
    if (cardsRef.current) {
      const cardElements = cardsRef.current.children;
      Array.from(cardElements).forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        setTimeout(() => {
          el.style.transition = "all 0.8s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 600 + index * 150);
      });
    }
  }, []);

  const features = [
    {
      icon: Scan,
      title: "Smart Label Scanning",
      description: "Advanced OCR technology instantly extracts and analyzes every ingredient from food labels with 98% accuracy.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our intelligent system identifies harmful additives, allergens, and nutritional concerns in seconds.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: AlertTriangle,
      title: "Health Risk Alerts",
      description: "Get instant warnings about ingredients that may impact your health, allergies, or dietary restrictions.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Receive tailored advice based on your health goals, dietary preferences, and lifestyle needs.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: CheckCircle,
      title: "Healthier Alternatives",
      description: "Discover better product options that match your taste preferences and nutritional requirements.",
      color: "from-teal-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Family Protection",
      description: "Keep your loved ones safe with family-specific dietary recommendations and allergen monitoring.",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="relative py-12 overflow-hidden max-w-6xl mx-auto">
       {/* Features Section */}
       <div className="mb-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6">
              Why Choose <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EatWisly</span> 
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our advanced AI technology makes food label analysis simple, fast, and accurate
            </p>
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-emerald-100/50 group-hover:border-emerald-200/70 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Eat Wisely?
            </h3>
            <p className="text-emerald-50 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making smarter food choices with EatWisly's AI-powered analysis.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Try EatWisly Now
            </button>
          </div>
        </div>
    </section>
  );
};

export default Features;
