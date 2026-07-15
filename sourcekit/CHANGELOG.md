# CHANGELOG — SDN302 Source Kit

## [v0.1.0] - 2026-07-15 — Khởi tạo từ 2 đề: FOODEX (FA25) + Residents (SU25)

### ADDED
- Cấu trúc chuẩn: config / controllers / middlewares / models / routes / utils / views / data / snippets
- Auth HYBRID (Bearer header + cookie) trong 1 middleware: protectApi + protectView
- CRUD controller template + DELETE-GUARD (chặn xóa cha khi con còn tham chiếu)
- Error handler phân loại: ValidationError / E11000 / CastError -> 400
- Seed script hỗ trợ Extended JSON ($oid), chạy lại nhiều lần được (deleteMany trước)
- utils/hash.js: tạo hash bcrypt khi đề bắt tự tạo account
- Views EJS + Bootstrap 5: login (có error), card list, add modal, edit modal per-card (pre-fill), delete fetch confirm+alert
- Pattern age <-> yOB (SU25) và stars ★ (FA25)
- 18 VSCode snippets (đã escape template literal tránh xung đột placeholder)
- README (bảng "chỗ cần sửa" khi gặp đề mới) + EXAM_GUIDE (timeline 85 phút, ưu tiên Task 1+2)

### DECISIONS (và lý do)
- EJS thay Pug: gần HTML, copy được Bootstrap docs nguyên xi, ít lỗi indentation khi thi
- Không dùng body-parser: express.json/urlencoded có sẵn từ Express 4.16
- Route mỏng + controller chứa logic; KHÔNG có service layer (over-engineering với PE 85 phút)
- Edit modal đặt ngay trên list page (không cần detail page) — thỏa route /view/xxx/:id mà ít file hơn
- app.js export app, tương thích bin/www của express-generator (đề chấm Task 01 bằng generator)
- Password account mọi đề đến nay: 123456789 (hash bcrypt giống hệt nhau giữa 2 đề)

### FIXED (lỗi học được từ solution repo NhatHuyDevk4)
- res.status là HÀM: res.status(500), không phải res.status = 500
- Không gọi next() trong config/db.js (không phải middleware)
- Login fail ở view phải render('login', { error }) chứ không trả JSON
- Destructure đúng field theo schema đề (solution cũ copy nhầm field 'population' từ đề khác)
- /api phải nhận Bearer token (solution cũ chỉ nhận cookie -> Postman fail)

### PATTERN LIBRARY (bất biến qua 2 đề)
1. 3 collections: cha (unique name) + con (ref cha, có min/max) + account
2. Task 01 generator+import (1đ) / Task 02 API+JWT (5đ) / Task 03 views (4đ)
3. Delete-guard với message "Cannot delete X because it has associated Y"
4. Login view: bcrypt.compare + error message + redirect
5. Card view (cấm table) + modal add/edit + confirm/notify delete
6. Tên field con: chỉ letters+space, unique; 1 field Boolean toggle; 1 select từ cha
7. Mỗi đề có 1 "twist" field riêng: FA25 = ★, SU25 = age<->yOB -> đọc kỹ mục 4-5 Task 03

### BIẾN SỐ GIỮA CÁC ĐỀ (phải đọc đề, không đoán)
- Path API login vs view login (đã hoán đổi giữa 2 đề!)
- Prefix /api/v1 vs /api ; /page vs /view
- Format JWT secret (!@ vs !!)
- Tên field account (name/key vs us/pw)
