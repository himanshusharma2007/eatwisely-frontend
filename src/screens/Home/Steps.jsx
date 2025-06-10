import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Steps = () => {
  const stepRef = useRef(null);

  useEffect(() => {
    gsap.from(stepRef.current.children, {
      opacity: 0,
      x: -20,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: stepRef.current,
        start: 'top 80%'
      }
    });
  }, []);

  const steps = [
    { title: 'Upload Image', description: 'Take a photo of your food label and upload it.' },
    { title: 'Analyze Label', description: 'Our system processes the label to extract and analyze data.' },
    { title: 'Get Insights', description: 'Receive a detailed report with health insights and recommendations.' }
  ];

  return (
    <section className="bg-[#F6FFFA] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#02C39A] text-center mb-8">Get Started in 3 Easy Steps</h2>
        <div ref={stepRef} className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00A896] text-white rounded-full flex items-center justify-center text-lg font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#02C39A]">{step.title}</h3>
                <p className="text-base text-[#02C39A]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;