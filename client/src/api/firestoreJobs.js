// src/api/firestoreJobs.js
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

/**
 * Add a new job posting to Firestore.
 * @param {Object} job - Job data: { title, company, location, description, createdBy }
 */
export async function addJob({ title, company, location, description, createdBy }) {
  try {
    const jobRef = await addDoc(collection(db, "jobs"), {
      title,
      company,
      location,
      description,
      createdBy, // Optional: recruiter UID
      createdAt: Timestamp.now(),
    });
    console.log("✅ Job added with ID:", jobRef.id);
    return jobRef.id;
  } catch (e) {
    console.error("❌ Error adding job:", e.message);
    throw e;
  }
}

/**
 * Fetch all job listings from Firestore, ordered by newest first.
 * @returns {Array} - List of job objects.
 */
export async function fetchJobs() {
  try {
    const jobsQuery = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(jobsQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("❌ Error fetching jobs:", e.message);
    return [];
  }
}
