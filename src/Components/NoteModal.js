import React, { useState, useEffect } from "react";

const NoteModal = ({ note, onClose, onSave }) => {
  const [updatedNote, setUpdatedNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    if (note) {
      setUpdatedNote({
        title: note.title,
        description: note.description,
        tag: note.tag,
      });
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNote({ ...updatedNote, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...note, ...updatedNote }); // Save the updated note
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-cloudybook-grey border-2 border-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Edit Note</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={updatedNote.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={updatedNote.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block text-sm font-medium">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={updatedNote.tag}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
