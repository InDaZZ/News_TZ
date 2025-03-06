import { useEffect, useState, useId } from "react";
import { actions } from "../Store/Slices/News";
import NewsItem from "../NewsItem/NewsItem";
import { debounce } from "../utils/debounce";
import { FakeData } from "../DATA/DataFake";
import { sortedGroupedNews } from "../utils/sortNews";
import { EImageSize } from "./model/ImageSaze";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/types/reduxTypes";
import Modal from "../Modal/Modal";
import "./News.css";

const News = () => {
  const dispatch = useDispatch();
  const newsByDate = useSelector((state: RootState) => state.News);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [size, setSize] = useState<EImageSize | undefined>(undefined);
  const uniqueNewsId = useId();

  useEffect(() => {
    const updateSize = () => {
      if (screenWidth <= 375) {
        setSize(EImageSize["mobile_small"]);
      } else {
        setSize(EImageSize["mobile_medium"]);
      }
    };

    updateSize();
  }, [screenWidth]);

  useEffect(() => {
    !localStorage.getItem("News") && dispatch(actions.allNews(FakeData));
    const handleResize = debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="newspage">
      {Object.entries(sortedGroupedNews(newsByDate)).map(
        ([date, newsItems]) => (
          <div key={date}>
            <h2 className="newspage__date">News for {date}</h2>

            <ul className="newspage__tape">
              {newsItems.map((news) => {
                return (
                  <NewsItem
                    news={news}
                    key={`uniqueNewsId+${news.multimedia}+${news.publicationdate}+${news.source}`}
                    size={size as string}
                  ></NewsItem>
                );
              })}
            </ul>
          </div>
        )
      )}
      <Modal></Modal>
    </div>
  );
};

export default News;
