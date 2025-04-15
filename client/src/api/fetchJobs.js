import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// Add this utility
String.prototype.includesAny = function (words = []) {
  return words.some(word => this.includes(word));
};

export const fetchRecommendedJobs = async (skills = []) => {
  try {
    const jobsRef = collection(db, "jobs");
    const snapshot = await getDocs(jobsRef);

    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const recommended = skills.length === 0
      ? jobs
      : jobs.filter(job =>
          (job.description || "").toLowerCase().includesAny(
            skills.map(skill => skill.toLowerCase())
          )
        );

    return recommended;
  } catch (error) {
    console.error("🔥 Firestore Fetch Error:", error);
    return [];
  }
};
