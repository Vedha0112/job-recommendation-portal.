// src/components/Testimonials.js
import React from "react";

const testimonials = [
  { name: "John Doe", feedback: "This platform helped me land my dream job!" },
  { name: "Jane Smith", feedback: "User-friendly and great job listings!" }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-8">What Job Seekers Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
            <p className="italic">"{testimonial.feedback}"</p>
            <h4 className="mt-4 font-semibold">- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;