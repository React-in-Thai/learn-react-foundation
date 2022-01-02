const NoteList = ({ notes, onPickNote, onDeleteNote }) => {
  return notes.map((note, index) => (
    <div key={index} style={{ borderBottom: "1px solid #e5e5e5" }}>
      <p style={{ fontWeight: "bold", fontSize: "0.875rem" }}>{note.title}</p>
      <p style={{ fontSize: "0.75rem" }}>{(note.content || "").slice(0, 40)}</p>
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <button onClick={() => onPickNote(note)}>Edit</button>
        <button onClick={() => onDeleteNote(note)}>Delete</button>
      </div>
    </div>
  ));
};

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [history, setHistory] = React.useState([]);
  const [future, setFuture] = React.useState([]);
  React.useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);
  return (
    <React.Fragment>
      <label htmlFor="title">Title</label>
      <div>
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setHistory((latestHistory) => [
              { title, content },
              ...latestHistory,
            ]);
          }}
        />
      </div>
      <br />

      <label htmlFor="content">content</label>
      <div>
        <textarea
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            setHistory((latestHistory) => [
              { title, content },
              ...latestHistory,
            ]);
          }}
        />
      </div>

      <br />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          disabled={!history.length}
          onClick={() => {
            const previousNote = history[0];
            if (previousNote) {
              setTitle(previousNote.title);
              setContent(previousNote.content);
              setHistory((latestHistory) => latestHistory.slice(1));
              setFuture((latestFuture) => [
                { title, content },
                ...latestFuture,
              ]);
            }
          }}
        >
          Undo
        </button>
        <button
          disabled={!future.length}
          onClick={() => {
            const lastNote = future[0];
            if (lastNote) {
              setTitle(lastNote.title);
              setContent(lastNote.content);
              setHistory((latestHistory) => [
                { title, content },
                ...latestHistory,
              ]);
              setFuture((latestFuture) => latestFuture.slice(1));
            }
          }}
        >
          Redo
        </button>
        <button
          disabled={!title}
          style={{ width: 80 }}
          onClick={() => {
            setTitle("");
            setContent("");
            setFuture([]);
            setHistory([]);
            onSave({ title, content });
          }}
        >
          Save
        </button>
      </div>
    </React.Fragment>
  );
};

function App() {
  const [notes, setNotes] = React.useState([]);
  const [selectedNote, setSelectedNote] = React.useState(null);
  return (
    <div
      style={{ maxWidth: 400, margin: "auto", display: "flex", gap: "1rem" }}
    >
      <div
        style={{
          flexBasis: 120,
          borderRight: "1px solid #e5e5e5",
          padding: "1rem",
        }}
      >
        <NoteList
          notes={notes}
          onPickNote={(note) => {
            setSelectedNote(note);
          }}
          onDeleteNote={(note) => {
            setSelectedNote(null);
            setNotes((latestNotes) =>
              latestNotes.filter((item) => item.id !== note.id)
            );
          }}
        />
      </div>
      <div>
        <h1 style={{ fontSize: "1.25rem" }}>Note Editor</h1>

        <NoteEditor
          note={selectedNote}
          onSave={(note) => {
            if (selectedNote) {
              setNotes((latestNotes) =>
                latestNotes.map((item) => {
                  if (item.id === selectedNote.id) {
                    return { ...item, ...note };
                  }
                  return item;
                })
              );
              setSelectedNote(null);
            } else {
              setNotes((latestNotes) => [
                { ...note, id: Date.now() },
                ...latestNotes,
              ]);
            }
          }}
        />
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
