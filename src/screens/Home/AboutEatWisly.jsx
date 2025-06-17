import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Shield,
  Users,
  Target,
  Lightbulb,
  Award,
  Scan,
  Brain,
  Clock,
  CheckCircle,
  AlertTriangle,
  Camera,
  Zap,
} from "lucide-react";

const AboutEatWisly = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

    // Animate hero section
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll(".hero-animate");
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        setTimeout(() => {
          el.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });
    }

    // Animate stats with counter effect
    if (statsRef.current) {
      const statElements = statsRef.current.children;
      Array.from(statElements).forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px) scale(0.9)";
        setTimeout(() => {
          el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }, 800 + index * 100);
      });
    }
  }, [isVisible]);

  const stats = [
    { number: "50K+", label: "Labels Analyzed", icon: Scan },
    { number: "25K+", label: "Happy Users", icon: Users },
    { number: "98%", label: "Accuracy Rate", icon: Target },
    { number: "24/7", label: "Available", icon: Clock },
  ];

  const problemPoints = [
    "Confusing scientific ingredient names",
    "Hidden harmful additives and preservatives",
    "Unclear allergen information",
    "Complex nutritional data",
    "Misleading health claims",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20  overflow-hidden -mt-10"
    >
      <div className="relative container mx-auto px-6 sm:px-0 max-w-6xl">
        {/* Hero Section with Problem Statement */}
        <div ref={heroRef} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Complex Food Label */}
            <div className="hero-animate">
              <div className="relative group">
                <div className="relative  transition-all duration-500 flex justify-center flex-col  items-center space-y-6">
                  {/* Placeholder for complex food label image */}
                  <img
                    src="/label2.png"
                    alt="Complex Food Label"
                    className="w-[250px] rounded-2xl"
                  />
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      <AlertTriangle className="w-4 h-4" />
                      Confusing & Technical
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Problem Statement & Solution */}
            <div className="space-y-8">
              <div className="hero-animate">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-6">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">
                    The Problem We Solve
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-slate-800">Can You</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Understand This?
                  </span>
                </h2>
              </div>

              <div className="hero-animate space-y-6">
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                  <strong>Most people can't!</strong> Food labels are filled
                  with confusing scientific terms, hidden harmful ingredients,
                  and unclear health information that put you and your family at
                  risk.
                </p>
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                  Don't worry! Our platform is designed to decode
                  these labels, providing you with simple, clear, and actionable
                  health insights to make safer food choices.
                </p>

              
              </div>

             
            </div>
          </div>
          <div className="flex flex-col border-b items-center justify-between mt-20">
         
            <div className="flex justify-between gap-12 mb-12 text-zinc-900 mx-auto">
              {/* Left Side - The Problem */}
              <div className="space-y-8 w-full sm:w-1/2">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-8 border border-red-500/30">
                  <h2 className="text-3xl font-bold  mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    The Hidden Danger
                  </h2>
                  <p className=" text-lg mb-6">
                    Every day, millions of people unknowingly consume harmful
                    ingredients hidden in complex, confusing food labels.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "🧪 Unpronounceable chemical additives",
                      "⚠️ Hidden allergens and preservatives",
                      "📊 Misleading nutritional information",
                      "🔍 Microscopic text and complex terms",
                      "❌ No clear health impact warnings",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 "
                      >
                        <span className="text-xl">{item.split(" ")[0]}</span>
                        <span>{item.substring(item.indexOf(" ") + 1)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8 w-full sm:w-1/2 b">
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-emerald-500/30 h-full">
                  <h2 className="text-3xl font-bold  mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-emerald-400" />
                    The EatWisly Solution
                  </h2>
                  <p className=" text-lg mb-6">
                    Our revolutionary AI platform makes food safety simple,
                    instant, and accessible to everyone.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "📱 Just snap a photo of any food label",
                      "⚡ Get instant AI-powered analysis",
                      "🚨 Receive clear health risk warnings",
                      "✅ Discover healthier alternatives",
                      "👨‍👩‍👧‍👦 Protect your entire family's health",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 "
                      >
                        <span className="text-xl">{item.split(" ")[0]}</span>
                        <span>{item.substring(item.indexOf(" ") + 1)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20  mx-auto"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100/50 group-hover:border-emerald-200/70">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutEatWisly;
