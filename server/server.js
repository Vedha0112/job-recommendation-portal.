const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // to use .env variables

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/jobs', async (req, res) => {
  const query = req.query.q || "developer";
  const location = req.query.location || "India";

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: "google_jobs",
        q: `${query} in ${location}`,
        api_key: process.env.SERP_API_KEY, // store this in your .env
      },
    });

    const jobs = response.data.jobs_results || [];
    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
