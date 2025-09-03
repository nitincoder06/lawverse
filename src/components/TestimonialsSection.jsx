function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Lawverse made finding a trustworthy lawyer incredibly simple. The transparency and ease of use are unmatched. Highly recommended!",
      name: "Amit Patel",
      title: "Startup Founder",
    },
    {
      quote: "As a law student, the access to live hearings and the e-book library has been an invaluable resource for my studies.",
      name: "Sneha Reddy",
      title: "Law Student",
    },
    {
      quote: "Finally, a platform that demystifies the legal process. I was able to get quick advice and book a consultation in minutes.",
      name: "Riya Sharma",
      title: "Freelancer",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 font-sans">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-stone-50 p-8 border border-stone-100 rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-amber-600 font-semibold">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;