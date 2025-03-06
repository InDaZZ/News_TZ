export interface NewsItem {
  title: string;
  source: string;
  multimedia: string;
  publicationdate: string;
}
export type sortedNewsItem = Record<string, NewsItem[]>;
