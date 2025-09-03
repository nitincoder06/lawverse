function ContactSection() {
  return (
    <section className="bg-stone-50 py-16 md:py-24 font-sans">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Have a question or need to get in touch? Fill out the form below, and our team will get back to you as soon as possible.
        </p>
        <form className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-stone-100">
          <div className="mb-4 text-left">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your Name" />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your Email" />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea id="message" rows="4" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection;