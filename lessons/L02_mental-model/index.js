/**
 * ### ตัวอย่างที่ 1 - counter
 */
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <React.Fragment>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        increment
      </button>
    </React.Fragment>
  );
}

/**
 * ### ตัวอย่างที่ 2 - Search
 */
const MEMBERS = [
  { name: "Tony Stark", level: 20, alive: false },
  { name: "Captain", level: 99, alive: true },
  { name: "Ant man", level: 38, alive: true },
];

function Search() {
  // TODO: ควรจะมี state อะไรเก็บไว้บ้าง หากต้องการให้ค้นหาชื่อได้
  return (
    <React.Fragment>
      <input placeholder="พิมชื่อเพื่อค้นหา..." />
      {MEMBERS.map((member) => (
        <div key={member.name} style={{ display: "flex" }}>
          <div style={{ flexBasis: "40%" }}>
            {member.name}
          </div>
          <div style={{ flexBasis: "30%" }}>
            {member.level}
          </div>
          <div style={{ flexBasis: "30%" }}>
            {member.alive}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

/**
 * ### ตัวอย่างที่ 3 - magic counter
 */
function MagicCounter() {
  const [count, setCount] = React.useState(0);
  return (
    <React.Fragment>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount(count + 1);
          setTimeout(() => {
            setCount(count + 1);
          }, [3000]);
        }}
      >
        increment
      </button>
    </React.Fragment>
  );
}

function App() {
  const sectionLayoutStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={{ maxWidth: 343, margin: "auto" }}>
      <div style={sectionLayoutStyle}>
        <Counter />
      </div>
      <div style={sectionLayoutStyle}>
        <Search />
      </div>
      <div style={sectionLayoutStyle}>
        <MagicCounter />
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
