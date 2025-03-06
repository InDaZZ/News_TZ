import { FC } from "react";
import NewsEditorForm from "../NewsEditorForm/NewsEditorForm";
import { NewsItem } from "../types/types";
import { FieldValues } from "react-hook-form";
import { actions } from "../Store/Slices/News";
import { groupNewsByDate } from "../utils/sortNews";
import { useDispatch } from "react-redux";
interface IEditNewsModal {
  closeModal: () => void;
  news: NewsItem;
}
const EditNewsModal: FC<IEditNewsModal> = (props) => {
  const { news, closeModal } = props;
  const dispatch = useDispatch();
  const onSubmit = (formData: FieldValues) => {
    const newsItem: NewsItem = {
      title: formData?.title,
      source: "User",
      multimedia: formData.multimedia,
      publicationdate: news.publicationdate,
    };

    dispatch(actions.updateNewsItem(groupNewsByDate([newsItem])));
    closeModal();
  };
  return (
    <div className="addnewsmodal">
      <NewsEditorForm
        onSubmit={onSubmit}
        buttonText="Save"
        news={news}
      ></NewsEditorForm>
    </div>
  );
};

export default EditNewsModal;
