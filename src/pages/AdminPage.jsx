import { useState } from 'react';
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

function AdminPage() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [experience, setExperience] = useState(5);
  const [charges, setCharges] = useState(3000);
  const [type, setType] = useState('civil');
  const [location, setLocation] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [court, setCourt] = useState('');
  const [bio, setBio] = useState('');
  const [cases, setCases] = useState('');

  const [courtName, setCourtName] = useState('');
  const [courtPhoto, setCourtPhoto] = useState('');
  const [courtLink, setCourtLink] = useState('');

  const [ebookTitle, setEbookTitle] = useState('');
  const [ebookDesc, setEbookDesc] = useState('');
  const [ebookLink, setEbookLink] = useState('');

  const clearLawyerForm = () => {
    setName(''); setPhoto(''); setExperience(5); setCharges(3000);
    setType('civil'); setLocation(''); setOfficeAddress(''); setCourt(''); setBio(''); setCases('');
  };

  const handleLawyerSubmit = async (e) => {
    e.preventDefault();
    const lawyerData = {
      name, photo, experience: parseInt(experience, 10),
      charges: parseInt(charges, 10), type, location, officeAddress,
      court: court.split(',').map(item => item.trim().toLowerCase()),
      bio, cases: cases.split(',').map(item => item.trim()),
    };
    try {
      await addDoc(collection(db, "lawyers"), lawyerData);
      alert("Lawyer successfully added!");
      clearLawyerForm();
    } catch (error) {
      console.error("Error adding lawyer: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCourtSubmit = async (e) => {
    e.preventDefault();
    const courtData = { name: courtName, photo: courtPhoto, youtubeLink: courtLink };
    try {
      await addDoc(collection(db, "courts"), courtData);
      alert("Court successfully added!");
      setCourtName(''); setCourtPhoto(''); setCourtLink('');
    } catch (error) {
      console.error("Error adding court: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEbookSubmit = async (e) => {
    e.preventDefault();
    const ebookData = { title: ebookTitle, description: ebookDesc, link: ebookLink };
    try {
      await addDoc(collection(db, "ebooks"), ebookData);
      alert("E-book successfully added!");
      setEbookTitle(''); setEbookDesc(''); setEbookLink('');
    } catch (error) {
      console.error("Error adding e-book: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-stone-50 font-sans min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 text-center mb-12">Admin Dashboard</h1>
        
        <form onSubmit={handleLawyerSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12 border border-stone-100">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Add New Lawyer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4"><label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
              <div className="mb-4"><label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Photo URL</label><input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div className="mb-4"><label htmlFor="experience" className="block text-gray-700 font-bold mb-2">Experience (Years)</label><input type="number" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
              <div className="mb-4"><label htmlFor="charges" className="block text-gray-700 font-bold mb-2">Charges per Session</label><input type="number" id="charges" value={charges} onChange={(e) => setCharges(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
              <div className="mb-4"><label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label><textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows="4" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required></textarea></div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                  <option value="civil">Civil</option>
                  <option value="criminal">Criminal</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="mb-4"><label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location (City)</label><input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
              <div className="mb-4"><label htmlFor="officeAddress" className="block text-gray-700 font-bold mb-2">Office Address</label><input type="text" id="officeAddress" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
              <div className="mb-4"><label htmlFor="court" className="block text-gray-700 font-bold mb-2">Practicing Courts</label><input type="text" id="court" value={court} onChange={(e) => setCourt(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g., high court, supreme court" required /><p className="text-xs text-gray-500 mt-1">Separate multiple courts with a comma.</p></div>
              <div className="mb-4"><label htmlFor="cases" className="block text-gray-700 font-bold mb-2">Notable Cases</label><textarea id="cases" value={cases} onChange={(e) => setCases(e.target.value)} rows="2" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g., Case v. Another, Another Case" required></textarea><p className="text-xs text-gray-500 mt-1">Separate multiple cases with a comma.</p></div>
            </div>
          </div>
          <div className="mt-6"><button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg">Add Lawyer to Database</button></div>
        </form>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12 border border-stone-100">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Add New Court</h2>
          <form onSubmit={handleCourtSubmit}>
            <div className="mb-4"><label htmlFor="courtName" className="block text-gray-700 font-bold mb-2">Court Name</label><input type="text" id="courtName" value={courtName} onChange={(e) => setCourtName(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
            <div className="mb-4"><label htmlFor="courtPhoto" className="block text-gray-700 font-bold mb-2">Photo URL</label><input type="text" id="courtPhoto" value={courtPhoto} onChange={(e) => setCourtPhoto(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
            <div className="mb-4"><label htmlFor="courtLink" className="block text-gray-700 font-bold mb-2">YouTube Link</label><input type="text" id="courtLink" value={courtLink} onChange={(e) => setCourtLink(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
            <div className="mt-6"><button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg">Add Court to Database</button></div>
          </form>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12 border border-stone-100">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Add New E-book</h2>
          <form onSubmit={handleEbookSubmit}>
            <div className="mb-4"><label htmlFor="ebookTitle" className="block text-gray-700 font-bold mb-2">E-book Title</label><input type="text" id="ebookTitle" value={ebookTitle} onChange={(e) => setEbookTitle(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
            <div className="mb-4"><label htmlFor="ebookDesc" className="block text-gray-700 font-bold mb-2">Description</label><textarea id="ebookDesc" value={ebookDesc} onChange={(e) => setEbookDesc(e.target.value)} rows="3" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required></textarea></div>
            <div className="mb-4"><label htmlFor="ebookLink" className="block text-gray-700 font-bold mb-2">Link to Document</label><input type="text" id="ebookLink" value={ebookLink} onChange={(e) => setEbookLink(e.target.value)} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
            <div className="mt-6"><button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg">Add E-book to Database</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;