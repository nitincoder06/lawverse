function HearingCard({ court }) {
    return (
      <a
        href={court.youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block border rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={court.photo}
          alt={court.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-center">{court.name}</h3>
        </div>
      </a>
    );
  }
  
  export default HearingCard;