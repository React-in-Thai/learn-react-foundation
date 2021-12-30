# บทเรียน 3 - จัดการ state

การเขียนหน้าบ้านจะต้องจัดการกับ state เป็นหลัก สำหรับในคอร์สนี้เราจะแบ่ง state ออกเป็น 2 กลุ่ม
- UI state: ข้อมูลที่ users นั้น interact ด้วย เช่น ข้อความที่พิม ตัวเลือกต่างๆที่สามารถเปลี่ยนได้
- Server state: ข้อมูลที่มาจากหลังบ้านหรือ 3rd party service อื่นๆ

เรามาเริ่มจาก UI state กันก่อนเลย ด้วยการสร้างแอพโน้ตบุ๊คแบบง่ายๆ แล้วเราจะค่อยๆเพิ่มฟีเจอร์เข้าไป

## 1st requirement - Editor

โจทย์แรกคือให้สร้าง notebook editor ขึ้นมา โดยสามารถพิมพ์ชื่อและเนื้อหาของโน้ตได้

เปิดโฟลเดอร์ `/lessons/L04_managing-state/` ขึ้นมา จะเห็นว่ามีไฟล์ `index.js` และ `index.html` อยู่
- ใช้ vscode เปิด `index.js`
- ใช้ chrome เปิด `index.html`

เมื่อเราแก้โค้ดใน `index.js` ให้กดบันทึก แล้ว refresh ที่หน้า chrome เพื่อเห็นการเปลี่ยนแปลง

ทริกในการสร้าง state
- ส่วนใหญ่จะเป็นสิ่งที่ users สามารถแก้ไขได้
- ควรจะเป็นส่วนที่เล็กที่สุดเท่าที่จะทำได้ก่อน (string, boolean, number)
- independent ต่อกัน จะทำให้ให้จัดการง่ายที่สุด อย่างพึ่งให้ความสำคัญกับความสวยงามของโค้ด และอย่าพึ่งสร้าง abstraction ตั้งแต่เริ่มต้น

ในกรณีนี้เราจะสร้าง 2 state คือ `title: string` และ `content: string`

เปิด `index.js` ขึ้นมาแล้ว เพิ่มโค้ดนี้ลงไป

```js
function App() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  return (
    <div>
      <h1 style={{ fontSize: '1.25rem' }}>Note Editor</h1>

      <label htmlFor="title">Title</label>
      <input id="title" />

      <label htmlFor="content">Content</label>
      <textarea id="content" />
    </div>
  )
}
```

ทีนี้เรามาลอง refactor ให้เก็บ state ในที่เดียวกันโดยการรวม title & content เข้ามาใน note

```js
const [note, setNote] = React.useState({ title: '', content: '' });
```

💡 ความยุ่งยากของการใช้ object (หรือ array) คือเวลาเราจะ setState บางส่วน เราต้องนำ state อื่นๆที่มีอยู่แล้วใส่เข้าไปด้วย 

```js
setNote({ title: 'Hello' }) // การที่เรียกแบบนี้จะทำให้ content กลายเป็น undefined เมื่อเกิดการ rerender
```

ดังนั้นควรเริ่มจากการเก็บ state เป็น string, boolean, number ถ้าเป็นไปได้ แล้วค่อยๆปรับให้เหมาะสมเมื่อมี requirement เพิ่มขึ้น (ไม่ต้องกังวลเรื่องการ rerender หลายครั้งโดยไม่จำเป็น เพราะส่วนใหญ่แทบจะไม่มีผลอะไรกับ users เลย)

## 2nd requirement - Time travel

สามารถ undo, redo จากการกดปุ่มได้

การที่จะทำให้สามารถ undo ได้เราไม่สามารถเก็บ state เป็น string หรือ number ได้แล้ว เราต้องมี array(...) เพื่อที่จะได้ save ค่าในแต่ละจุดลงใน state ได้

ลองจินตนาการ history คร่าวๆ จะได้เป็นแบบนี้

1. พิมพ์ `H` ในหัวข้อ -> `[{ title: 'H', content: '' }]`
2. พิมพ์ `t` ในเนื้อหา -> `[{ title: 'H', content: 't' }]`
3. พิมพ์ `o` ในเนื้อหา -> `[{ title: 'H', content: 'to' }]`

ดังนั้น state `history` ที่เราจะสร้างควรจะเป็น array ที่ในแต่ละ index จะต้องเก็บค่าต่างๆ ณ ตอนนั้นเอาไว้

```js
const [history, setHistory] = React.useState([]);

<input id="title" onChange={event => {
  setTitle(event.target.value);
  setHistory(latestHistory => ([{ title: event.target.value, content }, ...latestHistory]))
}} />
<input id="title" onChange={event => {
  setTitle(event.target.value);
  setHistory(latestHistory => ([{ title, content: event.target.value }, ...latestHistory]))
}} />
```

ต่อมาเรามา implement ปุ่ม undo กัน...

```js
<button onClick={() => {
  const previousNote = history[0];
  if (previousNote) {
    setTitle(previousNote.title);
    setContent(previousNote.content);
    setHistory(latestHistory => latestHistory.slice(1));
  }
}}>Undo</button>
```

**Challenge**
```
เพิ่มฟีเจอร์ redo
```

## 3rd requirement - Saving note

แน่นอนว่าเราคงไม่อยากให้โน้ตของเราหายไป เราจะมาสร้างปุ่มที่ใช้บันทึกโน้ตกัน

เราต้องสร้างอีก state ที่เป็น collection ของโน้ตที่เรามีอยู่ เมื่อเรากด save เราจะเพิ่มโน้ตเข้าไปใน collection จากนั้นรีเซ็ตค่าต่างๆใน editor เพื่อให้เราสามารถกรอกค่าใหม่ลงไปได้

เราจะมาปรับ layout กันนิดนึงโดยการเพิ่ม note collection ไปทางซ้ายของ editor (หากไม่เข้าไปไม่เป็นไร อันนี้เป็นเรื่องของ CSS ไม่ได้เกี่ยวกับ React)

จากนั้นเราก็เพิ่ม state `notes` และ ปุ่ม save ลงไป แล้วก็ใส่ function `onClick`.

---

## Homework

### 4th requirement - Editing note

เพิ่มฟีเจอร์การแก้ไขโน้ตที่สร้างไว้แล้ว และบันทึกทับของเก่าได้

### 5th requirement - Deleting note

เพิ่มฟีเจอร์ลบโน้ตที่อยู่ในลิสต์
