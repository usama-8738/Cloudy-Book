import React, { useState } from "react";
import NoteContext from "./NoteContext";

const host = "http://localhost:5000";

const NoteState = ({ children }) => {
  const [noteState, setNoteState] = useState({ notes: [] });

  // Fetch Notes
  const getNotes = async () => {
    const url = `${host}/api/note/getNote`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const fetchedNotes = await response.json();
      setNoteState({ notes: fetchedNotes });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/note/addNote`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          description,
          tag,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Added note:", result); // Debugging
      setNoteState((prevState) => ({
        notes: [...prevState.notes, result.note],
      }));
      return true;
    } catch (error) {
      console.log(`Error Adding Note: ${error}`);
      return false;
    }
  };

  // Edit Note
  const editNote = async (newNote) => {
    const url = `${host}/api/note/updateNote/${newNote._id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newNote.title,
          description: newNote.description,
          tag: newNote.tag,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setNoteState((prevState) => ({
        notes: prevState.notes.map((note) =>
          note._id === newNote._id ? result.note : note
        ),
      }));
      return true;
    } catch (error) {
      console.log(`Error Editing Note: ${error}`);
      return false;
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    const url = `${host}/api/note/deleteNote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setNoteState((prevState) => ({
        notes: prevState.notes.filter((note) => note._id !== id),
      }));
      return true;
    } catch (error) {
      console.log(`Error Deleting Note: ${error}`);
      return false;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        noteState,
        setNoteState,
        getNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
