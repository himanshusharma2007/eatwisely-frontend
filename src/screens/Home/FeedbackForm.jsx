import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 80%'
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call in production)
    setTimeout(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <section className="bg-[#F6FFFA] py-12 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#02C39A] text-center mb-8">We’d Love Your Feedback</h2>
        {submitted ? (
          <div className="text-center text-[#02C39A]">
            <p className="text-lg">Thank you for your feedback!</p>
            <button
              className="btn btn-[#00A896] text-white mt-4 px-6 py-3 rounded-lg"
              onClick={() => setSubmitted(false)}
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[#02C39A] mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full bg-white text-[#02C39A]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#02C39A] mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-white text-[#02C39A]"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[#02C39A] mb-1">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="textarea textarea-bordered w-full bg-white text-[#02C39A]"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-[#00A896] text-white w-full py-3 rounded-lg">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default FeedbackForm;