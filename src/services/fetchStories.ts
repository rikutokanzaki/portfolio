import type { StoryItemData } from "@/types/story";

const resolveApiEndpoint = () => {
  const endpoint = process.env.API_ENDPOINT
    || process.env.NEXT_PUBLIC_API_ENDPOINT
    || "http://localhost:5000";

  return endpoint.replace(/\/+$/, "");
};

export const fetchStories = async (): Promise<StoryItemData[]> => {
  const apiEndpoint = resolveApiEndpoint();

  const fallbackDataList: StoryItemData[] = [
    {
      title: "TOWN Inc.",
      period: "Sept. 2025 - May 2026",
      description: "Responsible for building AI-powered Voice RAG environments and verifying document consistency as a SaaS engineer.",
    },
  ];

  if (!apiEndpoint) {
    return fallbackDataList;
  }

  try {
    const response = await fetch(`${apiEndpoint}/stories`, {
      method: "GET",
    });

    if (!response.ok) {
      return fallbackDataList;
    }

    const responseJson = await response.json();

    return responseJson as StoryItemData[];
  } catch {
    return fallbackDataList;
  }
};
