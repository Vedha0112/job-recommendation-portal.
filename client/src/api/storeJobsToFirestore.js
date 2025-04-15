import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
  getDoc,
} from "firebase/firestore";
import fetchJobsFromSerpApi from "./serpApi";

const jobsRef = collection(db, "jobs");

// 🔍 Check if job already exists
const isDuplicate = async (jobTitle, companyName) => {
  const q = query(
    jobsRef,
    where("title", "==", jobTitle),
    where("company_name", "==", companyName)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

export const storeJobsToFirestore = async () => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("❌ User not authenticated");
      return;
    }

    // 🔍 Get user profile
    const profileRef = doc(db, "profiles", currentUser.uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      console.warn("⚠️ No profile found for this user");
      return;
    }

    const profileData = profileSnap.data();
    const rawTechSkills = profileData.techSkills || "";
    const location = profileData.preferredLocation || "Hyderabad";

    // ✅ Normalize and parse tech skills
    const techSkills = Array.isArray(rawTechSkills)
      ? rawTechSkills.map(skill => skill.toLowerCase().trim())
      : rawTechSkills
          .split(",")
          .map(skill => skill.toLowerCase().trim())
          .filter(Boolean);

    if (!techSkills.length) {
      console.warn("⚠️ No technical skills listed in profile.");
      return;
    }

    console.log("🔍 Searching jobs using skills:", techSkills);
    console.log("📍 Preferred Location:", location);

    const batch = writeBatch(db);
    let addedCount = 0;

    for (const skill of techSkills) {
      const jobs = await fetchJobsFromSerpApi(skill, location);

      for (const job of jobs) {
        const exists = await isDuplicate(job.title, job.company_name);
        if (!exists) {
          const jobDoc = doc(jobsRef);
          batch.set(jobDoc, {
            title: job.title,
            company_name: job.company_name,
            location: job.location,
            description: job.description || "",
            link: job.related_links?.[0]?.link || "",
            salary: job.salary || null,
            tags: job.tags || [],
            postedAt: job.date_posted || null,
            createdAt: new Date(),
          });
          addedCount++;
          console.log(`✅ Added: ${job.title} at ${job.company_name}`);
        } else {
          console.log(`⚠️ Skipped (duplicate): ${job.title} at ${job.company_name}`);
        }
      }
    }

    if (addedCount > 0) {
      await batch.commit();
      console.log(`🔥 Successfully added ${addedCount} new jobs.`);
    } else {
      console.log("🚫 No new jobs added (duplicates only).");
    }
  } catch (error) {
    console.error("❌ Error storing jobs:", error.message);
  }
};
