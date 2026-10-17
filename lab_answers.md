# เอกสารคำตอบคำถามท้ายแลป (Lab 14: GitHub Actions + GitHub Pages)

**ข้อมูลนิสิต:**
- **รหัสนิสิต:** 67160328
- **คณะ:** วิทยาการสารสนเทศ มหาวิทยาลัยบูรพา (Burapha University)
- **GitHub Repository:** [https://github.com/67160328/Webapplication](https://github.com/67160328/Webapplication)
- **GitHub Pages URL:** [https://67160328.github.io/Webapplication/](https://67160328.github.io/Webapplication/)

---

## ข้อ 1) GitHub Actions แตกต่างจาก GitHub Pages อย่างไร?

### คำตอบ:
| ประเด็น | GitHub Actions | GitHub Pages |
| :--- | :--- | :--- |
| **บทบาทหน้าที่หลัก** | เป็นระบบ **CI/CD Automation Platform** สำหรับรัน Workflow อัตโนมัติ | เป็นบริการ **Static Web Hosting** สำหรับเผยแพร่เว็บไซต์สู่สาธารณะ |
| **การทำงาน** | รันชุดคำสั่ง / สคริปต์บน Virtual Machine (Runner เช่น Ubuntu) เมื่อเกิด Event เช่น push, pull request, schedule | นำไฟล์ HTML, CSS, JavaScript, รูปภาพ หรือเว็บที่สร้างเสร็จแล้วไปโฮสต์บน Web Server เพื่อเปิดผ่าน Browser ได้ทั่วโลก |
| **รูปแบบผลลัพธ์** | Logs, Build Artifacts, Test Results, หรือทริกเกอร์ให้ส่งต่อ Deployment | URL หน้าเว็บไซต์สาธารณะ เช่น `https://<username>.github.io/<repo>/` |

**สรุป:** GitHub Actions เป็น "คนทำงานอัตโนมัติ" (ตรวจสอบ, เตรียมไฟล์, สั่ง deploy) ส่วน GitHub Pages เป็น "พื้นที่จัดแสดงหน้าเว็บ"

---

## ข้อ 2) เหตุใดจึงเลือก trigger ด้วย push ที่ branch main?

### คำตอบ:
1. **เป็นมาตรฐานของ Git Branching Strategy:** Branch `main` ถือเป็นสาขาหลัก (Production / Stable Branch) ที่เก็บโค้ดที่ผ่านการทดสอบและพร้อมเผยแพร่สู่ผู้ใช้งานจริง
2. **การทำ Continuous Deployment (CD):** เมื่อนักพัฒนาทำการผสานโค้ด (Merge) หรือ Push ขึ้นสู่ `main` ระบบจะทำการ Deploy ขึ้น Production ทันทีโดยไม่ต้องคอยกดมือ (Manual Deployment)
3. **ป้องกันการ Deploy โค้ดที่ยังไม่พร้อม:** หากตั้ง Trigger บน Branch อื่นๆ (เช่น `dev`, `feature`) อาจทำให้เว็บไซต์หลักบน Pages ถูกเขียนทับด้วยฟีเจอร์ที่ยังสร้างไม่เสร็จหรือยังมีข้อผิดพลาด

---

## ข้อ 3) ถ้าแก้ไฟล์ในเครื่องแต่ไม่ได้ push เว็บไซต์จะเปลี่ยนหรือไม่ เพราะเหตุใด?

### คำตอบ:
**ไม่เปลี่ยนแปลง** 

**เพราะเหตุผลดังนี้:**
1. การแก้ไขไฟล์บนเครื่องจะส่งผลเฉพาะใน **Local Working Directory** หรือถ้าทำ `git commit` ก็จะอยู่แค่ใน **Local Repository** ภายในเครื่องคอมพิวเตอร์ของเราเท่านั้น
2. GitHub Repository (Remote) และ GitHub Actions จะยังไม่รับรู้การเปลี่ยนแปลงใดๆ จนกว่าจะสั่งคำสั่ง `git push`
3. เมื่อไม่มีข้อมูลใหม่ถูก Push ขึ้นไป Event `push` ก็จะไม่ถูกจุดชนวน (Trigger) ทำให้ GitHub Actions ไม่ได้เริ่มรัน Workflow เพื่อสร้างและ Deploy Artifact ตัวใหม่ขึ้น GitHub Pages

---

## ข้อ 4) เหตุใดโปรเจกต์ PHP + MySQL จึงไม่สามารถนำไปรันบน GitHub Pages ได้โดยตรง?

### คำตอบ:
1. **GitHub Pages รองรับเฉพาะ Static Content เท่านั้น:** ได้แก่ HTML, CSS, Client-side JavaScript, รูปภาพ และฟอนต์
2. **ไม่มี Server-Side Runtime:** บน GitHub Pages ไม่มี PHP Interpreter หรือเว็บเซิร์ฟเวอร์แบบ Dynamic (เช่น Apache หรือ Nginx ที่รัน PHP-FPM) สำหรับประมวลผลโค้ดฝั่ง Server ก่อนส่งผลลัพธ์กลับมายังเบราว์เซอร์
3. **ไม่มี Database Server:** ไม่มีระบบฐานข้อมูล เช่น MySQL, MariaDB หรือ Database Server ใดๆ ให้เชื่อมต่อ
4. **แนวทางแก้ไขหากต้องใช้โปรเจกต์ดังกล่าว:**
   - ต้องนำส่วน Backend (PHP/MySQL) ไป Deploy บน Hosting หรือ Cloud Service ที่รองรับ Server-side เช่น Cloud VPS, Docker Hosting, Heroku, Render, AWS, หรือ GCP
   - หรือแยกส่วนหน้าบ้าน (Frontend) เป็น Single Page Application (SPA) เพื่อโฮสต์บน GitHub Pages แล้วเรียก API ไปยัง Server ของ PHP แทน

---

## ข้อ 5) อธิบายขั้นตอนการค้นหาสาเหตุ เมื่อ Workflow มีสถานะ Failed

### คำตอบ:
เมื่อ Workflow ขึ้นสัญลักษณ์สีแดง (Failed ❌) สามารถปฏิบัติตามลำดับขั้นตอนดังนี้:

1. **เข้าสู่หน้าตรวจสอบ (Actions Tab):**
   - ไปที่หน้า GitHub Repository แล้วคลิกแท็บ **Actions** ด้านบน
2. **เลือก Commit หรือ Run ล่าสุดที่มีปัญหา:**
   - มองหารายการที่มีไอคอนกากบาทสีแดง `❌` แล้วคลิกเข้าไปดูรายละเอียดของ Workflow Run นั้น
3. **เลือก Job ที่ล้มเหลว:**
   - คลิกที่ชื่อ Job ทางซ้ายมือ (เช่น Job `deploy`)
4. **คลี่ดู Step ที่เกิด Error (Inspect Error Logs):**
   - GitHub Actions จะขยายขั้นตอน (Step) ที่เกิดปัญหาโดยอัตโนมัติ หรือให้คลิกคลี่ลูกศรที่ขั้นตอนที่ขึ้นเครื่องหมายสีแดง
   - สังเกตบรรทัดที่เป็นข้อความสีแดงหรือคำว่า `Error:`, `exit 1` เช่น:
     - หากเกิดจาก Challenge Pre-check: จะฟ้องว่า `Error: index.html missing` หรือชื่อไฟล์ไม่ตรง
     - หากเกิดจากสิทธิ์ Pages: จะแสดง `Permission to pages denied` (ต้องตรวจสอบ Settings > Pages)
     - หากเกิดจากไวยากรณ์ YAML: จะฟ้องตั้งแต่ต้นว่า `Invalid workflow file`
5. **วิเคราะห์และแก้ไขโค้ดบนเครื่อง (Fix & Re-push):**
   - แก้ไขไฟล์โค้ดหรือการตั้งค่าในเครื่องคอมพิวเตอร์ให้ถูกต้อง
   - ใช้คำสั่ง `git add .`, `git commit -m "fix: ..."` และ `git push` อีกครั้ง เพื่อให้ Actions ทำงานและตรวจสอบว่าขึ้นเครื่องหมายถูกสีเขียว (Passed ✅)
