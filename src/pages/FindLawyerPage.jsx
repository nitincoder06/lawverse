import { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import LawyerCard from '../components/LawyerCard.jsx';

function FindLawyerPage() {
  const [allLawyers, setAllLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [courtFilters, setCourtFilters] = useState({
    'lower court': false,
    'high court': false,
    'supreme court': false,
  });

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lawyers'));
        const lawyersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllLawyers(lawyersData);
      } catch (error) {
        console.error("Error fetching lawyers: ", error);
      }
      setLoading(false);
    };
    fetchLawyers();
  }, []);

  const locations = ['all', ...new Set(allLawyers.map(lawyer => lawyer.location).sort())];

  const handleCourtChange = (e) => {
    const { name, checked } = e.target;
    setCourtFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredLawyers = allLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || lawyer.type === filterType || lawyer.type === 'both';
    const matchesLocation = locationFilter === 'all' || lawyer.location === locationFilter;
    const selectedCourts = Object.keys(courtFilters).filter(court => courtFilters[court]);
    const matchesCourt = selectedCourts.length === 0 || selectedCourts.some(court => lawyer.court.includes(court));
    return matchesSearch && matchesType && matchesLocation && matchesCourt;
  });

  if (loading) {
    return <div className="text-center p-10"><h2 className="text-2xl font-semibold">Loading Lawyers...</h2></div>;
  }

  return (
    <div className="bg-stone-50 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Find Your Advocate</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Use the filters below to find the perfect legal expert for your needs.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-stone-100 mb-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location} className="capitalize">
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
            <select
              className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="civil">Civil</option>
              <option value="criminal">Criminal</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className="flex justify-center items-center space-x-6 mt-6 pt-6 border-t border-stone-200">
            <h3 className="font-semibold text-gray-700">Practicing Court:</h3>
            <label className="flex items-center space-x-2"><input type="checkbox" name="lower court" className="h-5 w-5 rounded text-amber-600 focus:ring-amber-500" checked={courtFilters['lower court']} onChange={handleCourtChange} /><span>Lower</span></label>
            <label className="flex items-center space-x-2"><input type="checkbox" name="high court" className="h-5 w-5 rounded text-amber-600 focus:ring-amber-500" checked={courtFilters['high court']} onChange={handleCourtChange} /><span>High</span></label>
            <label className="flex items-center space-x-2"><input type="checkbox" name="supreme court" className="h-5 w-5 rounded text-amber-600 focus:ring-amber-500" checked={courtFilters['supreme court']} onChange={handleCourtChange} /><span>Supreme</span></label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindLawyerPage;