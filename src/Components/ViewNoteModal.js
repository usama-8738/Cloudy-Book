import React from "react";

const ViewNoteModal = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="text-white bg-cloudybook-grey border-2 border-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">View Note</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-medium">Title</h4>
          <p>{note.title}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-medium">Description</h4>
          <div className="overflow-y-auto max-h-40">
            <textarea
              className="textarea textarea-bordered w-full h-24 overflow-y-auto"
              readOnly
              value={note.description}
            />
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-medium">Tag</h4>
          <p>{note.tag}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;
