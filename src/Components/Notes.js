import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/note/NoteContext";
import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal";
import ViewNoteModal from "./ViewNoteModal";
import AlertContext from "../context/uiContexts/AlertContext";

const Notes = () => {
  const { noteState, getNotes, deleteNote, editNote } = useContext(NoteContext);
  const { setAlert } = useContext(AlertContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [sortOption, setSortOption] = useState("date-asc");
  const [visibleNotesCount, setVisibleNotesCount] = useState(12);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Apply search and sort whenever notes, searchQuery, or sortOption changes
    let notes = [...noteState.notes];

    if (searchQuery) {
      notes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "alphabet-asc") {
      notes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabet-desc") {
      notes.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "date-asc") {
      notes.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "date-desc") {
      notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredNotes(notes);
  }, [noteState.notes, searchQuery, sortOption]);

  const handleDeleteNote = async (id) => {
    console.log("Deleting note with id:", id); // Debugging
    const success = await deleteNote(id);
    if (success) {
      setAlert({
        message: "Note deleted successfully.",
        visible: true,
        status: true,
      });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 2000);
    } else {
      setAlert({
        message: "Failed to delete note.",
        visible: true,
        status: false,
      });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 2000);
    }
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (updatedNote) => {
    const success = await editNote(updatedNote);
    setIsModalOpen(false);
    if (success) {
      setAlert({
        message: "Note updated successfully.",
        visible: true,
        status: true,
      });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 2000);
    } else {
      setAlert({
        message: "Failed to update note.",
        visible: true,
        status: false,
      });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 2000);
    }
  };

  const handleViewNote = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleNotesCount((prevCount) => prevCount + 6);
  };

  const handleCollapse = () => {
    setVisibleNotesCount(12);
  };

  return (
    <div>
      <div className="flex justify-center mb-5 text-2xl font-bold">
        Your Notes
      </div>
      {noteState.notes.length !== 0 && (
        <div className="flex justify-center gap-10 mx-25">
          {/* Search Bar */}
          <div className="bg-cloudybook-grey input-group max-w-sm">
            <span className="input-group-text">
              <span className="icon-[tabler--search] text-base-content/80 size-6"></span>
            </span>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-88 px-4 py-2 bg-cloudybook-dark-grey"
            />
            <label className="sr-only" htmlFor="kbdInput">
              Search
            </label>
            <span className="input-group-text gap-2">
              <kbd className="kbd kbd-sm">Ctrl</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </span>
          </div>
          {/* Sorting Dropdown */}
          <select
            className="bg-cloudybook-grey select max-w-72 max-w-sm rounded-full"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date-asc">Sort by Date (Ascending)</option>
            <option value="date-desc">Sort by Date (Descending)</option>
            <option value="alphabet-asc">Sort by Alphabet (A-Z)</option>
            <option value="alphabet-desc">Sort by Alphabet (Z-A)</option>
          </select>
        </div>
      )}
      {noteState.notes.length === 0 && (
        <div className="flex justify-center mt-4">Add Notes To Display</div>
      )}
      <div className="flex justify-center py-5 mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredNotes.slice(0, visibleNotesCount).map((note) => (
            <NoteItem
              key={note._id}
              title={note.title}
              description={note.description}
              tag={note.tag}
              handleDeleteNote={() => handleDeleteNote(note._id)}
              handleEditNote={() => handleEditNote(note)}
              handleViewNote={() => handleViewNote(note)}
            />
          ))}
        </div>
        {isModalOpen && (
          <NoteModal
            note={selectedNote}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveNote}
          />
        )}
        {isViewModalOpen && (
          <ViewNoteModal
            note={selectedNote}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </div>

      {/* Load More & Collapse Buttons */}
      <div className="flex justify-center gap-4 my-5">
        {visibleNotesCount < filteredNotes.length && (
          <button
            className="btn btn-gradient btn-info"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
        {visibleNotesCount > 12 && (
          <button
            className="btn btn-gradient btn-warning"
            onClick={handleCollapse}
          >
            Collapse
          </button>
        )}
      </div>
    </div>
  );
};

export default Notes;
