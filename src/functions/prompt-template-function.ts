import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../config/open-ai.js";

export const promptTemplateFunction = async () => {
    try {
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "Bạn là trợ lý hữu ích."],
            ["human", "{question}"],
        ]);
        const chain = prompt.pipe(model)
        const question = await chain.invoke({
            question: "Hà Nội hôm nay có mưa không?"
        })
        return question;
    } catch (error) {
        console.error("Error: Prompt Template Function", error);
    }
}