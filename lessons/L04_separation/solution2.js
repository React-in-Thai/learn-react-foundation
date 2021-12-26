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

const useTimeTravel = (data) => {
  const [present, setPresent] = React.useState(data);
  const [history, setHistory] = React.useState([]);
  const [future, setFuture] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setPresent(data);
      setHistory([]);
      setFuture([]);
    }
  }, [data]);

  return {
    present,
    history,
    future,
    update: (shallowItem) => {
      setPresent({ ...present, ...shallowItem });
      setHistory((latestHistory) => [present, ...latestHistory]);
    },
    undo: () => {
      const previousNote = history[0];
      if (previousNote) {
        setPresent(previousNote);
        setHistory((latestHistory) => latestHistory.slice(1));
        setFuture((latestFuture) => [present, ...latestFuture]);
      }
    },
    redo: () => {
      const lastNote = future[0];
      if (lastNote) {
        setPresent(lastNote);
        setHistory((latestHistory) => [present, ...latestHistory]);
        setFuture((latestFuture) => latestFuture.slice(1));
      }
    },
    reset: (initialData) => {
      setPresent(initialData);
      setFuture([]);
      setHistory([]);
    },
  };
};

const NoteEditor = ({ note: noteProp, onSave }) => {
  const memoNote = React.useMemo(
    () => noteProp || { title: "", content: "" },
    [noteProp]
  );
  const {
    history,
    present: note,
    future,
    update,
    undo,
    redo,
    reset,
  } = useTimeTravel(memoNote);
  return (
    <React.Fragment>
      <label htmlFor="title">Title</label>
      <div>
        <input
          id="title"
          value={note?.title || ""}
          onChange={(event) => {
            update({ title: event.target.value });
          }}
        />
      </div>
      <br />

      <label htmlFor="content">content</label>
      <div>
        <textarea
          id="content"
          value={note?.content || ""}
          onChange={(event) => {
            update({ content: event.target.value });
          }}
        />
      </div>

      <br />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          disabled={!history.length}
          onClick={() => {
            undo();
          }}
        >
          Undo
        </button>
        <button
          disabled={!future.length}
          onClick={() => {
            redo();
          }}
        >
          Redo
        </button>
        <button
          disabled={!note?.title}
          style={{ width: 80 }}
          onClick={() => {
            reset({ title: "", content: "" });
            onSave(note);
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
