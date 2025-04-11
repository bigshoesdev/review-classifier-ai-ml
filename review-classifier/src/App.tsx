import React, { useState } from "react";
import TrainModel from "./components/TrainModel";
import SentimentForm from "./components/SentimentForm";
import GPTChat from "./components/GPTChat";

const App = () => {
  const [tab, setTab] = useState<"train" | "sentiment" | "chat" | "evaluate">(
    "train"
  );

  const tabs = [
    { id: "train", label: "Train Model" },
    { id: "sentiment", label: "Sentiment Check" },
    { id: "chat", label: "Chat with GPT" },
    { id: "evaluate", label: "Evaluate Model" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Navigation */}
        <nav className="flex justify-center bg-blue-50 p-4 space-x-4">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  tab === id
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-blue-600 hover:bg-blue-100 border border-blue-200"
                }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="p-6">
          {tab === "train" && <TrainModel />}
          {tab === "sentiment" && <SentimentForm />}
          {tab === "chat" && <GPTChat />}
        </div>
      </div>
    </div>
  );
};

export default App;
