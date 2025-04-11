import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env file
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)


def get_chatgpt_response(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()


def log_conversation(prompt: str, response: str, log_file: str = "chat_log.txt"):
    with open(log_file, "a", encoding="utf-8") as f:
        f.write("User:\n" + prompt + "\n")
        f.write("GPT:\n" + response + "\n")
        f.write("-" * 40 + "\n")
