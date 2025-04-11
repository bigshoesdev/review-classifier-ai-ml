import pandas as pd
import string
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score


def preprocess_text(text: str) -> str:
    text = text.lower()
    text = re.sub(f"[{re.escape(string.punctuation)}]", "", text)
    return text.strip()


def train_and_evaluate(df: pd.DataFrame) -> dict:
    # Ensure required columns
    if 'text' not in df.columns or 'label' not in df.columns:
        raise ValueError("CSV must contain 'text' and 'label' columns.")

    df['clean_text'] = df['text'].apply(preprocess_text)

    # Split
    X_train, X_test, y_train, y_test = train_test_split(
        df['clean_text'], df['label'], test_size=0.2, random_state=42
    )

    # Vectorize and train
    vectorizer = TfidfVectorizer()
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    model = LogisticRegression()
    model.fit(X_train_vec, y_train)

    # Evaluate
    y_pred = model.predict(X_test_vec)
    report = classification_report(y_test, y_pred, output_dict=True)
    accuracy = accuracy_score(y_test, y_pred)

    return {
        "accuracy": accuracy,
        "classification_report": report
    }
