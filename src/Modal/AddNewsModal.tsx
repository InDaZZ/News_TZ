import "./AddNewsModal.css";
import { FieldValues } from "react-hook-form";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../Store/Slices/News";
import { NewsItem } from "../types/types";
import { ModalContext } from "../Context/Context";
import { getCurrentDateTime } from "../utils/dateISO";
import NewsEditorForm from "../NewsEditorForm/NewsEditorForm";

function AddNewsModal({ closeModal }: { closeModal: () => void }) {
  const context = useContext(ModalContext);
  const dispatch = useDispatch();
  const onSubmit = (formData: FieldValues) => {
    const newsItem: NewsItem = {
      title: formData?.title,
      source: "User",
      multimedia: formData.multimedia,
      publicationdate: getCurrentDateTime(),
    };
    dispatch(actions.addNewsItem([newsItem]));
    closeModal();
  };
  return (
    <div className="addnewsmodal">
      <button
        className="addnewsmodal__button-back"
        type="button"
        onClick={() => context?.setModal(context.modalPrev)}
      >
        Back to Menu
      </button>
      <NewsEditorForm onSubmit={onSubmit} buttonText="Add"></NewsEditorForm>
      <div></div>
      <div></div>
    </div>
  );
}
export default AddNewsModal;
