import { FC, useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import "./NewsEditorForm.css";
import { NewsItem } from "../types/types";

interface INewsEditorFormProps {
  onSubmit: (formData: FieldValues) => void;
  buttonText: string;
  news?: NewsItem;
}

const NewsEditorForm: FC<INewsEditorFormProps> = (props) => {
  const { onSubmit, buttonText, news } = props;
  const { register, handleSubmit, getValues, setValue } = useForm();

  useEffect(() => {
    if (news) {
      setValue("title", news.title || "");
      setValue("multimedia", news.multimedia || "");
    }
  }, [news, setValue]);

  const sub = () => {
    const formData = getValues();
    onSubmit(formData);
  };

  return (
    <div className="newseditor__form-container">
      <form onSubmit={handleSubmit(sub)} className="newseditor__form">
        <label className="newseditor__label">
          <h3 className="newseditor__input-title">Short Description</h3>
          <textarea
            className="newseditor__input newseditor__input_textarea"
            placeholder="Title"
            {...register("title", {
              required: true,
            })}
          ></textarea>
        </label>
        <label className="newseditor__label">
          <h3 className="newseditor__input-title">Image URL</h3>
          <input
            className="newseditor__input"
            placeholder="Image Link"
            {...register("multimedia", {
              required: true,
            })}
          ></input>
        </label>

        <button type="submit" className="newseditor__submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default NewsEditorForm;
