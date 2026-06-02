type StyleAdviceResponse = {
  answer: string;
};

export const getStyleAdvice = async (question: string): Promise<StyleAdviceResponse> => {
  const response = await fetch("/api/ai/stylist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: question,
      products: [],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch style advice.");
  }

  const data = (await response.json()) as { answer: string };
  return { answer: data.answer };
};

