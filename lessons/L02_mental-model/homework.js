/**
 * ใช้ snapshot mental model ทำความเข้าใจโดยไม่เปิด browser
 * เมื่อกดปุ่มจะเกิดอะไรขึ้นบ้าง??
 *
 * เช็คความเข้าใจใน browser และเพิ่ม console.log ในจุดที่สนใจ
 */
function Homework_1() {
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>{count}</p>
      <button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setCount((c) => c * c);
          }, 2000);
        }}
      >
        Fire
      </button>
    </div>
  );
}

/**
 * สร้าง media player แบบง่ายๆ
 * มีปุ่มย้อนกลับ (เล่นเพลงก่อนหน้า)
 * มีปุ่มเล่น/หยุด (เล่นเพลงก่อนหน้า)
 * มีปุ่มไปข้างหน้า (เล่นเพลงถัดไป)
 *
 * ให้เพิ่ม state และ event handler (onClick) ตามที่สมควร
 */
function Homework_2() {
  const SONGS = ["Lavender", "พิง", "เอาปากกามาวง"];
  const pause = true;
  const currentSong = SONGS[0];
  return (
    <div>
      <p>{currentSong}</p>
      <p>{pause ? "หยุด" : "กำลังเล่น"}</p>
      <button>Prev</button>
      <button>{pause ? "Play" : "Pause"}</button>
      <button>Next</button>
    </div>
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
        <Homework_1 />
      </div>
      <div style={sectionLayoutStyle}>
        <Homework_2 />
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
