# บทเรียน 1 - ประวัติศาสตร์, ปัจจุบัน และ อนาคต

การเรียนรู้ประวัติศาสตร์เป็นจุดเริ่มต้นที่สำคัญที่จะทำให้เราเข้าใจว่า React นั้นเกิดขึ้นมาเพื่อจุดประสงค์อะไร คนที่สร้าง React ต้องการแก้ปัญหาอะไร และทำไม React ถึงได้ถูกออกแบบมาในลักษณะนี้

เมื่อเราเข้าใจถึงที่มาที่ไปของ React แล้ว ผมเชื่อว่า

1. นำ React ไปใช้ได้ถูกสถานการณ์ เพราะ React ก็ถือว่าเป็นเครื่องมือชิ้นหนึ่ง เราควรใช้เครื่องมือให้เหมาะกับปัญหาด้วย
2. สร้างรากฐานที่ดี อาจทำให้เกิดจังหวะปิ๊งป่องได้ในอนาคต เวลาเจอเคสที่ซับซ้อนมากขึ้น
3. เมื่อมองเห็นภาพรวมของการเปลี่ยนแปลง และ API ที่เปลี่ยนไป จะทำให้เราสามารถนำไปประยุกต์ต่อยอด สร้างสิ่งใหม่ๆได้

## ประวัติศาสตร์

เราจะย้อนกลับไปในช่วงก่อนปี 2010 ซึ่ง React ยังไม่เกิดนะครับ ช่วงนั้นเนี่ยเราจะเห็นว่ามี js framework ต่างๆมากมาย เราจะได้ยินคำนี้เยอะมากนะครับ MVC, MVVM, MVW แต่ไม่ว่าจะเป็น M อะไรก็ตาม สิ่งที่คล้ายกันก็คือการสร้าง observable object ที่สามารถ subscribe ได้ จากนั้นถ้า data เปลี่ยน เราก็จะทำการเปลี่ยนรูป หรือ mutate view 

key สำคัญอยู่ที่คำว่า Mutation เวลาที่แอพของเราใหญ่ขึ้นเรื่อยๆ การ mutate(ในเคสของ UI คือ DOM) อะไรก็ตามจะยิ่งเพิ่ม complexity และทำให้เราคาดเดาผลลัพธ์ที่จะเกิดขึ้นได้ยากขึ้น ทีนี้ก็เลยมีคนคิดไอเดียนี้ขึ้นมา what if? ถ้าหากว่าเราไม่ mutate แต่สร้างใหม่ทุกครั้งเมื่อ data เปลี่ยนล่ะ ?? หืมมม...จะเวิคหรอ ในตอนนั้นมันดูเป็นไอเดียที่แย่มากเพราะว่าการสร้าง DOM ขึ้นมาใหม่นั้นดูไม่น่าเป็นไปได้เลย เช่น ถ้าตอนนั้น user กำลังพิมอยู่แล้วเราไป render view ใหม่ทับเข้าไป ux ไม่ดีแน่นอน ...โอเค ถ้างั้นเราไม่ยุ่งกับ DOM แต่เราจะโยนหน้าที่นี้ไปให้ javascript แทน แน่นอนว่าก็ยังมีข้อสงสัยอยู่ว่า performance มันจะต้องแย่แน่นอนเลยเพราะว่า ทุกๆครั้งที่ data เปลี่ยน เราจะต้องสร้าง tree ที่แสดงถึง view อันใหม่ขึ้นมา แล้วเอามาเทียบกับของเก่า เพื่อจะหาว่ามีจุดไหนเปลี่ยนบ้าง แล้วค่อยไล่ mutate DOM อีกที ...แต่ปรากฏว่า javascript นั้นเร็วมากๆ ซึ่งสุดท้ายแล้วมันเวิค ถึงจุดนี้ผมคิดว่าคงมีบางท่านที่เริ่มคุ้นๆกับสิ่งที่ผมเล่าให้ฟังบ้างแล้วนะครับ ถูกต้องครับ ต่อมามันมีชื่อว่า Virtual DOM นั่นเอง และนี่ก็คือที่มีของการเปลี่ยนจาก mutation มาเป็น rerender
  
แน่นอนครับไอเดียนี้ไม่ได้มาจากผมแน่นอน แต่เป็นคนนี้ครับ Jordan Walke ตอนนั้นเป็น engineer อยู่ที่ facebook ทำในส่วนของ facebook ads เป็นหลัก และด้วยความที่เค้าชื่นชอบ functional programming มาก จึงมีอิทธิพลทำให้ react มี API ออกไปทาง functional programming

ด้วยเหตุผลนี้เอง แนวคิดของ React จึงเปลี่ยนจาก Mutation มาเป็น Reconciliation หรือแปลเป็นไทยได้ว่า กระบวนการเปรียนเทียบความแตกต่าง (diffing algorithm)

Reconciliation ทำให้ React เป็นที่ชื่นชอบของโปรแกรมเมอร์มากๆ เพราะว่า จากที่เราต้องจัดการ DOM ด้วยตัวเอง เราโยนหน้าที่นั้นให้ React จัดการ โดย React ปล่อยให้เราควบคุม logic ของ application ที่เราต้องการ จากนั้นส่งผลลัพธ์ที่เราคาดหวังไปให้กับ React ในรูปของ JSX จากนั้น React จะเป็นคนจัดการงานในส่วนของการอัพเดท UI บนหน้าจอให้กับเรา เมื่อข้อมูลมีการเปลี่ยนแปลง React จะการันตีว่าสิ่งที่แสดงผลบนหน้าจอนั้นตรงกับผลลัพธ์ที่ส่งไปให้ล่าสุด

**Challenge**
```
ลองสร้าง Todo App ง่ายๆ ด้วย javascript โดยไม่พึ่ง library อะไรเลย
```

...เรามาเริ่มมาดูหน้าตาของ React กัน

### ยุคเริ่มต้น

ในการเขียน UI แน่นอนว่าจะต้องมีสิ่งที่ user สามารถสื่อสารกับ application ของเราได้ ใน React เราจะเรียกข้อมูลนั้นว่า state เช่น ข้อความที่ user พิมลงใน input หากเราต้องการนำข้อความนั้นมาประมวลผล เราจะสามารถเก็บข้อความนั้นเป็น state อยู่ภายใน React component ได้ ซึ่งในช่วงแรกๆ (ก่อน React v16.8) เราจะเขียน React component ในรูปแบบของ class เป็นส่วนใหญ่ เนื่องจาก ณ ตอนนั้น functional component ยังไม่สามารถเก็บ state ภายในตัวเองได้

> ในคอร์สนี้เราจะใช้แต่ functional component เท่านั้น เพราะในปัจจุบันแทบจะไม่มีใครเขียน class component แล้ว ส่วนเหตุผลเดี๋ยวเราไปดูในตอนหน้ากัน

React เริ่มจากการเป็น library เล็กๆที่ใช้ในการสร้าง UI ดังนั้นในยุคแรกๆ เราจะเห็นว่ามี libraries ใน ecosystem ต่างๆเกิดขึ้นมากมายเพื่อมา support react อย่างเช่น

- `react-router`: ใช้ในการจัดการ routing
- `react-redux`: เชื่อม redux ซึ่งใช้จัดการ global state
- `react-motion`: ใช้สร้าง animation

นับตั้งแต่นั้น react ก็เริ่มได้รับความนิยมมากขึ้น เนื่องมาจาก
	• concept ที่แตกต่าง แต่เข้าใจได้ง่าย
	• สามารถนำไปใช้ได้กับโปรเจคที่มีอยู่แล้ว ไม่ว่าจะเป็น PHP หรือ JS framework อื่นๆ
	• maintain โดย facebook มีการพัฒนาอยู่ตลอดเวลา

จุดที่น่าสนใจเกิดขึ้นในปี 2015, ทาง react team ได้ปล่อย major change v0.14 ออกมา ซึ่งสิ่งที่สำคัญก็คือการแยก react ออกจาก react-dom

สาเหตุที่แยกออกมาเนื่องจากว่าช่วงนั้นเริ่มมี library react ออกมาเพิ่มขึ้น เช่น react-native, react-art, react-canvas, and react-three มันเริ่มทำให้เห็นการทำงานที่ชัดเจนมากขึ้น เพราะ library พวกนี้รวมถึง react-dom เกี่ยวข้องกับการ render ทั้งสิ้น แค่ใช้ใน platform ที่แตกต่างกัน

react team ก็เลยตัดสินใจแยก react core ที่เก็บ Reconciliation algorithm ไว้ ออกมาเป็น standalone package ที่ชื่อ react ผลที่ตามมาคือ คำว่า virtual dom ก็จะหายไปด้วย เพราะว่าสิ่งที่อยู่ใน package react ไม่ได้มีอะไรเกี่ยวข้องกับ DOM อีกต่อไป

### จุดเปลี่ยนที่สำคัญ

ประมาณปี 2017, React v15 เริ่มจนมุม เนื่องจาก
	• feature ที่ community request อย่างเช่น render เป็น array ได้ หรือการใช้ <Fragment />
	• ErrorBoundary ที่มีอยู่ครึ่งๆกลางๆ แทบจะไม่มีใครรู้ว่ามี
	• ที่สำคัญที่สุดคือเรื่อง Performance limitation ที่ไม่สามารถรองรับการคำนวณใหญ่ๆได้ (React อัพเดท UI ไม่ทัน)
  
ผมคงจะไม่อธิบายถึงรายละเอียด แต่โดยสรุปคือ React v15 นั้นถูกเขียนขึ้นในลักษะ synchronous หมายความว่า React ได้รับคำสั่งอะไรมาก็จะทำตามให้เสร็จทันทีจากนั้นค่อยทำงานที่อยู่ในคิวต่อไป

ดังนั้นถ้าเกิดมีงานเกิดขึ้นเยอะเกินไป (รวมถึงขนาดของงานด้วย) เช่น user พิมข้อความใน input และแต่ละตัวอักษรมีการคำนวณเกิดขึ้นเป็นแสนๆ loop ก่อนที่ React จะสามารถอัพเดทผลลัพธ์บนหน้าจอได้ จะทำให้ user รู้สึกถึงความหน่วงเวลาพิม, lag หรือบางครั้งอาจค้างไปเลยก็ได้ เพราะ React ไม่ฉลาดเพียงพอ

ทางทีม React เลยจำเป็นต้องเขียน react ขึ้นมาใหม่ใน v16 เพื่อให้โครงสร้างการทำงานของ React นั้นรองรับการทำงานแบบ asynchronous ได้ และใน React v18 ที่กำลังจะมาถึงนี้ ประมาณต้นปี 2022 จะมีการทำงานเป็น asynchronous เป็นค่าพื้นฐานเลย

### อีกหนึ่งจุดเปลี่ยนสำคัญ

คือ v16.8 ซึ่ง React team ได้นำเสนอสิ่งที่เรียกว่า react hook ที่ทำให้ functional component สามารถเก็บ state ได้ นับว่าเปลี่ยนการเขียน React แบบเดิมๆไปจาก class component ไปเลย เพราะการเขียนเป็น react hook มีข้อดีคร่าวๆ ดังนี้:

- ทำให้โค้ดอ่านง่ายขึ้น
- สร้าง logic ที่สามารถทำไปใช้งานได้หลายๆที่โดยไม่ทำให้เกิด HOC hell
  ```js
  export default withAuth(withUser(withWTF(YourComponent)))
  ```

> ปล. class component ไม่ได้หายไปนะ ยังมีบางเคสที่ต้องใช้ class อย่างเช่น [Document component](https://github.com/vercel/next.js/blob/8b12b174e50209b0c71e3dd588c7a0871fe79598/packages/next/pages/_document.tsx?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L164) ใน NextJS เป็นต้น

## อนาคต

ใน version 18 ที่กำลังจะมาถึงนี้เรียกได้ว่าเป็นจุดเริ่มต้นของ React ยุคใหม่เลยก็ว่าได้ เพราะการที่ React ทำงานในโหมด asynchronous ได้ ทั้งใน client & servide side จะเปิดโอกาสให้เราสามารถสร้าง UX ที่ดีมากๆให้กับทั้ง user และ โปรแกรมเมอร์ ได้ เช่น

- การลด bundle size ให้เล็กที่สุด ไม่ว่าจะใช้ Server component หรือ lazy + Suspense
- แพคเก็จ react ใหม่ๆ เช่น react-fetch, react-cache ที่ใช้ในการทำ data fetching ที่มีประสิทธิภาพสูง
- เครื่องมือสำหรับ developer เช่น react devtools ที่สามารถ track การทำงานในโหมด asynchronous ได้
- ทำให้เราควบคุมการจัดลำดับงาน และบอก React ได้ว่างานไหนสำคัญ ผ่าน [startTransition API](https://reactjs.org/docs/concurrent-mode-patterns.html#transitions)

---

📚 อ้างอิง

- https://indepth.dev/in-depth-explanation-of-state-and-props-update-in-react/
- https://indepth.dev/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber
- [[JSConfUS 2013] Tom Occhino and Jordan Walke: JS Apps at Facebook](https://www.youtube.com/watch?v=GW0rj4sNH2w&t=186s)
- [006 - Origins of React](https://www.youtube.com/watch?v=yiCnfJ1rflI&t=1759s)
- [Introduction to React.js](https://www.youtube.com/watch?v=XxVg_s8xAms)
- [Pete Hunt - The Secrets of React's Virtual DOM (FutureJS 2014)](https://www.youtube.com/watch?v=-DX3vJiqxm4&t=1s)
- https://reactjs.org/blog/2015/10/07/react-v0.14.html#changelog
- [Andrew Clark: What's Next for React — ReactNext 2016](https://www.youtube.com/watch?v=aV1271hd9ew)
- https://github.com/acdlite/react-fiber-architecture
- https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/
- [Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)
- [SMOOSHCAST: React Fiber Deep Dive with Dan Abramov](https://www.youtube.com/watch?v=aS41Y_eyNrU)
- [Why, What, and How of React Fiber with Dan Abramov and Andrew Clark](https://www.youtube.com/watch?v=crM1iRVGpGQ)
- [Brief Overview of React Fiber - A Tutorial on its Features and Advantages](https://www.youtube.com/watch?v=0fUmOPQUv-Q)
- https://reactjs.org/docs/codebase-overview.html#fiber-reconciler
- https://reactjs.org/docs/implementation-notes.html
- https://reactjs.org/docs/design-principles.html



