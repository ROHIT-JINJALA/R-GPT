import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-5-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500,
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );
    const data = await response.json();
    // console.log(data.choices[0].message.content);
    if (!data.choices || data.choices.length === 0) {
      console.error("OpenRouter error:", data);
      throw new Error("No choices returned from OpenRouter API");
    }
    return data.choices[0].message.content; //reply
  } catch (err) {
    console.log("Error in getOpenaiAPIResponse: ", err);
    return null;
  }
};

export default getOpenAIAPIResponse;
