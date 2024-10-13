import axios from "axios";

// Create API
// Server side rendering (SSR)
export default async function handler(req, res) {
  const { query } = req.query;
  const apiKey = process.env.NYTIMES_API_KEY;

  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the data you requested!', error: error.toString() });
  }
}

