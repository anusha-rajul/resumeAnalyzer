import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
})

export async function analyzeResume(resume, jobDesc) {
    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: 'system',
                content: ' You are an ATS resume analyzer. Always respond with valid JSON only. No extra text.'
            },
        
            {
                role: "user",
                content: `
                RESUME:
                ${resume}

                JOB DESCRIPTION:
                ${jobDesc}

                STRICT RULES FOR KEYWORDS:
                - "matchedKeywords" = skills/technologies that appear in BOTH the resume AND the job description
                - "missingKeywords" = skills/technologies that appear in the job description BUT ARE NOT in the resume
                - NEVER put a keyword in "missingKeywords" if it exists anywhere in the resume
                - NEVER put a keyword in "matchedKeywords" if it does not exist in the job description
                - Only extract keywords from the JOB DESCRIPTION — do not invent keywords
                - Keywords should be technical skills, tools, frameworks, languages only (e.g. React, Node.js, MongoDB)

                Return ONLY this JSON structure, nothing else:
                {
                "atsScore": <number 0-100 based on how well resume matches job description>,
                "matchedKeywords": [<keywords in BOTH resume and JD>],
                "missingKeywords": [<keywords in JD but NOT in resume>],
                "suggestions": [<3-5 specific actionable improvements to better match this JD>],
                "sectionScores": {
                    "skills": <0-100>,
                    "experience": <0-100>,
                    "education": <0-100>
                }
                }`
            }
        ]
    })

    const text = response.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, "").trim()
    return JSON.parse(cleaned)
}