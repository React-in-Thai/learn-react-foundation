<div align="center">
  <a href="/lessons/L03_managing-state/L03_managing-state.md">
    ◀ Previous Lesson
  </a>
  &nbsp;|&nbsp;
  <a href="#">
    Next Lesson ▶ (coming soon)
  </a>
</div>
<div align="center">
  <a href="../../README.md" style="font-size: 24px;">
    <font size="4">
      &gt;&gt;&gt; ไปหน้าสารบัญ &lt;&lt;&lt;
    </font>
  </a>
</div>

# บทที่ 4 - Separation

> Video ประกอบการสอน: [https://www.youtube.com/watch?v=8qZvs8T59XQ](https://www.youtube.com/watch?v=8qZvs8T59XQ&list=PLLPNfc7CgMywiG-R6Jix_w8zqF_fxZFxr)

จากบทที่แล้วเราได้สร้าง note application ที่มีฟีเจอร์พอสมควรแล้ว แต่ก่อนที่เราจะเพิ่มฟีเจอร์เข้าไปอีก เรามาลอง refactor แอพของเราให้แบ่งการทำงานออกเป็นส่วนย่อยๆก่อนดีกว่า

การแบ่งแต่ละส่วนในแอพให้แยกจากกัน จะทำให้เราสามารถเทสง่ายขึ้น(คอร์สนี้ผมไม่ได้สอนการเขียนเทส) และเมื่อเราเพิ่มฟีเจอร์อื่นๆเข้าไปจะช่วยให้เราไม่สร้างผลกระทบต่อส่วนอื่นๆ แต่แน่นอนว่าในหลายๆครั้งการทำแบบนี้ก็ไม่ใช้เรื่องที่ดีเสมอไป ขึ้นอยู่กับความเหมาะสมในแต่ละสถานการณ์

## แบ่งการทำงาน

วิธีที่ง่ายที่สุดคือการแยกการแสดงผลกับ logic ออกจากกัน ในเคสของ note application นี้ผมจะแบ่งออกเป็น 2 components ย่อย โดยที่มี state ของ `notes` และ `selectedNote` อยู่ที่ App

![image](https://user-images.githubusercontent.com/18292247/147404904-67d2b151-ed23-4cff-ba0a-51e56bee04ee.png)

- `NoteList`: แสดงผลโน้ตที่เรามี และมี interface ในการเลือกและลบโน้ต
- `NoteEditor`: แสดงผลฟอร์ม 

### NoteList

Component นี้ควรทำหน้าที่ในการแสดงผลอยากเดียว ไม่ควรมี logic อยู่ภายในตัวเอง. ผลลัพธ์จะออกมาหน้าตาเป็นแบบนี้

```js
<NoteList
  notes={notes}
  onPickNote={(note) => {}}
  onDeleteNote={(note) => {}}
/>
```

### NoteEditor

สามารถรับ note เพื่อนำค่าต่างๆมาแสดงผลลงในฟอร์มได้ และ users สามารถแก้ไข บันทึก รวมถึงมีฟีเจอร์ undo, redo ภายในตัวเอง

```js
<NoteEditor
  note={note}
  onSave={(note) => {}}
/>
```

📹 สำหรับการ refactor ดูในวิดีโอจะได้อรรถรสมากกว่า 😂

---

<div align="center">
  <a href="/lessons/L03_managing-state/L03_managing-state.md">
    ◀ Previous Lesson
  </a>
  &nbsp;|&nbsp;
  <span>
    <a href="#">
      Next Lesson ▶
    </a>
    (coming soon)
  </span>
</div>
<div align="center">
  <a href="../../README.md" style="font-size: 24px;">
    <font size="4">
      &gt;&gt;&gt; ไปหน้าสารบัญ &lt;&lt;&lt;
    </font>
  </a>
</div>
