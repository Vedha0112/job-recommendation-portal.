// src/api/fetchRecommendedJobs.js
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchRecommendedJobs = async (skills = []) => {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef); // You can apply filtering logic here

    const snapshot = await getDocs(q);

    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter based on user skills
    const recommended = jobs.filter(job =>
      skills.some(skill => job.description?.toLowerCase().includes(skill.toLowerCase()))
    );

    return recommended;
  } catch (error) {
    console.error("Error fetching recommended jobs:", error.message);
    return [];
  }
};
