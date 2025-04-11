from transformers import pipeline

# Your long paragraph
long_text = """
The Amazon rainforest, also known as Amazonia, is one of the most biodiverse and expansive tropical rainforests on Earth.
Spanning over 5.5 million square kilometers, it covers parts of nine South American countries, with the majority located in Brazil.
The rainforest is home to more than 3 million species of plants and animals, and it plays a crucial role in regulating the Earth's climate.
However, the Amazon faces significant threats from deforestation, illegal logging, and climate change, which have accelerated in recent years.
Conservation efforts from governments, NGOs, and indigenous communities continue to work toward sustainable solutions that balance ecological protection with economic development.
"""

# Load the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Generate summary
summary = summarizer(long_text, max_length=130, min_length=30, do_sample=False)

# Print result
print("📚 Summary:\n")
print(summary[0]['summary_text'])
