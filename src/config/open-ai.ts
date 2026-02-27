import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();

export const model = new ChatOpenAI({
    model: "gpt-4.1-mini", // dùng model hợp lệ
    temperature: 0,
    apiKey: process.env.ANTHROPIC_API_KEY, // có thể bỏ nếu đã dùng dotenv
});
