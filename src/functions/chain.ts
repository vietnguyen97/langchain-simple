import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../config/open-ai.js";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const chainBase = async (topic: string) => {
    try {
        const prompt = ChatPromptTemplate.fromTemplate(
            `Viết một giới thiệu ngẵn về ${topic}`,
        )
        const chain = prompt
            .pipe(model)
            .pipe(new StringOutputParser());
        return chain.invoke({ topic});
    } catch (error) {
        console.error("Error: Chain Base", error);
    }
}