import type { WorkItemData } from "@/types/work";

const resolveApiEndpoint = () => {
  const endpoint = process.env.API_ENDPOINT
    || process.env.NEXT_PUBLIC_API_ENDPOINT
    || (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "");

  return endpoint.replace(/\/+$/, "");
};

export const fetchWorks = async (): Promise<WorkItemData[]> => {
  const apiEndpoint = resolveApiEndpoint();

  const fallbackDataList: WorkItemData[] = [
    {
      title: "Research",
      url: "https://github.com/rikutokanzaki/",
      description: "Operating a dynamic multi-layered honeypot system using a reverse proxy.",
    },
  ];

  if (!apiEndpoint) {
    return fallbackDataList;
  }

  try {
    const response = await fetch(`${apiEndpoint}/works`, {
      method: "GET",
    });

    if (!response.ok) {
      return fallbackDataList;
    }

    const responseJson = await response.json();

    return responseJson as WorkItemData[];
  } catch {
    return fallbackDataList;
  }
};
