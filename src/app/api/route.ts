import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(request: Request) {
  try {
    const openai = new OpenAIApi(configuration);
    // read image from request
    const response = await openai.createImageEdit(
          // @ts-ignore
      fs.createReadStream("/Users/jomasim/WebProjects/style-me/src/app/api/sample.png"),    
      "A cute baby sea otter wearing a beret",
    );
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("error", error);
  }
}
