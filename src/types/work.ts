export type WorkAchievement = {
  title: string;
  detail?: string;
  url?: string;
};

export type WorkItemData = {
  title: string;
  itemIconPath?: string;
  url: string;
  description: string;
  achievements?: WorkAchievement[];
};
