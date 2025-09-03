import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Success! Your account has been created.");
      navigate('/');
    } catch (error) {
      console.error("Error signing up:", error);
      
      let errorMessage = "An error occurred during sign up.";
      switch (error.code) {
        case 'auth/configuration-not-found':
          errorMessage = "Firebase configuration error. Please check your setup.";
          break;
        case 'auth/email-already-in-use':
          errorMessage = "An account with this email already exists.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters long.";
          break;
        default:
          errorMessage = error.message;
      }
      
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Success! You have logged in.");
      navigate('/');
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-4xl text-center mb-6 font-bold">Sign Up / Login</h1>
      <form onSubmit={handleSignUp} className="p-8 border rounded-lg shadow-lg bg-white">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Must be at least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
            Sign Up
          </button>
          <button onClick={handleLogin} type="button" className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;