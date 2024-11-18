import OpenAI from "openai";

const api_Key = process.env.REACT_APP_OPENAI_API_KEY;

if (!api_Key) {
  console.error(
    "OpenAI API key is missing. Make sure REACT_APP_OPENAI_API_KEY is set."
  );
}
const openai = new OpenAI({
  apiKey: api_Key,
  dangerouslyAllowBrowser: true,
});

export default openai;
