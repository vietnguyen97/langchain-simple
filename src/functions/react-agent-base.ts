import { model } from "../config/open-ai.js";

export const ReActAgent = async (input: string) => {
    try {
        const llmWithTools = model.bindTools([]);
        const result = await llmWithTools.invoke(input);
        return result;
    } catch (error) {
        console.error("Error: ReAct Agent", error);
    }
}