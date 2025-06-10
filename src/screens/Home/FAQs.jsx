import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FAQs = () => {
  const faqRef = useRef(null);

  useEffect(() => {
    gsap.from(faqRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: faqRef.current,
        start: 'top 80%'
      }
    });
  }, []);

  const faqs = [
    {
      question: 'What types of images can I upload?',
      answer: 'You can upload JPEG, PNG, or HEIC images of food labels, up to 5MB in size.'
    },
    {
      question: 'Do I need an account to use EatWisly?',
      answer: 'No, you can try EatWisly as a guest. However, creating an account allows you to save and manage your scans.'
    },
    {
      question: 'How accurate are the health insights?',
      answer: 'Our insights are based on advanced analysis, but we recommend consulting a nutritionist for personalized advice.'
    }
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#02C39A] text-center mb-8">Frequently Asked Questions</h2>
        <div ref={faqRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-[#F6FFFA]">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium text-[#02C39A]">{faq.question}</div>
              <div className="collapse-content text-base text-[#02C39A]">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;