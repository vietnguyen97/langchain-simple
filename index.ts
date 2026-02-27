import express, { Request } from 'express';
import { agentWeather } from './src/functions/get-weather.js';
import { chainBase } from './src/functions/chain.js';
import { ReActAgent } from './src/functions/react-agent-base.js';
import { StreamBasic } from './src/functions/stream.js';

const app = express();
const port: number = 3000;

app.get('/', (req: Request, res: any) => {
    res.send('API working');
})
app.get('/weather', async (req: Request, res: any) => {
    try {
        const result = await agentWeather.invoke({
            messages: [
                {
                    role: "user",
                    content: "What is the weather in Vietnam?",
                },
            ]
        })
        res.json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while processing your request.");
    }
});

app.get('/chain-base', async (req: Request, res: any) => {
    try {
        const chain = await chainBase("langchain");
        res.json(chain);
    } catch (error) {
        console.error("Error: chain-base", error);
        res.status(500).send("An error occurred while processing your request.");
    }
})

app.get('/react-agent', async (req: Request, res: any) => {
    try {
        const chain = await ReActAgent('What is the capital og Vietnam?');
        if (chain) {
            res.json(chain.content);
        }
        res.status(500).send("An error occurred while processing your request.");
    } catch (error) {
        console.error("Error: ReAct Agent", error);
        res.status(500).send("An error occurred while processing your request.");
    }
})

app.get("/stream", async (req, res) => {
    const stream = await StreamBasic("What is the capital of Vietnam?");
    for await (const chunk of stream) {
        res.write(chunk.content ?? "");
    }
    res.end();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});