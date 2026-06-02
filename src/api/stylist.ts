import type { Product } from "@/constants/mockData";

type StylistResponse = {
  answer: string;
  recommendedProductIds: string[];
};

export const getStylistRecommendations = async (
  query: string,
  products: Product[]
): Promise<StylistResponse> => {
  const response = await fetch("/api/ai/stylist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
      })),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch AI recommendations.");
  }

  return (await response.json()) as StylistResponse;
};
