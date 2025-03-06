import { NewsItem } from "../types/types";

export const groupNewsByDate = (news: NewsItem[]) => {
  return news.reduce((acc, item) => {
    const date = item.publicationdate.split("T")[0];
    if (acc[date]) {
      acc[date].push(item);
    } else {
      acc[date] = [item];
    }
    return acc;
  }, {} as Record<string, NewsItem[]>);
};

export const sortedGroupedNews = (obj: Record<string, NewsItem[]>) => {
  return Object.keys(obj)

    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .reduce((acc, date) => {
      acc[date] = obj[date];
      return acc;
    }, {} as Record<string, NewsItem[]>);
};
