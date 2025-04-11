import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../constants";
import { TrainResponse } from "../types";

const TrainModel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<TrainResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post<TrainResponse>(
        `${API_BASE_URL}${ENDPOINTS.TRAIN}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setReport(res.data);
    } catch {
      setError("Failed to train model.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Train Classifier</h2>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Training..." : "Train"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {report && (
        <div className="mt-4 text-sm">
          <p>
            <strong>Accuracy:</strong> {(report.accuracy * 100).toFixed(2)}%
          </p>
          <pre className="bg-gray-100 p-2 mt-2 rounded overflow-auto text-xs">
            {JSON.stringify(report.classification_report, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TrainModel;
