import React, { useState, useContext } from "react";
import NoteContext from "../context/note/NoteContext";
import AlertContext from "../context/uiContexts/AlertContext";

const AddNote = () => {
  const { addNote, getNotes } = useContext(NoteContext);
  const { alert, setAlert } = useContext(AlertContext);

  // Local state to manage form inputs
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call addNote function from context
    const success = await addNote(
      note.title,
      note.description,
      note.tag === "" ? "General" : note.tag
    );
    // Reset form after submission
    if (success) {
      console.log("Note Added");
      await getNotes();
      setNote({ title: "", description: "", tag: "", status: true });
      setAlert({
        message: "Note added successfully.",
        visible: true,
        status: true,
      });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 2000);
    } else {
      setAlert({
        message: "Failed to add note.",
        visible: true,
        status: false,
      });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 2000);
    }
  };
  return (
    <div className="container mx-auto py-5 mt-5">
      <div className="h-18 mb-8">
        {alert.visible && (
          <div
            className={`alert ${
              alert.status ? "alert-success" : "alert-error"
            } flex items-center gap-4`}
            role="alert"
            style={{ height: "50px" }}
          >
            <span className="icon-[tabler--circle-check] size-6"></span>
            <p>
              <span className="text-lg font-semibold">Success: </span>
              {alert.message}
            </p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-cloudybook-grey input input-bordered w-full mt-1"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="bg-cloudybook-grey textarea textarea-bordered w-full mt-1"
            value={note.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-gray-700"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            className="bg-cloudybook-grey input input-bordered w-full mt-1"
            value={note.tag}
            onChange={handleChange}
          />
        </div>
        <div className=" flex gap-4 my-5">
          <button type="submit" className="btn btn-gradient btn-success">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
