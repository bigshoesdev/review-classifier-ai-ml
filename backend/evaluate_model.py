import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    ConfusionMatrixDisplay
)

def evaluate_model(file_path: str):
    # Load CSV
    df = pd.read_csv(file_path)
    if 'label' not in df.columns or 'prediction' not in df.columns:
        raise ValueError("CSV must contain 'label' and 'prediction' columns.")

    y_true = df['label']
    y_pred = df['prediction']

    # Metrics
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred, average='binary', pos_label='positive')
    recall = recall_score(y_true, y_pred, average='binary', pos_label='positive')
    f1 = f1_score(y_true, y_pred, average='binary', pos_label='positive')

    # Print results
    print("📊 Model Evaluation Results:")
    print(f"✅ Accuracy:  {accuracy:.4f}")
    print(f"✅ Precision: {precision:.4f}")
    print(f"✅ Recall:    {recall:.4f}")
    print(f"✅ F1 Score:  {f1:.4f}")

    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred, labels=['positive', 'negative'])
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['positive', 'negative'])
    disp.plot(cmap='Blues')
    plt.title("Confusion Matrix")
    plt.show()  # 👈 show in a GUI window

if __name__ == "__main__":
    evaluate_model("sample_predictions.csv")
