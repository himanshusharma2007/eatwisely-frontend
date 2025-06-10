import AboutEatWisly from "../screens/Home/AboutEatWisly";
import Hero from "../screens/Home/Hero";
import HowItWorks from "../screens/Home/HowItWorks";
import Steps from "../screens/Home/Steps";
import FAQs from "../screens/Home/FAQs";
import FeedbackForm from "../screens/Home/FeedbackForm";
import Features from "../screens/Home/Features";


const HomePage = () => {
  return (
    <div className="bg-[#F6FFFA]">
      <Hero />
   <AboutEatWisly />
          <Features />
    <HowItWorks />
       {/* <Steps />
      <FAQs />
      <FeedbackForm /> */}
      <footer className="bg-white py-6 px-4 text-center text-[#02C39A]">
        <p>&copy; 2025 EatWisly. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="text-[#02C39A] hover:text-[#00A896] mx-2">About</a>
          <a href="/contact" className="text-[#02C39A] hover:text-[#00A896] mx-2">Contact</a>
          <a href="/privacy" className="text-[#02C39A] hover:text-[#00A896] mx-2">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;