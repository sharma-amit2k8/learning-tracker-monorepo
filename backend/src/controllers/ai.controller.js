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

        //to be enabled later for ai to work
        // const result = await model.generateContent(req.body.prompt);

        //use hardcoded data for now 
        let result = {}

        if (req.body.prompt?.toLowerCase().includes('angular')) {
            result =
            'Focus on Angular Signals, Components, and Services today. Complete one feature before moving to another.';
        } else if (req.body.prompt?.toLowerCase().includes('backend')) {
            result =
            'Work on Express routes, controllers, and MongoDB integration. Keep APIs small and test them frequently.';
        } else if (req.body.prompt?.toLowerCase().includes('motivate')) {
            result =
            'You are making steady progress. Consistency beats intensity. Keep building your project one step at a time.';
        } else {
            result =
            'Continue working on your Learning Tracker App. Complete the current roadmap day before adding new features.';
        }

        res.status(200).json({
            message: 'AI suuggestions',
            // suggestion: result.response.text()
            suggestion : result
        })

    } catch (e) {
        res.status(500).json({
            message: 'getting AI suggestions failed',
            error: e.message
        })
    }
}