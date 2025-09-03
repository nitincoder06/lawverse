import { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

function EbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'ebooks'));
        const ebooksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEbooks(ebooksData);
      } catch (error) {
        console.error("Error fetching ebooks:", error);
      }
      setLoading(false);
    };
    fetchEbooks();
  }, []);

  if (loading) {
    return <div className="text-center p-10"><h2 className="text-2xl font-semibold">Loading Resources...</h2></div>;
  }

  return (
    <div className="bg-stone-50 font-sans min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">E-books & Resources</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Access a curated library of fundamental legal documents and resources.
          </p>
        </div>
        <div className="space-y-6 max-w-4xl mx-auto">
          {ebooks.map((ebook) => (
            <div key={ebook.id} className="bg-white p-6 rounded-lg shadow-md border border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{ebook.title}</h2>
                <p className="text-gray-500">{ebook.description}</p>
              </div>
              <a
                href={ebook.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg whitespace-nowrap"
              >
                Read Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EbooksPage;