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
      achievements: [
        {
          title: "Observation of Attack Behavior Using a Dynamic Multi-layer Honeypot System",
          detail: "IEICE Technical Committee on Network Systems",
          url: "https://ken.ieice.org/ken/paper/20251010WcnJ/",
        },
        {
          title: "A Multi-layer Honeypot System with Dynamic Interaction-level Control Based on Attack Behaviors",
          detail: "2026 IEICE General Conference",
          url: "https://pub.confit.atlas.jp/ja/event/general2026/presentation/B-6-70",
        },
      ]
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
