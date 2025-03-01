import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai'

const client = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const { keywords } = await req.json();
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json({ message: "Invalid keywords" }, { status: 400 });
    }

    const prompt = `Generate a blog post using the following keywords: ${keywords.join(", ")}. 
    The response should be formatted as a JSON object with "title" and "content" keys.`;

    const response = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawText = response.choices[0]?.message?.content?.trim();

    let generatedPost;
    try {
      generatedPost = JSON.parse(rawText || `{ "title": "Untitled", "content": "No content available." }`);
    } catch (error) {
      generatedPost = { title: "Generated Post", content: rawText || "No content available." };
    }

    return NextResponse.json(generatedPost);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ message: "Error generating post", error }, { status: 500 });
  }
}