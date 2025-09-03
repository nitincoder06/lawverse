import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase.js';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext.jsx';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userBookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [currentUser]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      alert("Appointment cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling appointment: ", error);
      alert("There was an error cancelling the appointment.");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 text-center mb-8">My Bookings</h1>
        
        {bookings.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center border border-stone-100">
                <img
                  src={booking.lawyerPhoto}
                  alt={booking.lawyerName}
                  className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6 border-2 border-gray-300"
                />
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">{booking.lawyerName}</h2>
                  <p className="text-gray-500">Location: {booking.lawyerLocation}</p>
                  <div className="my-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <p className="font-semibold">Date: <span className="font-normal">{new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                    <p className="font-semibold">Time: <span className="font-normal">{booking.time}</span></p>
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 text-amber-800 border-l-4 border-amber-400 rounded-r-lg">
                    <p className="font-semibold">Note:</p>
                    <p>Please reach the given time and venue 10 minutes early for a smoother process.</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button onClick={() => handleCancel(booking.id)} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-10 rounded-lg shadow-md max-w-4xl mx-auto">
            <p className="text-lg text-gray-600">You have no upcoming appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;