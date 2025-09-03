import { Link } from 'react-router-dom';

function LawyerCard({ lawyer }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
      <img
        src={lawyer.photo}
        alt={lawyer.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{lawyer.name}</h3>
        <p className="text-sm text-gray-500 mb-1">Location: {lawyer.location}</p>
        <p className="text-base text-gray-800 font-semibold mb-3">₹{lawyer.charges} / session</p>
        <div className="flex-grow">
          <span className="inline-block bg-stone-100 text-stone-800 text-xs font-semibold px-2 py-1 rounded-full mb-3 capitalize">
            {lawyer.type} Law
          </span>
        </div>
        <Link
          to={`/lawyer/${lawyer.id}`}
          className="w-full bg-amber-600 text-white font-bold py-2 px-3 text-sm rounded-lg hover:bg-amber-700 text-center transition-colors duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default LawyerCard;