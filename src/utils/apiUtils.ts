const request = async (url: string, method: 'GET' | 'POST', data?: Record<string, any>, headers: Record<string, string> = {}, onSuccess?: (data: any) => void) => {
  try {
    const authToken = localStorage.getItem('authToken');
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Token ${authToken}` }),
    };

    const options: RequestInit = {
      method,
      headers: { ...defaultHeaders, ...headers },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to ${method}: ${response.statusText}`);
    }

    const responseData = await response.json();

    if (onSuccess) {
      onSuccess(responseData);
    }
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchData = (url: string, headers?: Record<string, string>, onSuccess?: (data: any) => void) =>
  request(url, 'GET', undefined, headers, onSuccess);

export const postData = (url: string, data?: Record<string, any>, headers?: Record<string, string>, onSuccess?: (data: any) => void) =>
  request(url, 'POST', data, headers, onSuccess);