

export const callHuggingFace = async (prompt: string) => {
  const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });
  const result = await res.json();
  return result[0]?.generated_text || "";
};
