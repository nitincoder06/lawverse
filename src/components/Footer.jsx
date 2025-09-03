import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4">Lawverse</h3>
          <p className="text-gray-400 text-sm leading-loose">Simplifying the legal process through technology and transparency.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-amber-600 transition-colors">Home</Link></li>
            <li><Link to="/find-a-lawyer" className="text-gray-400 hover:text-amber-600 transition-colors">Find a Lawyer</Link></li>
            <li><Link to="/#about" className="text-gray-400 hover:text-amber-600 transition-colors">About Us</Link></li>
            <li><Link to="/#contact" className="text-gray-400 hover:text-amber-600 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
          <p className="text-gray-400">Vadodara, Gujarat, IN</p>
          <p className="text-gray-400">contact@lawverse.com</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-8 pt-8 border-t border-gray-700">
        <p>&copy; 2025 Lawverse. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;