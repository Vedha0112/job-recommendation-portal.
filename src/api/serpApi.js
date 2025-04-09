import axios from 'axios';

const fetchJobsFromSerpApi = async (query = "software engineer", location = "India") => {
  try {
    const response = await axios.get('http://localhost:5000/api/jobs', {
      params: { q: query, location: location },
    });

    return response.data;
  } catch (error) {
    console.error("Frontend error fetching jobs from backend:", error.message);
    return [];
  }
};

export default fetchJobsFromSerpApi;
