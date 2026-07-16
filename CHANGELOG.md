# CHANGELOG — SDN302 Source Kit

## [v0.2.0] - 2026-07-16 — Học từ đề SP26 (Pen Management) + src giảng viên

### 🔴 BREAKING — đổi kiến trúc auth cho view
- **JWT KHÔNG còn được lưu trong cookie.** Đề SP26 ghi rõ: "Do not store the JWT in cookies or session storage".
- Chuẩn mới: **API = JWT Bearer header only** (`protectApi`) · **View = express-session giữ trạng thái đăng nhập** (`protectView`), session KHÔNG chứa JWT.
- Lý do chọn 1 đường thay vì 2 chế độ: cách này hợp lệ với CẢ 3 đề (FA25/SU25 không ràng buộc nơi lưu JWT; SP26 cấm cookie) → không phải quyết định gì trong phòng thi, ít nhánh, ít bug.
- Bỏ `cookie-parser`, thêm `express-session` (số dependency không đổi). Thêm `SESSION_SECRET` vào .env (không hardcode như src giảng viên).

### ADDED
- `GET /view/:id` → mở sẵn modal Edit của item đó (đề nào cũng nhắc route `/:id` cho update; trước đây kit trả 404).
- `match: [/^[A-Za-z ]+$/]` trong model → chặn "chỉ letters+space" phía **server** (HTML pattern chỉ chặn browser, Postman lọt).
- `logout` + nút Logout trên view (tiện test lại luồng login nhiều lần).
- 4 snippets mới: `!sess`, `!percent`, `!icon`, `!img`. Tổng 22 snippets.
- Twist library: SP26 = `off` decimal 0–1 → hiển thị %, `gender` Boolean → icon nam/nữ, `image` hiển thị ảnh trong card.

### CHANGED
- Controller create/update dùng `{ ...req.body }` thay destructure từng field → Mongoose strict mode tự loại field lạ, **không bao giờ sót field khi chuyển đề** (đây là bug class #1 của dự án: solution repo đầu tiên destructure nhầm field `population` của đề khác).
- `!model`, `!crud`, `!jwtauth`, `!loginview`, `!env` cập nhật theo các thay đổi trên.
- EXAM_ANALYSIS_SHEET: bổ sung biến thể SP26 (secret `!`, `/auth/tokens`, `/auth/access`, `/rest`, `/admin`, field `name/code`).
- SNIPPET_CHEATSHEET tạo lại (bản v0.1.0 tải về bị lỗi 0 KB).

### PATTERN LIBRARY (xác nhận lần 3 qua FA25 + SU25 + SP26)
1. 3 collections: cha (name unique) + con (ref cha, min/max, Boolean default) + account
2. Task 01 generator+import (1đ) / Task 02 API cha + JWT (5đ) / Task 03 views con (4đ)
3. Delete-guard: "Cannot delete X because it has associated Ys"
4. Login view: bcrypt + hiện error khi fail + redirect list
5. Card view (cấm table) + modal add/edit + confirm & notify khi delete
6. Name field: chỉ letters+space, unique · 1+ Boolean toggle · 1 select từ cha
7. Mỗi đề có 1–2 twist hiển thị: FA25 ★ · SU25 age↔yOB · SP26 %/icon/image
8. Password account của cả 3 đề = `123456789` (hash bcrypt GIỐNG HỆT NHAU)
9. JSON dùng Extended JSON `{$oid}` → seed phải revive

### THƯ VIỆN LỖI (cộng dồn, 17 lỗi) — xem HANDOVER mục 3.3

## [v0.1.0] - 2026-07-15 — Khởi tạo từ FA25 + SU25
- Cấu trúc kit, auth hybrid (Bearer + cookie), CRUD + delete-guard, errorHandler, seed `$oid`, views EJS/Bootstrap, 18 snippets, bộ tài liệu.
