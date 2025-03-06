import { useDispatch } from "react-redux";
import "./ConfirmModal.css";
import { FC } from "react";
import { actions } from "../Store/Slices/News";
import LazyImage from "../LazyImage/LazyImage";
import DefaultImage from "../images/default_news.webp";
import { NewsItem } from "../types/types";
interface IpropsConfirmModal {
  closeModal: () => void;
  size: string;
  date: string;
  news: NewsItem;
}
const ConfirmModal: FC<IpropsConfirmModal> = (props) => {
  const { closeModal, news, date, size } = props;
  const dispatch = useDispatch();
  const deleteNews = () => {
    dispatch(actions.deleteNewsItem(news));
    closeModal();
  };
  return (
    <div className="confirm-modal">
      <span className="confirm-modal__notification">
        You sure you want delete?
      </span>
      <div className="confirm-modal__news">
        <LazyImage
          src={news.multimedia ? news.multimedia : DefaultImage}
          alt="image"
          loading="lazy"
          className={`newsitem__image newsitem__image${size} confirm-modal__image`}
        ></LazyImage>
        <h3 className="confirm-modal__news-title">{news.title}</h3>
        <p className="confirm-modal__news-date">{date}</p>
      </div>
      <div className="confirm-modal__buttons-wraper">
        <button
          type="submit"
          className="confirm-modal__submit"
          onClick={deleteNews}
        >
          Yes
        </button>
        <button
          type="button"
          className="confirm-modal__submit"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  );
};
export default ConfirmModal;
