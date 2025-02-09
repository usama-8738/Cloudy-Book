import React from "react";

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
            <i
              className="fa-regular fa-pen-to-square"
              onClick={(e) => {
                e.stopPropagation();
                handleEditNote();
              }}
              style={{ color: "green" }}
            >
              <span className="sr-only">Edit Note</span>
            </i>
            <i
              className="fa-solid fa-trash"
              style={{ color: "red" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote();
              }}
            >
              <span className="sr-only">Delete Note</span>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
