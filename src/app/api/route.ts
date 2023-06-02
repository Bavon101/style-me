import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, res) {
  try {

    const form = formidable();
    const fields = {};

    form
    .on('error', (err) => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`error:\n\n${err.message}`);
    })
    .on('field', (field, value) => {
      console.log(field, value);
      fields[field] = value;
    })
    .on('end', () => {
      console.log('-> post done from "end" event');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`received fields:\n\n${fields}`);
    });

  form.parse(req);

    //form.parse(request);

    // const openai = new OpenAIApi(configuration)
    // const formData = await request.formData();

    // // return NextResponse.json(formData);


    // let body = Object.fromEntries(formData);
    // // @ts-ignore
    // console.log("data", body.stream());

  

    //read image from request
    // const response = await openai.createImageEdit(
    //   fs.createReadStream(),
    //   "A cute baby sea otter wearing a beret",
    // );
    return NextResponse.json({message: 'sucesss'});
    // return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("error", error);
  }
}
