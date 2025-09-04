import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

function LawyerProfilePage() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const docRef = doc(db, 'lawyers', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLawyer({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching lawyer:", error);
      }
      setLoading(false);
    };

    fetchLawyer();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10"><h2 className="text-2xl font-semibold">Loading Profile...</h2></div>;
  }

  if (!lawyer) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Lawyer not found!</h1>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex border border-stone-100">
          <img
            src={lawyer.photo}
            alt={lawyer.name}
            className="w-full h-80 md:h-auto md:w-1/3 object-cover"
          />
          <div className="p-6 md:p-8 flex flex-col justify-between font-sans">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">{lawyer.name}</h1>
              <p className="text-gray-500 mb-1">Location: {lawyer.location}</p>
              <p className="text-gray-500 mb-4 font-semibold">{lawyer.officeAddress}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-stone-100 text-stone-800 text-sm font-semibold px-3 py-1 rounded-full capitalize">{lawyer.type} Law</span>
                <span className="bg-stone-100 text-stone-800 text-sm font-semibold px-3 py-1 rounded-full">{lawyer.experience} years experience</span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{lawyer.bio}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Notable Cases</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {lawyer.cases.map((caseItem, index) => (
                    <li key={index}>{caseItem}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-200 pt-6">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Book an Appointment</h2>
              <p className="text-xl font-bold text-amber-600 mb-4">₹{lawyer.charges} / session</p>
              <Link
                to={`/lawyer/${lawyer.id}/book`}
                className="w-full block bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-700 text-center transition-colors duration-300 shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerProfilePage;