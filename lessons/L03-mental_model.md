# บทเรียน 3 - Mental Model

สำหรับท่านใดที่ยังไม่เคยใช้งาน React มาก่อน ผมอยากให้ลองทำ [Official Tutorial](https://reactjs.org/tutorial/tutorial.html) ให้เสร็จก่อนนะครับ เพราะว่าผมจะไม่อธิบายพื้นฐานมากนัก. ส่วนท่านใดที่มีพื้นฐาน React อยู่แล้ว เรามาเริ่มกันเลยครับ...

---

Mental model แปลแบบบ้านๆคือ สื่งที่เกิดขึ้นในหัวของเราเวลาอ่านโค้ด แต่ละคนอาจมีกระบวนการคิด หรือ วิธีการมองที่แตกต่างกันออกไป เช่น บางคนอ่านโค้ดจากบนไปล่าง บางคนอ่านที่ละฟังก์ชั่น บางคนตีความออกเป็นภาพในหัว

หากเรามี mental model ที่ดี จะช่วยทำให้เราทำความเข้าใจโค้ดได้เร็วมากขึ้น และสร้างแอพลิเคชั่นที่มีประสิทธิภาพได้

สำหรับบทเรียนนี้ผมจะแนะนำ mental model ที่ผมใช้แล้วรู้สึกว่าเวิคมากกับการเขียน functional component ใน React, ผมขอเรียกมันว่า snapshot mental model หรือจะเรียกว่าเป็นการมองแบบเป็นฉากก็ได้.

### Example #1 - counter

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

ผมจะอธิบายผ่านภาพที่เกิดขึ้นในหัวของผมนะครับ. หลักการคือให้เรา snapshot ค่าต่างๆของเอาไว้ก่อนที่จะ render ในแต่ละครั้ง เพราะใน functional component ค่าต่างๆจะถูกสร้างขึ้นมาใหม่เมื่อมีการ (re)render ยกเว้นค่าที่เกิดจาก React APIs. 

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

