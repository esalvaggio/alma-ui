export const fetchData = async (url: string, headers = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('authToken')}`,
            ...headers
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }; 