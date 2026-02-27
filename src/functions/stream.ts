import { model } from "../config/open-ai.js";

export const StreamBasic = async (input: string): Promise<any> => {
    try {
        const stream = await model.stream(input);
        return stream;
    } catch (error) {
        console.error("Error: StreamBasic", error);
    }
}
