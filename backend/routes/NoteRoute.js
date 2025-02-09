const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Add a new note
router.post(
  "/addNote",
  [
    authenticateToken, // Require user authentication
    body("title").notEmpty().withMessage("Title must not be empty."),
    body("description")
      .notEmpty()
      .withMessage("Description must not be empty."),
    body("tag").optional().isString().withMessage("Tag must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      // Create a new note associated with the user
      const newNote = new Note({
        title,
        description,
        tag,
        user: req.user.id, // Link to authenticated user
      });
      await newNote.save();

      res
        .status(201)
        .json({ message: "Note added successfully.", note: newNote });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

// Get all notes
router.get("/getNote", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    const formattedNotes = notes.map((note) => ({
      ...note._doc,
      date: note.date.toLocaleString("en-US", { timeZone: "America/New_York" }),
    }));

    res.status(200).json(formattedNotes);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// Update note
router.put("/updateNote/:id", authenticateToken, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Build a newNote object with the fields to update
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note by ID
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found.");
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .send("Access denied. You are not authorized to update this note.");
    }

    // Update the note
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // Return the updated document
    );

    res
      .status(200)
      .json({ message: "Note updated successfully.", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// Delete note
router.delete("/deleteNote/:id", authenticateToken, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Build a newNote object with the fields to update
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note by ID
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found.");
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .send("Access denied. You are not authorized to update this note.");
    }

    // Update the note
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Note Deleted successfully.", note: deletedNote });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

module.exports = router;
