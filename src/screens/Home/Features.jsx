import { useEffect, useRef } from "react";
import { Heart, Shield, Users, Target, Lightbulb, Award } from "lucide-react";

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
      icon: Shield,
      title: "Ingredient Analysis",
      description:
        "Advanced AI scans and identifies harmful ingredients, additives, and allergens in real-time.",
    },
    {
      icon: Heart,
      title: "Health Insights",
      description:
        "Get personalized nutritional advice based on your dietary preferences and health goals.",
    },
    {
      icon: Users,
      title: "Family Safety",
      description:
        "Protect your loved ones with family-specific dietary recommendations and allergen alerts.",
    },
    {
      icon: Target,
      title: "Smart Alternatives",
      description:
        "Discover healthier product alternatives that match your taste preferences and budget.",
    },
    {
      icon: Lightbulb,
      title: "Educational Content",
      description:
        "Learn about nutrition with easy-to-understand explanations and dietary tips.",
    },
    {
      icon: Award,
      title: "Trusted Results",
      description:
        "Backed by nutritional science and constantly updated with the latest health research.",
    },
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
      <h2 className="animate-item text-4xl sm:text-5xl  font-bold mb-20 leading-tight text-center">
        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Why Choose EatWisely
        </span>
        <br />
      </h2>

      <div
        ref={sectionRef}
        className="relative container mx-auto px-6 max-w-7xl"
      >
        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 hover:border-emerald-200/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="animate-item bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-emerald-200/30">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Ready to start your healthy journey?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making smarter food
              choices with EatWisely.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
