import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!id) return;
      try {
        const lawyerDoc = await getDoc(doc(db, 'lawyers', id));
        if (lawyerDoc.exists()) {
          setLawyer({ id: lawyerDoc.id, ...lawyerDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching lawyer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    const newBooking = {
      userId: currentUser.uid,
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      lawyerPhoto: lawyer.photo,
      lawyerLocation: lawyer.location,
      officeAddress: lawyer.officeAddress,
      date,
      time,
      status: 'confirmed'
    };
    
    try {
      await addDoc(collection(db, "bookings"), newBooking);
      alert("Booking confirmed and saved to your account!");
      navigate('/my-bookings');
    } catch (error) {
      console.error("Error saving booking: ", error);
      alert("There was an error saving your booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading lawyer details...</p>
      </div>
    );
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
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 text-center mb-8">Book an Appointment</h1>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-stone-100">
          <div className="flex items-center mb-6">
            <img
              src={lawyer.photo}
              alt={lawyer.name}
              className="w-24 h-24 rounded-full object-cover mr-6 border-2 border-gray-300"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{lawyer.name}</h2>
              <p className="text-gray-500">{lawyer.location}</p>
              <p className="text-lg font-bold text-amber-600 mt-2">₹{lawyer.charges} / session</p>
            </div>
          </div>

          <form onSubmit={handleBooking}>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Select a Date</label>
              <input
                type="date"
                id="date"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Select a Time</label>
              <input
                type="time"
                id="time"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;