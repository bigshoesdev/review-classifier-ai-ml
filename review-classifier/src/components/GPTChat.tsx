import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../constants";
import { ChatResponse } from "../types";

const GPTChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post<ChatResponse>(
        `${API_BASE_URL}${ENDPOINTS.CHAT}`,
        { prompt }
      );
      setResponse(res.data.response);
    } catch {
      setResponse("Error: failed to contact GPT endpoint.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chat with GPT</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send to GPT"}
        </button>
      </form>

      {response && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <strong className="text-blue-700">GPT:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default GPTChat;
