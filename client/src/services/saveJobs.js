import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase"; // adjust path if needed

const db = getFirestore(app);
const auth = getAuth(app);

export const saveJobsToFirestore = async (jobs) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return;
  }

  const userId = user.uid;

  for (const job of jobs) {
    try {
      await addDoc(collection(db, "recommendedJobs"), {
        userId,
        title: job.title || job.job_title,
        company: job.company || job.company_name,
        location: job.location || "N/A",
        description: job.description || "No description",
        applyUrl: job.url || job.link,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Failed to save job:", error);
    }
  }
};
