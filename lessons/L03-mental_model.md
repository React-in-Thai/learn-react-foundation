# บทเรียน 3 - Mental Model

สำหรับท่านใดที่ยังไม่เคยใช้งาน React มาก่อน ผมอยากให้ลองทำ [Official Tutorial](https://reactjs.org/tutorial/tutorial.html) ให้เสร็จก่อนนะครับ เพราะว่าผมจะไม่อธิบายพื้นฐานมากนัก. ส่วนท่านใดที่มีพื้นฐาน React อยู่แล้ว เรามาเริ่มกันเลยครับ...

---

Mental model แปลแบบบ้านๆคือ สื่งที่เกิดขึ้นในหัวของเราเวลาอ่านโค้ด แต่ละคนอาจมีกระบวนการคิด หรือ วิธีการมองที่แตกต่างกันออกไป เช่น บางคนอ่านโค้ดจากบนไปล่าง บางคนอ่านที่ละฟังก์ชั่น บางคนตีความออกเป็นภาพในหัว

หากเรามี mental model ที่ดี จะช่วยทำให้เราทำความเข้าใจโค้ดและเชื่อมโยงได้เร็วมากขึ้น

สำหรับบทเรียนนี้ผมจะแนะนำ mental model ที่ผมใช้แล้วรู้สึกว่าเวิคมากกับการเขียน functional component ใน React, ผมขอเรียกมันว่า snapshot mental model หรือจะเรียกว่าเป็นการมองแบบเป็นฉากก็ได้. ในแต่ละฉากเปรียบเสมือนเราถ่ายรูปของข้อมูลไว้รวมถึง UI ที่จะเกิดขึ้นด้วยแล้วส่งให้กับ React จากนั้น React จะการันตีว่าสิ่งที่ปรากฎขึ้นบนหน้าจอนั้นจะตรงกัน และเมื่อข้อมูลมีการเปลี่ยนแปลงก็จะทำให้เกิด snapshot (รูปถ่าย) **ขึ้นมาใหม่**. สิ่งที่ปรากฎบนหน้าจอจะเป็น snapshot อันล่าสุดเสมอ.

### ตัวอย่างที่ 1 - counter

```js
import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>increment</button>
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
3. React นำ `(c => c + 1)` เข้าไปใน state update queue
4. React ทำการ update state

เราจะได้หน้าตาของ snapshot 1 เป็นแบบนี้

![image](https://user-images.githubusercontent.com/18292247/146858231-63a74c20-ad7f-49b7-b2a9-2005f6d91c3d.png)


5. React สั่งให้ browser render โดยใช้ค่าจาก snapshot 1

✍️ **Challenge**
```
ให้วาด Snapshot 2 เมื่อกดปุ่ม increment อีกครั้ง
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

