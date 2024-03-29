<div align="center">
  <a>
    ◀ Previous Lesson
  </a>
  &nbsp;|&nbsp;
  <a href="../L01_introduction/L01_introduction.md">
    Next Lesson ▶
  </a>
</div>
<div align="center">
  <a href="../../README.md" style="font-size: 24px;">
    &gt;&gt;&gt; ไปหน้าสารบัญ &lt;&lt;&lt;
  </a>
</div>

# บทที่ 0 - เตรียมความพร้อม

> Video ประกอบการสอน: [https://www.youtube.com/watch?v=fI06CT84FRQ](https://www.youtube.com/watch?v=fI06CT84FRQ&list=PLLPNfc7CgMywiG-R6Jix_w8zqF_fxZFxr)

## เนื้อหาในคอร์ส

เนื้อหาในคอร์สนี้จะเน้นไปที่การสร้างรากฐานและความเข้าใจเกี่ยวกับ React เพื่อให้สามารถนำไปต่อยอด, ประยุกต์, และสร้างเว็บแอพลิเคชั่นที่มีความหลากหลายและซับซ้อนได้

สื่งที่ไม่ได้เน้นคือ
- HTML, CSS
- performance optimization
- testing

## ระดับและความรู้พื้นฐาน

จริงๆไม่จำเป็นมาก แต่ถ้ามีก็ดี ในวิดีโอจะพยายามแปะลิ้งค์ไว้ให้อ่านเพิ่มเติม

- [basic HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [basic CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- [basic JS](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [basic React](https://reactjs.org/docs/getting-started.html) (optional)

> ในคอร์สจะไม่อธิบายรายละเอียดการใช้ HTML และ CSS (อาจมีพูดถึงบ้างเล็กน้อย)

## วิธีการเรียนการสอน

- 📹 วิดีโอทั้งหมดจะอัดลงใน Youtube
- 📚 บทเรียนและ code อยู่ใน repository นี้
- แนะนำว่าให้เริ่มตั้งแต่บทที่ 0 (พยายามอย่าข้าม) เนื้อหาตัดมาให้แล้วแต่เนื้อๆ คลิปละ 10-15 นาที ถ้าอยากได้น้ำด้วยไปติดตามในเพจ [React ไปวันๆ](https://www.facebook.com/devMasterSomeday/) นะคับ
- แนะนำให้ทำแบบฝึกหัดในตอนท้ายของวิดีโอ (ถ้ามี) เพราะถ้าอยากเข้าใจด้วยตัวเองจริงๆต้องลงมือทำ ผมช่วยได้แค่แนะนำและเล่าประสบการณ์ให้ฟังเท่านั้น
- เนื่องจากวิธีการสอนเน้นความเข้าใจ ในวิดีโอจะพูดถึงจากปัญหาหรือสิ่งที่ต้องการก่อน จากนั้นค่อยนำเครื่องมือ(react API) ที่เหมาะสมเข้ามาใช้
- syntax ทั้งหมด จะเขียนด้วย ES6 ขึ้นไป
- ส่วนใหญ่ผมจะพูดไทยบ้างอังกฤษบ้างเพราะศัพท์บางคำใช้ภาษาอังกฤษจะดีกว่า (ถ้ามีคำหยาบ ต้องขออภัย 🙏)
- ภาษาที่ใช้ในการพูดหรือพิม อาจมีความผิดพลาดได้ (ส่วนใหญ่จะไม่ได้เป็นทางการ) หากในส่วนไหนมีความผิดพลาดสามารถเปิด PR เข้ามาได้เลยครับ
- โปรดอย่าคาดหวังเรื่อง production ในการตัดต่อวิดีโอนะครับ 🤣 เป้าหมายคือให้พอดูได้

## ค่าใช้จ่าย

คอร์สนี้ **Free** ทั้งหมด

### !!!ห้ามนําไปใช้เชิงพาณิชย์ เด็ดขาด!!!

## เครื่องมือและการติดตั้ง

- [clone โปรเจคลงในเครื่อง](https://github.com/React-in-Thai/learn-react-foundation.git)
- เปิดด้วย [VSCode](https://code.visualstudio.com/download) (IDE อื่นสามารถใช้ได้เช่นกัน)
- ติดตั้ง `serve` ด้วย yarn หรือ npm
  ```bash
  yarn global add serve
  ```
  or
  ```bash
  npm install -g serve
  ```
- เปิดโปรเจคขึ้นมาแล้วรัน `serve` ได้เลย

> คิดว่ารองรับทั้ง mac และ window นะครับ ถ้าติดปัญหาอะไรลองหาวิธีแก้ด้วยตัวเองก่อน(เพราะคุณจะต้องเจออีกเยอะ) แต่ถ้าไม่ได้จริงๆให้เปิด [issue](https://github.com/React-in-Thai/learn-react-foundation/issues) ไว้

## โครงสร้าง repo

- สคริปตอนพูดในวิดีโอจะอยู่ในโฟลเดอร์ `/lessons/$lesson_number/$lesson_number.md` (สคริปจะไม่ตรงกับในวิดีโอเป๊ะๆ)

---

<div align="center">
  <a>
    ◀ Previous Lesson
  </a>
  &nbsp;|&nbsp;
  <a href="../L01_introduction/L01_introduction.mdd">
    Next Lesson ▶
  </a>
</div>
<div align="center">
  <a href="../../README.md" style="font-size: 24px;">
    &gt;&gt;&gt; ไปหน้าสารบัญ &lt;&lt;&lt;
  </a>
</div>
