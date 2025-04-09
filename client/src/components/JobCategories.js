// src/components/JobCategories.js
import React from "react";

const categories = [
  { name: "Software Engineering", icon: "💻" },
  { name: "Design & UI/UX", icon: "🎨" },
  { name: "Marketing", icon: "📢" },
  { name: "Finance", icon: "💰" }
];

const JobCategories = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">Popular Job Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => (
          <div key={category.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <span className="text-4xl mb-2">{category.icon}</span>
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobCategories;