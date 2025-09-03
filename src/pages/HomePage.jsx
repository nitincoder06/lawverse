import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ServicesSection from '../components/ServicesSection';
import TopLawyersSection from '../components/TopLawyersSection';
import TestimonialsSection from '../components/TestimonialsSection';

function HomePage() {
  return (
    <div>
      <header className="bg-stone-50 font-sans">
        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-4 leading-tight">
              Your One-Stop Solution 
              <span className="block text-amber-600">For All Legal Issues.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg">
              From finding the right lawyer to understanding complex legal documents, Lawverse makes the law accessible to everyone.
            </p>
            <a 
              href="/find-a-lawyer" 
              className="inline-block bg-amber-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg"
            >
              Get Started
            </a>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <img 
              src="https://ik.imagekit.io/iouladg1bg/Gemini_Generated_Image_35yg8l35yg8l35yg.png?updatedAt=1756887085377" 
              alt="Isometric illustration of legal symbols" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </header>
      
      <ServicesSection />
      <TopLawyersSection />
      <TestimonialsSection />

      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}

export default HomePage;