import React from "react";
import deleteIcon from "../Assets/delete.png";
import editIcon from "../Assets/edit.png";

const NoteItem = ({
  title,
  description,
  tag,
  handleDeleteNote,
  handleEditNote,
  handleViewNote,
}) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        onClick={handleViewNote}
        className="bg-cloudybook-grey card sm:max-w-sm w-80 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gray-800 hover:text-white"
      >
        <div className="card-body flex flex-col gap-5 p-4">
          <p className="card-title truncate">{title}</p>
          <p className="truncate">{description}</p>
          <p className="truncate">Tag: {tag}</p>
          <div className="card-actions gap-3">
            <img
              src={editIcon}
              alt="Edit"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                filter: "invert(1)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleEditNote();
              }}
            />
            <img
              src={deleteIcon}
              alt="Delete"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                filter: "invert(1)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
