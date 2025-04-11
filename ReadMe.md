
# 📚 AI-Powered NLP Toolkit (Full Stack)

This project provides a web-based interface and backend for:

- ✅ **Training** a logistic regression text classifier from CSV  
- ✅ **Sentiment analysis** using a HuggingFace model  
- ✅ **GPT chat** using OpenAI's `gpt-3.5-turbo`  
- ✅ **Model evaluation** with metrics and confusion matrix  
- ✅ **Text summarization** using `facebook/bart-large-cnn`

---

## 🧠 Features

| Feature              | Tech Stack                                  |
|----------------------|---------------------------------------------|
| Train classifier     | Flask + scikit-learn                        |
| Evaluate model       | `evaluate_model.py` + Matplotlib            |
| Sentiment check      | HuggingFace `distilbert-base-uncased-finetuned-sst-2-english` |
| Chat with GPT        | OpenAI `gpt-3.5-turbo`                       |
| Summarize text       | HuggingFace `facebook/bart-large-cnn`       |
| Frontend UI          | React + TypeScript + Tailwind + Vite        |

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd backend/
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
```

Create a `.env`:

```
OPENAI_API_KEY=sk-...
```

Run the Flask app:

```bash
python app.py
```

### 🌐 Frontend Setup

```bash
cd frontend/
npm install
npm run dev
```

Access it at: `http://localhost:5173`

---

## 📁 Project Structure

```
/backend
  ├── app.py                  # Flask API routes
  ├── model_trainer.py        # Classifier training logic
  ├── chatgpt_handler.py      # GPT logic and logging
  ├── evaluate_model.py       # Model evaluation + confusion matrix
  ├── summarize_text.py       # Bonus: summarization script
  ├── chat_log.txt            # GPT conversation logs
  └── .env

/frontend
  ├── src/
  │   ├── App.tsx             # Tabbed interface
  │   ├── components/
  │   │   ├── TrainModel.tsx
  │   │   ├── EvaluateModel.tsx
  │   │   ├── GPTChat.tsx
  │   │   └── SentimentForm.tsx
```

---

## 📊 Sample Datasets

CSV format for `/train` and `/evaluate-model`:

```csv
text,label
"This product is amazing!",positive
"Terrible service.",negative
```

```csv
text,label,prediction
"Awesome experience",positive,positive
"Not worth it",negative,positive
```

---

## 🧪 Run Standalone Evaluation

```bash
python evaluate_model.py
# Uses sample_predictions.csv and shows metrics + confusion matrix
```

---

## 💡 Bonus: Summarize Text

```bash
python summarize_text.py
# Uses facebook/bart-large-cnn to summarize long_text
```