import { OpenAI } from "openai";

export async function sendGPT(SelectType: string, newQuestion: string) {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  //ChatGPT用の型定義
  type Param = {
    type: string;
    properties: {};
  };

  type Message = {
    model: string;
    messages: { role: "user" | "system" | "assistant"; content: string }[];
    functions: { name: string; description: string; parameters: Param }[];
  };

  const completeOptions: Message = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system", // 'user' | 'assistant' | 'system'
        content: "あなたは優秀なアシスタントAIです。", // string
      },

      {
        role: "user", // 'user' | 'assistant' | 'system'
        content:
          "次の処理を図解する" +
          SelectType +
          "をMermaid構文で書いて下さい。" +
          newQuestion,
        // "カタカナや漢字は英語に変換せずに出力してください。更に出来るだけ「Note right of」を使ってください。
      },
    ],
    functions: [
      {
        name: "mermaid_text",
        description:
          "レスポンス内のマーメイド構文を抽出し、JSON形式で処理します。",
        parameters: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "出力内のマーメイド構文の部分です",
            },
          },
        },
      },
    ],
  };

  const chatresponse = await openai.chat.completions.create(completeOptions);

  if (chatresponse["choices"][0]["message"]["function_call"] != undefined) {
    const answer =
      chatresponse["choices"][0]["message"]["function_call"]["arguments"];
    //answer : json string
    const answerObject = JSON.parse(answer);

    console.log("[in]", answerObject);
    let EditAnswer = answerObject.text;
    /*
    EditAnswer = EditAnswer.replace(/"text": "/, "");
    EditAnswer = EditAnswer.replace(/text": `/, "");
    EditAnswer = EditAnswer.replace("{", "");
    EditAnswer = EditAnswer.replace("}", "");
    EditAnswer = EditAnswer.replace(/"/, "");
    EditAnswer = EditAnswer.replace(/`/, "");
    EditAnswer = EditAnswer.replace(/[/]/, "");
    EditAnswer = EditAnswer.replace(/[+]/g, "");
    //CRLF -> LFに統一
    EditAnswer = EditAnswer.replace(/\r\n?/g, "\n");
    //EditAnswer = EditAnswer.replace(/\\n/g, "1234567890");
    //EditAnswer = EditAnswer.replace(/\n/g, "1234567890");
    */
    console.log("[out]", EditAnswer);
    return EditAnswer;
  }
  return "";

  //------------------------------------------------
}
