module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, server, asset } = req.query;

  if (!token || !server || !asset) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const url = `${server}/api/v2/assets/${asset}/data.json?limit=30000`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Token ${token}` }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
