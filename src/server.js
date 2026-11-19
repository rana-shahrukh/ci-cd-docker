const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

let notes = [];

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Docker CI/CD Application Running",
        version: "1.0.0"
    });
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Application is healthy"
    });
});

// Get all notes
app.get("/notes", (req, res) => {
    res.status(200).json(notes);
});

// Create note
app.post("/notes", (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            error: "Title and content are required"
        });
    }

    const note = {
        id: notes.length + 1,
        title,
        content
    };

    notes.push(note);

    res.status(201).json(note);
});

// Start server only when executed directly
if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Jest testing
module.exports = app;
