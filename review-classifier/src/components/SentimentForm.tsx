import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../constants";
import { SentimentResponse } from "../types";

const SentimentForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post<SentimentResponse>(
        `${API_BASE_URL}${ENDPOINTS.SENTIMENT}`,
        { text }
      );
      setResult(res.data);
    } catch {
      setResult({ label: "ERROR", score: 0 });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter a sentence..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Check Sentiment"}
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <p>
            <strong>Label:</strong> {result.label}
          </p>
          <p>
            <strong>Score:</strong> {(result.score * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default SentimentForm;
