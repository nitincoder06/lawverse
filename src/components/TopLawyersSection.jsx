import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase.js';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import LawyerCard from './LawyerCard.jsx';

function TopLawyersSection() {
  const [topLawyers, setTopLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLawyers = async () => {
      try {
        const lawyersRef = collection(db, 'lawyers');
        const q = query(lawyersRef, limit(4));
        const querySnapshot = await getDocs(q);
        const lawyersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTopLawyers(lawyersData);
      } catch (error) {
        console.error("Error fetching top lawyers:", error);
      }
      setLoading(false);
    };
    fetchTopLawyers();
  }, []);

  return (
    <section className="bg-stone-50 py-16 md:py-24 font-sans">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-12">Meet Our Top Lawyers</h2>
        {loading ? (
          <p className="text-gray-500">Loading lawyers...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        )}
        <div className="mt-12">
          <Link
            to="/find-a-lawyer"
            className="inline-block bg-amber-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg"
          >
            View All Lawyers
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TopLawyersSection;