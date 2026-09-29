from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

print("KEY LOADED:", os.getenv("GROQ_API_KEY")[:10])

chat = client.chat.completions.create(
    model="llama-3.1-8b-instant",  # ✅ WORKING MODEL
    messages=[
        {"role": "system", "content": "You are a helpful doctor."},
        {"role": "user", "content": "Tell me about COVID"}
    ]
)

print("AI RESPONSE:\n", chat.choices[0].message.content)