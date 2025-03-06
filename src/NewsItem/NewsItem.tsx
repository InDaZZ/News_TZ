import { FC, memo, useContext } from "react";
import "./NewsItem.css";
import type { NewsItem } from "../types/types";
import LazyImage from "../LazyImage/LazyImage";
import { formatDate } from "../utils/formatDate";
import DefaultImage from "../images/default_news.webp";
import DeleteIcon from "../images/trash-svgrepo-com.svg";
import EditIcon from "../images/pencil-square-svgrepo-com.svg";
import ConfirmModal from "../Modal/ConfirmModal";
import EditNewsModal from "../Modal/EditNewsModal";
import { ModalContext } from "../Context/Context";

interface INewsItemProp {
  news: NewsItem;

  size: string;
}
const NewsItem: FC<INewsItemProp> = (props) => {
  const { news, size } = props;
  const context = useContext(ModalContext);

  return (
    <li className="newsitem">
      {news.source === "User" && (
        <div className="newsitem__control">
          <button
            className="newsitem__button-control"
            onClick={() =>
              context?.setModal(
                <ConfirmModal
                  closeModal={() => context.closeModal()}
                  date={formatDate(news.publicationdate)}
                  news={news}
                  size={size}
                />
              )
            }
          >
            <img
              src={DeleteIcon}
              alt=""
              className="newsitem__control-icon"
            ></img>
          </button>
          <button
            className="newsitem__button-control"
            onClick={() =>
              context?.setModal(
                <EditNewsModal
                  closeModal={() => context.closeModal()}
                  news={news}
                />
              )
            }
          >
            <img src={EditIcon} alt="" className="newsitem__control-icon"></img>
          </button>
        </div>
      )}

      <p className="newsitem__source">{news.source}</p>
      <LazyImage
        src={news.multimedia ? news.multimedia : DefaultImage}
        alt="image"
        loading="lazy"
        className={`newsitem__image newsitem__image${size}`}
      ></LazyImage>
      <div className="newsitem__text-wraper">
        <p className="newsitem__title">{news.title}</p>
        <time className="newsitem__date">
          {formatDate(news.publicationdate)}
        </time>
      </div>
    </li>
  );
};

export default memo(NewsItem);
