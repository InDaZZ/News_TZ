import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupNewsByDate, sortedGroupedNews } from "../../utils/sortNews";
import { NewsItem } from "../../types/types";
const storageNews = localStorage.getItem("News");
const initialState: Record<string, NewsItem[]> = storageNews
  ? JSON.parse(storageNews)
  : {};
const newsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {
    allNews: (state, action: PayloadAction<NewsItem[]>) => {
      const groupedNews = groupNewsByDate(action.payload);
      localStorage.setItem("News", JSON.stringify({ ...groupedNews }));
      return { ...state, ...groupedNews };
    },
    addNewsItem: (state, action: PayloadAction<NewsItem[]>) => {
      const groupedNews: Record<string, NewsItem[]> = groupNewsByDate(
        action.payload
      );

      Object.keys(groupedNews).forEach((key) => {
        if (key in state) {
          console.log(sortedGroupedNews(state));
          state[key] = [...groupedNews[key], ...state[key]];
        } else {
          console.log(sortedGroupedNews(state));
          state[key] = groupedNews[key];
        }
      });
      localStorage.setItem("News", JSON.stringify({ ...state }));
    },
    deleteNewsItem: (state, action: PayloadAction<NewsItem>) => {
      const groupedNews = groupNewsByDate([action.payload]);
      Object.keys(groupedNews).forEach((key) => {
        if (key in state) {
          const newsIndex = state[key].findIndex(
            (news) =>
              news.title === action.payload.title &&
              news.publicationdate === action.payload.publicationdate
          );
          if (newsIndex !== -1) {
            state[key].splice(newsIndex, 1);
            if (state[key].length === 0) {
              delete state[key];
            }
          }
        }
      });
      localStorage.setItem("News", JSON.stringify({ ...state }));
    },
    updateNewsItem: (
      state,
      action: PayloadAction<Record<string, NewsItem[]>>
    ) => {
      const updatedGroupedNews = action.payload;

      // Перебираем ключи обновленных новостей
      Object.keys(updatedGroupedNews).forEach((key) => {
        if (key in state) {
          updatedGroupedNews[key].forEach((updatedNewsItem) => {
            const newsIndex = state[key].findIndex(
              (news) =>
                news.source === updatedNewsItem.source &&
                news.publicationdate === updatedNewsItem.publicationdate
            );

            if (newsIndex !== -1) {
              // Обновляем найденную новость в массиве
              console.log("find");
              state[key][newsIndex] = updatedNewsItem;
            }
          });
        }
      });

      // Сохраняем обновленный state в localStorage
      localStorage.setItem("News", JSON.stringify({ ...state }));
    },
  },
});

export const { actions, reducer } = newsSlice;
