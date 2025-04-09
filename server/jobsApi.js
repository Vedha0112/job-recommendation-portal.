const express = require("express");
const axios = require("axios");
const router = express.Router();

const SERPAPI_KEY = "922a2d162b3ad31f1fda4c8620b8cf9ba32058028a808d2a4506efbaf7b63b69"; 
router.get("/jobs", async (req, res) => {
  const { query = "Software Engineer", location = "India" } = req.query;

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_jobs",
        q: query,
        location,
        api_key: SERPAPI_KEY,
      },
    });

    res.status(200).json(response.data.jobs_results || []);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
