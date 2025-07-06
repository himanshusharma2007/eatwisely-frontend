import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        headingRef.current.style.transition = 'all 0.8s ease-out';
        headingRef.current.style.opacity = '1';
        headingRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    if (sectionRef.current) {
      sectionRef.current.style.opacity = '0';
      sectionRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        sectionRef.current.style.transition = 'all 0.6s ease-out';
        sectionRef.current.style.opacity = '1';
        sectionRef.current.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  const faqs = [
    {
      question: 'What is EatWisely and how does it work?',
      answer:
        'EatWisely is an AI-powered web app that helps you understand food labels. Simply upload a photo of a food label, and our system uses OCR and NLP to extract ingredients, analyze their health impacts, and provide clear warnings and healthier alternatives. It’s designed to make nutrition information accessible and actionable for everyone.'
    },
    {
      question: 'What kind of health insights does EatWisely provide?',
      answer:
        'EatWisely flags harmful ingredients, such as high-fructose corn syrup or artificial additives, and provides simple warnings like “may contribute to weight gain” or “not suitable for diabetics.” It also suggests healthier alternatives, such as replacing sugar with natural sweeteners like honey.'
    },
    {
      question: 'Can EatWisely help with dietary restrictions or allergies?',
      answer:
        'Yes! EatWisely identifies ingredients that may conflict with common dietary restrictions or allergies, such as gluten, dairy, or nuts. Our health-impact database is designed to flag these ingredients and provide safe alternatives tailored to your needs.'
    },
    {
      question: 'How accurate is the ingredient analysis?',
      answer:
        'Our prototype uses Tesseract.js for OCR to extract text from food labels, which is highly accurate for clear images. We’re also exploring Google Vision API for enhanced precision. The ingredient analysis is powered by a custom MongoDB database, ensuring reliable health insights based on scientific data.'
    },
    {
      question: 'Do I need an account to use EatWisely?',
      answer:
        'You can try EatWisely as a guest to scan a label and get basic insights. However, creating an account allows you to save your scans, track your dietary preferences, and receive personalized recommendations for a healthier lifestyle.'
    },
    {
      question: 'Is EatWisely suitable for families?',
      answer:
        'Absolutely! EatWisely is designed to help families make informed food choices. It highlights ingredients that may be harmful to children or adults and suggests family-friendly alternatives, making it easier to shop for safe and healthy foods.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative  py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
   

      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Got questions about EatWisely? Find answers to common queries about how our AI-powered food label reader works.
          </p>
        </div>

        {/* FAQ List */}
        <div ref={sectionRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 transition-all duration-300  bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left text-slate-800 focus:outline-none"
              >
                <span className="text-lg sm:text-xl font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-emerald-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 text-slate-600 text-base sm:text-lg">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;