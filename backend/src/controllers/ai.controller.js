import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

export const getSuggestion = async (req, res) => {
    try {
        if(!req.body.prompt ){
            res.status(400).json({
                message : 'Prompt is required for suggestions.'
            })
        }
        const result = await model.generateContent(req.body.prompt);

        res.status(200).json({
            message: 'AI suuggestions',
            suggestion: result.response.text()
        })

    } catch (e) {
        res.status(500).json({
            message: 'getting AI suggestions failed',
            error: e.message
        })
    }
}