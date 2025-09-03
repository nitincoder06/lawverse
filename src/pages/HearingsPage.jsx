import { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import HearingCard from '../components/HearingCard.jsx';

function HearingsPage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courts'));
        const courtsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourts(courtsData);
      } catch (error) {
        console.error("Error fetching courts:", error);
      }
      setLoading(false);
    };
    fetchCourts();
  }, []);

  if (loading) {
    return <div className="text-center p-10"><h2 className="text-2xl font-semibold">Loading Courts...</h2></div>;
  }

  return (
    <div className="bg-stone-50 font-sans min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Live Court Hearings</h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Click on any court below to open its official YouTube channel and view live or archived proceedings. This initiative promotes transparency in the judicial process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courts.map((court) => (
            <HearingCard key={court.id} court={court} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HearingsPage;