import React, { useEffect, useState } from 'react';
import { getPpsToken } from '../../utils/ppsAuth';
import { PPSOAuthToken } from '../../types/ppsToken';

const PPSOneToken: React.FC = () => {
  const [tokenData, setTokenData] = useState<PPSOAuthToken | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchToken = async () => {
    setLoading(true);
    setError(null);

    const token = await getPpsToken();
    if (token) {
      setTokenData(token);
    } else {
      setError('Failed to fetch token');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchToken(); // Auto-fetch on mount
  }, []);

  return (
    <div className="p-6 bg-white border rounded shadow max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">PPS One - Authentication</h2>

      {loading && <p className="text-blue-600">Getting token...</p>}

      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
          {error}
        </div>
      )}

      {tokenData && (
        <div className="bg-gray-100 p-4 rounded font-mono text-sm">
          <p><strong>Access Token:</strong> {tokenData.access_token}</p>
          <p><strong>Token Type:</strong> {tokenData.token_type}</p>
          <p><strong>Expires In:</strong> {tokenData.expires_in} seconds</p>
          {tokenData.scope && (
            <p><strong>Scope:</strong> {tokenData.scope}</p>
          )}
        </div>
      )}

      <button
        onClick={fetchToken}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh Token
      </button>
    </div>
  );
};

export default PPSOneToken;
