# EXAM ANALYSIS SHEET — Tờ điền 5 phút đầu giờ

In tờ này ra hoặc chép tay lại. Vào phòng thi, **đọc đề và điền đủ 10 ô trước khi gõ bất kỳ dòng code nào.** Mỗi ô chỉ thẳng file phải sửa. Đề nào của trường cũng chỉ xoay quanh đúng 10 biến số này (đã kiểm chứng qua 2 đề FA25 + SU25).

## Bảng điền

| # | Biến số | Tìm ở đâu trong đề | Điền giá trị của đề | Sửa vào file nào |
|---|---|---|---|---|
| 1 | Tên project | Mục IMPORTANT, dòng "Create a new project... named ___" | ______________________ | Tên thư mục khi chạy express-generator |
| 2 | Tên database | Dòng "create Mongo database with the name ___" | ______________________ | `.env` → MONGO_URI (phần sau dấu `/` cuối) |
| 3 | JWT secret format | Task 02, câu "The secret key of JWT must be ___" — nhìn KỸ ví dụ trong ngoặc | ______________________ | `.env` → JWT_SECRET |
| 4 | Route sinh JWT (API) | Task 02, gạch đầu dòng "___ for generating the JWT" | ______________________ | `routes/auth.route.js` → dòng `router.post('...', auth.apiLogin)` |
| 5 | Route login view | Task 03 mục 1, "route path will match requests to: ___" | ______________________ | `routes/auth.route.js` (2 dòng signin) + `protectView('...')` trong route view + `action` trong login.ejs |
| 6 | Prefix API | Task 02, vd `/api/apartments` hay `/api/v1/nations` | ______________________ | `app.js` → dòng `app.use('...', apartmentRouter)` |
| 7 | Prefix view | Task 03, vd `/view/residents` hay `/page/foods` | ______________________ | `app.js` + `redirect(...)` trong auth.controller + `action`/`fetch` trong view EJS |
| 8 | Tên field account | Schema account trong đề (us/pw? name/key?) | ______________________ | `models/account.model.js` + `auth.controller.js` + 2 ô input trong `login.ejs` |
| 9 | Schema cha + con | Phần "Your database contains 3 collections" — chép nguyên required/unique/min/max | cha: ____________ con: ____________ | `models/*.model.js` (từng field, từng min/max) + destructure trong controllers + form trong view |
| 10 | Field "twist" | Task 03 mục 4, các gạch đầu dòng in nghiêng | ______________________ | Controller view + form EJS (FA25: rating→★; SU25: nhập age→lưu yOB) |

## Sau khi điền xong — thứ tự thao tác (dán cạnh màn hình)

1. Generator + npm install + copy kit + tạo `.env` (ô 1, 2, 3)
2. Find & Replace toàn project (`Ctrl+Shift+H`, bật **Match Case**, thay theo thứ tự):
   - `resident` → tên con thường • `Resident` → tên con Hoa
   - `residents` sẽ tự đổi theo; kiểm tra lại số nhiều bất quy tắc nếu có
   - `apartment` → tên cha thường • `Apartment` → tên cha Hoa
3. Sửa models theo ô 9 (field nào của kit không có trong đề → xóa; thiếu → thêm)
4. Sửa route path theo ô 4, 5, 6, 7 — **CẢNH BÁO: 2 đề cũ đã HOÁN ĐỔI /auth/login và /auth/signin cho nhau, tuyệt đối không làm theo trí nhớ**
5. Đổi tên file JSON trong `data/` + sửa `seedMap` trong `utils/seed.js` → chạy seed → check Compass
6. Test 9 request Postman (theo POSTMAN_GUIDE) → xong Task 01 + 02
7. Sửa 2 file views theo ô 8, 9, 10 → test browser
8. Checklist nộp bài (dưới đây)

## Checklist TRƯỚC KHI NỘP (grader gắt — mục nào cũng là điểm)

- [ ] `.env` đủ 3 biến, secret đúng format ví dụ trong đề (từng ký tự!)
- [ ] Tên project + tên DB đúng nguyên văn đề
- [ ] `node --check` từng file .js không lỗi
- [ ] **Xóa file thừa của express-generator**: `routes/index.js`, `routes/users.js`, `views/index.ejs`, `views/error.ejs`, thư mục `public/stylesheets` nếu không dùng
- [ ] **Xóa `server.js` nếu chạy bằng `bin/www` của generator** (2 file cùng listen là "irrelevant content")
- [ ] Xóa `data/` file JSON nào không thuộc đề, xóa request test còn sót, console.log debug
- [ ] Đọc lướt từng file lần cuối: không còn comment thừa, không còn tên biến của đề cũ (search nhanh chữ `food`, `nation`, `resident`, `apartment` — chỉ tên của đề hiện tại được phép xuất hiện)
- [ ] Chạy full flow lần cuối: login sai → error; login đúng → list; add/edit/delete; 9 request Postman
