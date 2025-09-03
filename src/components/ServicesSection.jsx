import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faVideo, faBookOpen } from '@fortawesome/free-solid-svg-icons';

function ServicesSection() {
    const services = [
      {
        title: 'Lawyer Booking',
        description: 'Easily find and book certified lawyers based on your specific needs, location, and expertise.',
        icon: faGavel,
        link: '/find-a-lawyer'
      },
      {
        title: 'Live Hearing Access',
        description: 'Gain transparency into the judicial process by watching live court hearings from across the country.',
        icon: faVideo,
        link: '/hearings'
      },
      {
        title: 'E-books & Resources',
        description: 'Access a comprehensive digital library of legal documents, books, and important resources.',
        icon: faBookOpen,
        link: '/ebooks'
      },
    ];
  
    return (
      <section className="bg-stone-50 py-16 md:py-24 font-sans">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            We provide tailored solutions to make your legal journey transparent and straightforward.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 border border-gray-100 rounded-lg shadow-xl relative"> {/* Removed group class */}
                <div className="text-amber-600 text-5xl mb-6">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                <a 
                  href={service.link} 
                  className="text-amber-600 font-semibold flex items-center justify-center space-x-2 mt-auto" // Adjusted positioning
                >
                  <span>Find out more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default ServicesSection;