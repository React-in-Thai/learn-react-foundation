<div align="center">
  <a href="../L01_introduction/L01_introduction.mdd">
    ◀ Previous Lesson
  </a>
  &nbsp;|&nbsp;
  <a href="../L03_managing-state/L03_managing-state.md">
    Next Lesson ▶
  </a>
</div>
<div align="center">
  <a href="../../README.md" style="font-size: 24px;">
    &gt;&gt;&gt; ไปหน้าสารบัญ &lt;&lt;&lt;
  </a>
</div>

# บทเรียน 2 - Mental Model

> Video ประกอบการสอน: [https://www.youtube.com/watch?v=kFFBREQGtYA](https://www.youtube.com/watch?v=kFFBREQGtYA&list=PLLPNfc7CgMywiG-R6Jix_w8zqF_fxZFxr)

สำหรับท่านใดที่ยังไม่เคยใช้งาน React มาก่อน ผมอยากให้ลองทำ

1. [Official Tutorial](https://reactjs.org/tutorial/tutorial.html): ในตัวอย่างเค้าจะใช้เป็น class component
2. [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html) เพื่อปูพื้นฐาน react hook

เพราะว่าผมจะไม่อธิบายพื้นฐานมากนัก. ส่วนท่านใดที่มีพื้นฐาน React อยู่แล้ว เรามาเริ่มกันเลยครับ...

---

Mental model แปลแบบบ้านๆคือ สื่งที่เกิดขึ้นในหัวของเราเวลาอ่านโค้ด แต่ละคนอาจมีกระบวนการคิด หรือ วิธีการมองที่แตกต่างกันออกไป เช่น บางคนอ่านโค้ดจากบนไปล่าง บางคนอ่านที่ละฟังก์ชั่น บางคนตีความออกเป็นภาพในหัว

หากเรามี mental model ที่ดี จะช่วยทำให้เราทำความเข้าใจโค้ดและเชื่อมโยงได้เร็วมากขึ้น

สำหรับบทเรียนนี้ผมจะแนะนำ mental model ที่ผมใช้แล้วรู้สึกว่าเวิคมากกับการเขียน functional component ใน React, ผมขอเรียกมันว่า snapshot mental model หรือจะเรียกว่าเป็นการมองแบบเป็นฉากก็ได้. ในแต่ละฉากเปรียบเสมือนเราถ่ายรูปของข้อมูลไว้รวมถึง UI ที่จะเกิดขึ้นด้วยแล้วส่งให้กับ React จากนั้น React จะการันตีว่าสิ่งที่ปรากฎขึ้นบนหน้าจอนั้นจะตรงกัน และเมื่อข้อมูลมีการเปลี่ยนแปลงก็จะทำให้เกิด snapshot (รูปถ่าย) **ขึ้นมาใหม่**. สิ่งที่ปรากฎบนหน้าจอจะเป็น snapshot อันล่าสุดเสมอ.

> ถ้าติดตั้ง serve ผ่าน yarn หรือ npm แล้ว ให้รัน `serve` ใน terminal ที่ root folder นี้
> จากนั้นไปที่ localhost ตามที่ปรากฎบน terminal แล้วเลือก `/lessons/L02_mental-model/`

### ตัวอย่างที่ 1 - counter

```js
import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  )
}
```

ผมจะอธิบายผ่านภาพที่เกิดขึ้นในหัวของผมนะครับ. หลักการคือให้เรา snapshot ค่าต่างๆของเอาไว้ก่อนที่จะ render ในแต่ละครั้ง เพราะใน functional component ค่าต่างๆจะถูกสร้างขึ้นมาใหม่เมื่อมีการ (re)render ยกเว้นค่าที่เกิดจาก React APIs. ในแต่ละ snapshot ที่เกิดขึ้น React จะการันตีว่าสิ่งที่เกิดขึ้นบนหน้าจอนั้นสอดคล้องกับค่าต่างๆใน snapshot นั้นๆ

**Snapshot 0**

ฉากแรกของทุกๆ component คือฉากก่อนที่จะ render ลงบนหน้าจอ. เมื่อเราเรียกใช้ [`React.useState(0)`](https://reactjs.org/docs/hooks-reference.html#usestate) React จะสร้าง internal state ไว้ภายใน ซึ่งในตัวอย่างผมตั้งชื่อไว้ว่า `count`.

![image](https://user-images.githubusercontent.com/18292247/146857334-7cf5e6a5-4dbc-414f-84ac-4b82a325197b.png)

**Snapshot 1**

เมื่อผมกดปุ่ม `increment`:

1. ฟังกชั่นที่อยู่ใน `onClick` จะทำงาน
2. `setCount` ถูกเรียก
3. React นำ `(0 + 1)` เข้าไปใน state update queue
4. React ทำการ update state

เราจะได้หน้าตาของ snapshot 1 เป็นแบบนี้

![image](https://user-images.githubusercontent.com/18292247/146858231-63a74c20-ad7f-49b7-b2a9-2005f6d91c3d.png)


5. React สั่งให้ browser render โดยใช้ค่าจาก snapshot 1

✍️ **Challenge**
```
ให้เขียนสิ่งที่เกิดขึ้นและวาด Snapshot 2 เมื่อกดปุ่ม increment อีกครั้ง
```
สามารถวาดลงบนบราวเซอร์ผ่าน [Exclaridraw](https://excalidraw.com/) ได้.

### ตัวอย่างที่ 2 - Search

เราเริ่มมาดูตัวอย่างที่ใกล้เคียงกับความเป็นจริงเพิ่มขึ้น เราจะมีตารางที่ users สามารถค้นหาจากชื่อได้

```js
import React from 'react';

const MEMBERS = [
  { name: 'Tony Stark', level: 20, alive: false },
  { name: 'Captain', level: 99, alive: true },
  { name: 'Ant man', level: 38, alive: true },
]

function MemberTable() {
  // TODO: ควรจะมี state อะไรเก็บไว้บ้าง หากต้องการให้ค้นหาชื่อได้
  return (
    <div>
      <input placeholder="พิมชื่อเพื่อค้นหา..." />
      {MEMBERS.map(member => (
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '40%' }}>{member.name}</div>
          <div style={{ flexBasis: '30%' }}>{member.level}</div>
          <div style={{ flexBasis: '30%' }}>{member.alive}</div>
        </div>
      )}
    </div>
  )
}
```

✍️ **Challenge**
แก้ตรง TODO ให้เป็น `useState`.

อย่างในเคสนี้ state คือ**ชื่อ**ที่ users ต้องการจะค้นหา

```js
const [searchText, setSearchText] = React.useState('');
```

จากนั้นเชื่อม state เข้ากับ event handler (หากไม่เข้าใจโค้ด ไม่ต้องกังวล ทำตามไปก่อนนะครับ)

```js
import React from 'react';

const MEMBERS = [
  { name: 'Tony Stark', level: 20, alive: false },
  { name: 'Captain', level: 99, alive: true },
  { name: 'Ant man', level: 38, alive: true },
]

function MemberTable() {
  const [searchText, setSearchText] = React.useState('');
  const filteredMembers = MEMBERS.filter(item => item.name.includes(searchText));
  return (
    <div>
      <input placeholder="พิมชื่อเพื่อค้นหา..." value={searchText} onChange={e => setSearchText(e.target.value)} />
      {filteredMembers.map(member => (
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '40%' }}>{member.name}</div>
          <div style={{ flexBasis: '30%' }}>{member.level}</div>
          <div style={{ flexBasis: '30%' }}>{member.alive}</div>
        </div>
      )}
    </div>
  )
}
```

**Snapshot 0**

ตัวแปรของเราตอนนี้มีอยู่ 2 ตัว `searchText` และ `filteredMembers`

![image](https://user-images.githubusercontent.com/18292247/147025404-4cd06eaa-c0cd-4b75-9c83-2ad93cb91811.png)

**Snapshot 1**

เมื่อผม copy `ta` และแปะลงใน input:

1. ฟังกชั่นที่อยู่ใน `onChange` จะทำงาน
2. `setSearchText` ถูกเรียก
3. React นำ `e.target.value` ซึ่งคือ `'ta'` เข้าไปใน state update queue
4. React ทำการ update state

เราจะได้หน้าตาของ snapshot 1 เป็นแบบนี้

![image](https://user-images.githubusercontent.com/18292247/147025810-3af3e220-9962-4993-8075-f5ded22caa83.png)

✍️ **Challenge**
```
ให้วาด Snapshot 2 เมื่อพิมตัวอักษร `i` ต่อจากที่มีอยู่
```
สามารถวาดลงบนบราวเซอร์ผ่าน [Exclaridraw](https://excalidraw.com/) ได้.

✍️ **Challenge**
```
แก้ logic ตรง filter ให้เป็น case insensitive. ถ้าพิม `s` ตัวเล็ก ต้องแสดง Tony Stark อันเดียว
```

### ตัวอย่างที่ 3 - magic counter

```js
import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => {
        setCount(count + 1);
        setTimeout(() => {
          setCount(count + 1);
        }, [3000])
      }}>increment</button>
    </div>
  )
}
```

ส่วนใหญ่แล้วความยากของการเขียน React จะเกิดขึ้นเมื่อเราต้องยุ่งกับ asynchronous task เช่น `setTimeout` เป็นต้น.

**Question**
จากตัวอย่างด้านบน ถ้ากด `increment` หนึ่งครั้ง แล้วรอไปอีก 3 วินาที สุดท้ายแล้วจะเห็นค่า count บนหน้าจอเป็นเท่าไหร่?

ทำไมถึงได้คำตอบเช่นนั้น เนื่องจากว่า function ถือว่าเป็นส่วนหนึ่งใน snapshot ด้วย ในแต่ละ snapshot จะมีค่าไม่เหมือนกัน

**Snapshot 0** (หลังจากการ render แล้ว)

![image](https://user-images.githubusercontent.com/18292247/147389006-732ec2b2-651b-4fe9-8c87-cd54deffab66.png)

จะเห็นว่าเราสามารถนำค่า count เข้าไปแทนค่าตัวแปรใน function ได้เลย

เมื่อผมกดปุ่ม `increment`:

1. ฟังกชั่นที่อยู่ใน `onClick` จะทำงาน
2. `setCount` ถูกเรียก
3. function ใน `setTimeout` เข้า microtask queue
4. React ทำการ update state ของ count เป็น 1
5. Counter เกิดการ rerender ด้วยค่า count = 1
6. ค่า 1 แสดงบนหน้าจอ
7. 3 วินาทีผ่านไป `() => { setCount(0 + 1) }` ถูกเรียกซึ่งผลลัพธ์มีค่าเท่ากับ state ณ ตอนนั้น react จึงไม่ทำอะไร

แล้วถ้าเราต้องการใช้ค่าล่าสุดใน `setTimeout` ต้องทำอย่างไร?

React มีวิธีให้เราอ่านค่าล่าสุดของ state ได้ โดยใช้ callback ใน `setState` อย่างเช่นในกรณีนี้เราต้องการให้ค่า count เพิ่มขึ้นอีกหนึ่งหลังจาก timeout เราจะเขียนได้แบบนี้

```js
setTimeout(() => {
  // latestCount คือค่าล่าสุด เราไม่สามารถบอกได้แน่นอนว่ามีค่าเท่าไหร่
  // เพราะ ค่า latestCount อาจถูกเปลี่ยนแปลงมาจากที่อื่น แต่ React จะการันตีว่า
  // ณ ตอนนี้ `setCount` ถูกเรียก React จะส่งค่า state ล่าสุดมาให้เราใน callback
  setCount(latestCount => latestCount + 1);
}, [3000])
```

---

## การบ้านท้ายบท

โค้ดอยู่ใน `./homework.js`, ให้ uncomment homework script ใน `index.html` เพื่อแสดงผลบน browser

```html
<body>
  <!-- ...other links -->

  <!-- <script type="text/babel" data-type="module" src="./index.js"></script> -->
  <script type="text/babel" data-type="module" src="./homework.js"></script>
</body>
```

จากนั้น save แล้ว refresh บน browser อีกครั้ง

---

<div align="center">
  <a href="../L01_introduction/L01_introduction.mdd">
    ◀ Previous Lesson
  </a>
  &nbsp;|&nbsp;
  <a href="../L03_managing-state/L03_managing-state.md">
    Next Lesson ▶
  </a>
</div>
<div align="center">
  <a href="../../README.md" style="font-size: 24px;">
    &gt;&gt;&gt; ไปหน้าสารบัญ &lt;&lt;&lt;
  </a>
</div>
