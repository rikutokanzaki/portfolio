import type { StoryItemData } from "@/types/story";

export const fetchStories = async (): Promise<StoryItemData[]> => {
  const apiEndpoint = "/api";

  const fallbackDataList: StoryItemData[] = [
    {
      title: "TOWN Inc.",
      period: "May 2025 - Present",
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
