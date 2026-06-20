
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export default async function handler(req, res) {

    if (req.method !== "POST") return res.status(405).end();

    try {
        console.log("prompt received:", req.body.prompt); 
       
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: 1024,
            messages: [{ role: "user", content: req.body.prompt }]
        });
        return res.status(200).send({ result: completion.choices[0].message.content });
    } catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
