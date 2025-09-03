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
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <img
          src={lawyer.photo}
          alt={lawyer.name}
          className="w-full h-64 md:h-auto md:w-1/3 object-cover"
        />
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{lawyer.name}</h1>
            <p className="text-gray-600 mb-4">Location: {lawyer.location}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full capitalize">{lawyer.type}</span>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">{lawyer.experience} years experience</span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{lawyer.bio}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Notable Cases</h2>
              <ul className="list-disc list-inside text-gray-700">
                {lawyer.cases.map((caseItem, index) => (
                  <li key={index}>{caseItem}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Book an Appointment</h2>
            <p className="text-lg font-bold text-green-600 mb-4">Charges: ₹{lawyer.charges} / session</p>
            <Link
              to={`/lawyer/${lawyer.id}/book`}
              className="w-full block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerProfilePage;