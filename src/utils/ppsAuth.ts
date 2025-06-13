import { PPSOAuthToken } from '../types/ppsToken';

export async function getPpsToken(): Promise<PPSOAuthToken | null> {
  const clientId = process.env.REACT_APP_PPS_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_PPS_CLIENT_SECRET;
  const tokenUrl = process.env.REACT_APP_PPS_TOKEN_URL;
  const scope = process.env.REACT_APP_PPS_SCOPE;

  if (!clientId || !clientSecret || !tokenUrl) {
    console.error('Missing required environment variables for PPS Auth.');
    return null;
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
  };

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  if (scope) body.append('scope', scope);

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status} ${response.statusText}`);
    }

    const data: PPSOAuthToken = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching PPS token:', error);
    return null;
  }
}
