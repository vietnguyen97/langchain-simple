import { createAgent, tool } from "langchain";
import * as z from "zod";
import { model } from "../config/open-ai.js";

const getWeather = tool(
    ({ city }: { city: any }) => {
        console.log(1111, city);
        return `The weather in ${city}`;
    },
    {
        name: "get_weather",
        description: "Get the weather for a given city",
        schema: z.object({
            city: z.string(),
        }),
    },
);

export const agentWeather = createAgent({
    model: model,
    tools: [getWeather],
})