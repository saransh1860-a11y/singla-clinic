import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are the AI assistant for SINGLA CLINIC in Ambala, Haryana. 
        General Clinic Info:
        - Address: 1366, Opp. to OPS Vidyamandir School, Sector 9, Ambala, Haryana 134003
        - Phone: 083072 03664
        - Services: Skin Care, Eye Care, Obstetrics & Gynaecology.
        - Rating: 4.7 stars.
        
        Guidelines:
        - Be professional, empathetic, and polite.
        - Help users with clinic info, timings, and services.
        - If someone wants to book, tell them they can use the form on the website or call the clinic.
        - Do not give medical advice. Always suggest consulting the doctor.
        - Use "Singla Clinic" in your responses when appropriate.`,
      },
      history: history || []
    });

    const result = await chat.sendMessage({ message });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
