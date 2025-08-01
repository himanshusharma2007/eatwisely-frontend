import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Users,
  Scan,
  Clock,
  AlertTriangle,
  Camera,
  Zap,
  FlaskConical,
  AlertCircle,
  BarChart3,
  Search,
  X} from "lucide-react";
import { MdMoneyOff } from "react-icons/md";
import { PiTarget } from "react-icons/pi";
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
    { number: "100%", label: "Free To Use", icon: MdMoneyOff },
    { number: "200+", label: "Labels Scanned", icon:Scan  },
    { number: "95%", label: "Accuracy Rate", icon: PiTarget },
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
    <section ref={sectionRef} className="relative py-20  overflow-hidden ">
      <div className="relative container mx-auto  max-w-6xl">
        {/* Hero Section with Problem Statement */}
        <div ref={heroRef} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Complex Food Label */}
            <div className="hero-animate">
              <div className="relative group">
                <div className="relative  transition-all duration-500 flex justify-center flex-col  items-center space-y-6">
                  {/* Placeholder for complex food label image */}
                  <img
                    src="/lable3.jpg"
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
                <p className="text-lg  text-slate-700 leading-relaxed">
                  <strong>Most people can't!</strong> Food labels are filled
                  with confusing scientific terms, hidden harmful ingredients,
                  and unclear health information that put you and your family at
                  risk.
                </p>
                <p className="text-lg  text-slate-700 leading-relaxed">
                  Don't worry! Our platform is designed to decode these labels,
                  providing you with simple, clear, and actionable health
                  insights to make safer food choices.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b items-center justify-between mt-20">
            <div className="flex flex-col sm:flex-row justify-between gap-12 mb-12 text-zinc-900 mx-auto">
              {/* Left Side - The Problem */}
              <div className="space-y-8 w-full sm:w-1/2">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-6 md:p-8 border border-red-500/30">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    The Hidden Danger
                  </h2>
                  <p className="text-lg mb-6">
                    Every day, millions of people unknowingly consume harmful
                    ingredients hidden in complex, confusing food labels.
                  </p>
                  <ul className="space-y-2">
                    {[
                      {
                        icon: FlaskConical,
                        text: "Unpronounceable chemical additives",
                        color: "text-red-500",
                      },
                      {
                        icon: AlertCircle,
                        text: "Hidden allergens and preservatives",
                        color: "text-red-500",
                      },
                      {
                        icon: BarChart3,
                        text: "Misleading nutritional information",
                        color: "text-red-500",
                      },
                      {
                        icon: Search,
                        text: "Microscopic text and complex terms",
                        color: "text-red-400",
                      },
                      {
                        icon: X,
                        text: "No clear health impact warnings",
                        color: "text-red-600",
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8 w-full sm:w-1/2">
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 md:p-8 border border-emerald-500/30 h-full">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-emerald-400" />
                    The EatWisly Solution
                  </h2>
                  <p className="text-lg mb-6">
                    Our revolutionary AI platform makes food safety simple,
                    instant, and accessible to everyone.
                  </p>
                  <ul className="space-y-2">
                    {[
                      {
                        icon: Camera,
                        text: "Just snap a photo of any food label",
                        color: "text-emerald-500",
                      },
                      {
                        icon: Zap,
                        text: "Get instant AI-powered analysis",
                        color: "text-emerald-500",
                      },
                      {
                        icon: AlertTriangle,
                        text: "Receive clear health risk warnings",
                        color: "text-emerald-500",
                      },
                      {
                        icon: Heart,
                        text: "Discover healthier alternatives",
                        color: "text-emerald-500",
                      },
                      {
                        icon: Users,
                        text: "Protect your entire family's health",
                        color: "text-emerald-500",
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span>{item.text}</span>
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
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-20  mx-auto"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl border-emerald-300 border  group-hover:border-emerald-200/70">
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
