import AboutEatWisly from "../screens/Home/AboutEatWisly";
import Hero from "../screens/Home/Hero";
import Steps from "../screens/Home/Steps";
import FeedbackForm from "../screens/Home/FeedbackForm";
import Features from "../screens/Home/Features";
import FAQSection from "../screens/Home/FAQs";

const HomePage = () => {
  return (
    <div className="bg-[#F6FFFA] flex flex-col space-y-0">
      <Hero />
      <AboutEatWisly />
      <Features />
      <Steps />  
      <FAQSection />
      <FeedbackForm />
      {/* <Steps />
      
      */}
      <footer className="bg-white py-6 px-4 text-center text-[#02C39A]">
        <p>&copy; 2025 EatWisly. All rights reserved.</p>
         <p>Made with ❤️ by Himanshu Sharma</p>
      </footer>
    </div>
  );
};

export default HomePage;
