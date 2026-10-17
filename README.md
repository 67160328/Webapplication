# Web Application & GitHub Actions CI/CD Lab

โครงงานปฏิบัติการพัฒนาเว็บแอปพลิเคชัน คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา

- **รหัสนิสิต:** 67160328
- **สถาบัน:** มหาวิทยาลัยบูรพา (Burapha University)
- **GitHub Repository:** [https://github.com/67160328/Webapplication](https://github.com/67160328/Webapplication)
- **GitHub Pages URL:** [https://67160328.github.io/Webapplication/](https://67160328.github.io/Webapplication/)

---

## 📋 สรุปการตอบคำถามท้ายแลป (Lab Questions & Answers)

### 1) GitHub Actions แตกต่างจาก GitHub Pages อย่างไร?
- **GitHub Actions:** เป็นระบบ Automation / CI/CD (Continuous Integration / Continuous Deployment) ทำหน้าที่รัน Pipeline เช่น ทดสอบโค้ด ตรวจสอบความถูกต้อง (Test/Lint) และ Build หรือเตรียมไฟล์โดยอัตโนมัติเมื่อเกิด Event (เช่น git push)
- **GitHub Pages:** เป็นบริการ Static Web Hosting ที่ทำหน้าที่รับไฟล์ HTML, CSS, JavaScript และ Assets มาเผยแพร่ออนไลน์ผ่านเว็บเบราว์เซอร์ด้วย Public URL ที่ใครก็สามารถเข้าถึงได้

### 2) เหตุใดจึงเลือก trigger ด้วย push ที่ branch main?
- เนื่องจาก branch `main` ถือเป็น Production Branch หรือเวอร์ชันหลักที่พร้อมส่งมอบ เมื่อนักพัฒนาตรวจสอบและผสานรวมโค้ดเรียบร้อย การ Trigger ด้วย Push ไปยัง branch `main` จะช่วยให้กระบวนการ Continuous Deployment อัปเดตขึ้นสู่หน้าเว็บจริงโดยอัตโนมัติทันทีที่โค้ดพร้อมใช้งาน

### 3) ถ้าแก้ไฟล์ในเครื่องแต่ไม่ได้ push เว็บไซต์จะเปลี่ยนหรือไม่ เพราะเหตุใด?
- **ไม่เปลี่ยนแปลง**: เพราะการแก้ไขไฟล์ภายในเครื่อง (Local Environment) จะยังคงอยู่แค่ใน Hard disk หรือ Local Git จนกว่าจะสั่ง `git push` เพื่อนำ Commit ส่งขึ้น Remote Repository บน GitHub ซึ่งเป็นจุดที่ส่ง Event ให้ GitHub Actions เริ่มทำงานและ Deploy หน้าเว็บใหม่

### 4) เหตุใดโปรเจกต์ PHP + MySQL จึงไม่สามารถนำไปรันบน GitHub Pages ได้โดยตรง?
- เนื่องจาก GitHub Pages ให้บริการเฉพาะ **Static Web Hosting** (เว็บที่รันฝั่ง Client คือ HTML/CSS/JS) โดยไม่มี PHP Runtime Interpreter หรือ Database Server (MySQL) ฝั่ง Backend มารองรับ หากต้องการใช้งาน PHP/MySQL จำเป็นต้องแยกส่วน Frontend มาไว้บน GitHub Pages หรือ Deploy บน Hosting/PaaS ที่รองรับ Server-side Scripting เช่น Apache/Nginx, Cloud VPS หรือ Docker Container

### 5) อธิบายขั้นตอนการค้นหาสาเหตุ เมื่อ Workflow มีสถานะ Failed
1. เข้าไปที่เมนู **Actions** บน GitHub Repository
2. เลือกรายการ Workflow Run ที่แสดงสัญลักษณ์กากบาทสีแดง (Failed)
3. คลิกเข้าไปดูในส่วนของ Job (เช่น `deploy`)
4. คลี่ดูขั้นตอน (Step) ที่เกิด Error สีแดง เพื่ออ่านข้อความ Error Log โดยละเอียด
5. วิเคราะห์จุดผิดพลาด (เช่น Syntax YAML ผิด, ไฟล์ขาดหายจาก Pre-check, หรือการตั้งค่า Permissions ใน Repository Settings > Pages ไม่ถูกต้อง) แล้วแก้ไขโค้ดบนเครื่อง จากนั้น Commit และ Push เพื่อให้ Actions ทำงานใหม่อีกครั้ง