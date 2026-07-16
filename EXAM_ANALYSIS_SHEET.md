# EXAM ANALYSIS SHEET v0.2.0 — Tờ điền 5 phút đầu giờ

In ra hoặc chép tay. Vào phòng thi: **đọc đề và điền đủ 10 ô TRƯỚC KHI gõ dòng code nào.** Mỗi ô chỉ thẳng file phải sửa. Ba đề đã kiểm chứng (FA25 / SU25 / SP26) đều chỉ xoay quanh đúng 10 biến số này.

## Bảng điền

| # | Biến số | Tìm ở đâu trong đề | Đã gặp (FA25 / SU25 / SP26) | Điền đề này | Sửa file nào |
|---|---|---|---|---|---|
| 1 | Tên project | "Create a new project ... named ___" | SDN302_FA25_x / SDN302_PE_SU5_x / SDN302_SP26_x | __________ | tên thư mục express-generator |
| 2 | Tên database | "create Mongo database with the name ___" | ..._StudentCodeDB | __________ | `.env` → MONGO_URI |
| 3 | **JWT secret** | Task 02 "secret key of JWT must be ___" — **soi ví dụ trong ngoặc** | `!@` / `!!` / **`!`** | __________ | `.env` → JWT_SECRET |
| 4 | Route sinh JWT (API) | Task 02 "___ to generate the JWT" | /auth/signin / /auth/login / **/auth/tokens** | __________ | `routes/auth.route.js` → `router.post('...', auth.apiLogin)` |
| 5 | Route login view | Task 03 mục 1 "route path will match requests to ___" | /auth/login / /auth/signin / **/auth/access** | __________ | auth.route (2 dòng) + `protectView('...')` + `action` login.ejs + redirect trong logout |
| 6 | Prefix API | Task 02 | /api/v1/nations / /api/apartments / **/rest/brands** | __________ | `app.js` |
| 7 | Prefix view | Task 03 | /page/foods / /view/residents / **/admin/pens** | __________ | `app.js` + `redirect()` trong auth.controller + `action`/`fetch` trong EJS |
| 8 | Field account | Schema account | name/key / us/pw / **name/code** | __________ | `models/account.model.js` + `auth.controller.js` + 2 input `login.ejs` |
| 9 | Schema cha + con | "Your database contains 3 collections" — chép NGUYÊN VĂN required/unique/min/max/default | — | cha: ______ con: ______ | `models/*.model.js` + form EJS |
| 10 | **Twist field** | Task 03 mục 4–5, các gạch đầu dòng in nghiêng | ★ rating / age↔yOB / **off→% + gender→icon + image** | __________ | controller view + form EJS (snippet `!stars` `!age` `!percent` `!icon` `!img`) |

> **Ghi chú v0.2.0 — không còn ô "JWT lưu ở đâu":** kit đã theo chuẩn **JWT chỉ ở Bearer header, view dùng session** → tự động thỏa note của SP26 *"Do not store the JWT in cookies or session storage"*, và cũng hợp lệ với FA25/SU25. Không phải quyết định gì thêm.

## Sau khi điền — thứ tự thao tác

1. Generator + `npm install` + `npm i mongoose jsonwebtoken bcrypt dotenv express-session` + copy kit + `.env` (ô 1,2,3)
2. Find & Replace toàn project (`Ctrl+Shift+H`, **bật Match Case**): `resident`→con thường · `Resident`→Con Hoa · `apartment`→cha thường · `Apartment`→Cha Hoa
3. Sửa models theo ô 9 (field thừa → xóa, thiếu → thêm; chép nguyên min/max/default)
4. Sửa route path theo ô 4,5,6,7 — **3 đề đã dùng 3 bộ path khác nhau, tuyệt đối không làm theo trí nhớ**
5. Đổi tên JSON trong `data/` + sửa `seedMap` → `node utils/seed.js` → check Compass
6. **Test 9 request Postman** → xong Task 01 + 02 (6 điểm)
7. Sửa views theo ô 8,9,10 → test browser
8. Checklist nộp bài ⬇

## ✅ CHECKLIST TRƯỚC KHI NỘP (grader gắt — mục nào cũng là điểm)

- [ ] `.env` đủ PORT + MONGO_URI + JWT_SECRET (+ SESSION_SECRET), secret **đúng từng ký tự** ví dụ đề
- [ ] Tên project + tên DB đúng **nguyên văn** đề (đề có typo cũng copy y nguyên)
- [ ] `node --check` mọi file .js không lỗi
- [ ] **Xóa file thừa express-generator**: `routes/index.js`, `routes/users.js`, `views/index.ejs`, `views/error.ejs`
- [ ] **Xóa `server.js`** nếu chạy bằng `bin/www` (2 file cùng listen = irrelevant content)
- [ ] Xóa dependency không dùng trong `package.json`, xóa `console.log` debug, xóa JSON không thuộc đề
- [ ] Search dấu vết đề cũ: `food` `nation` `resident` `apartment` `pen` `brand` — chỉ tên đề hiện tại được phép còn
- [ ] Chạy full flow lần cuối: login sai → error · login đúng → list · add/edit/delete · 9 request Postman
