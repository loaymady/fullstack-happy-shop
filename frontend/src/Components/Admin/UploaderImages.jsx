/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from "react";
import avatar from "../../images/avatar.png";

const UploaderImages = ({
  existingImages,
  setExistingImages,
  selectedImages,
  setSelectedImages,
}) => {
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    selectedFilesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImages((previousImages) => [
          ...previousImages,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    });

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const deleteHandler = (index, isExisting) => {
    if (isExisting) {
      setExistingImages((previousImages) =>
        previousImages.filter((_, i) => i !== index)
      );
    } else {
      setSelectedImages((previousImages) =>
        previousImages.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <section className="uploadImgs">
      {Number(
        (existingImages ? existingImages.length : 0) + selectedImages.length
      ) < 5 ? (
        <label>
          <img
            src={avatar}
            alt="fzx"
            height="100px"
            width="120px"
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png, image/jpeg, image/webp"
          />
          <br />
        </label>
      ) : null}

      {Number(
        (existingImages ? existingImages.length : 0) + selectedImages.length
      ) > 5 ? (
        <p className="error">
          غير مسموح بأكثر من 5 صور! <br />
          <span>
            برجاء حذف
            <b>
              {(existingImages ? existingImages.length : 0) +
                selectedImages.length -
                5}
            </b>
            صورة منهم
          </span>
        </p>
      ) : null}

      <div className="images">
        {existingImages &&
          existingImages.map((image, index) => (
            <div key={index} className="image">
              <img src={image} alt="upload" />
              <button type="button" onClick={() => deleteHandler(index, true)}>
                X
              </button>
              <p>{index + 1}</p>
            </div>
          ))}
        {selectedImages.map((image, index) => (
          <div
            key={index + (existingImages ? existingImages.length : 0)}
            className="image"
          >
            <img src={image} alt="upload" />
            <button type="button" onClick={() => deleteHandler(index, false)}>
              X
            </button>
            <p>{index + 1 + (existingImages ? existingImages.length : 0)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(UploaderImages);
