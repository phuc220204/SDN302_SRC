# EXAM GUIDE — Quy trình 85 phút (ưu tiên chắc chắn qua môn: Task 1 + Task 2 = 6 điểm)

Ví dụ theo đề SU25, StudentCode **SE181834**. Đề khác thì thay tên tương ứng.

---

## GIAI ĐOẠN 0 — Đọc đề (5 phút, KHÔNG ĐƯỢC BỎ)

Gạch chân/ghi ra giấy 6 thứ (giữa các đề chúng LUÔN đổi):
1. Tên project: `SDN302_PE_SU25_SE181834` (copy nguyên văn, kể cả typo của đề)
2. Tên DB: `SDN302_PE_SU25_SE181834DB`
3. Format JWT secret: `SE181834!!` (SU25 dùng `!!`; FA25 dùng `!@` — nhìn kỹ ví dụ trong đề)
4. Route sinh JWT (API) vs route login view — **SU25: API=/auth/login, view=/auth/signin; FA25 NGƯỢC LẠI**
5. Prefix API (`/api/apartments` hay `/api/v1/...`) và prefix view (`/view/...` hay `/page/...`)
6. Field đặc biệt của form (SU25: age↔yOB; FA25: rating→★) + ràng buộc min/max từng field

## GIAI ĐOẠN 1 — Task 01: Setup + Import (10-12 phút → 1 điểm)

```bash
# 1. Tạo project bằng express-generator (đề yêu cầu tường minh -> phải dùng)
npx express-generator --view=ejs SDN302_PE_SU5_SE181834
cd SDN302_PE_SU5_SE181834

# 2. Cài thêm package của kit
npm install
npm install mongoose jsonwebtoken bcrypt dotenv cookie-parser
npm install --save-dev nodemon
```

3. Copy từ Source Kit vào project: `config/ controllers/ middlewares/ models/ routes/ utils/ views/` và **ghi đè `app.js`** (app.js của kit tương thích `bin/www` của generator). Xóa `routes/index.js`, `routes/users.js`, `views/*.jade|*.ejs` mặc định của generator nếu thừa.

4. Tạo `.env` từ `.env.example` — điền ngay 3 biến. **Đây là điều kiện 0 điểm, làm trước mọi thứ khác.**

5. Copy các file JSON của đề vào `data/` (đặt tên khớp `seedMap`), rồi:
```bash
node utils/seed.js
```
Mở Compass xác nhận: đúng tên DB, đủ 3 collections, đủ số documents.

6. Chạy thử server ngay: `npm start` (generator: `node ./bin/www` — PORT lấy từ .env vì app.js đã load dotenv). Thấy `MongoDB connected: ...` là xong Task 01.

**Nếu seed lỗi** → dùng Compass import từng file JSON thủ công (5 phút, không được sa lầy debug).

## GIAI ĐOẠN 2 — Task 02: REST API + JWT (25-30 phút → 5 điểm, QUAN TRỌNG NHẤT)

Kit đã có sẵn toàn bộ — việc của Phúc là **đổi tên cho khớp đề** rồi test:

1. `models/`: đối chiếu từng field với schema trong đề (required/unique/min/max). Sai min/max là mất điểm validation.
2. `routes/auth.route.js`: xác nhận path API đúng đề (SU25: `POST /auth/login`).
3. `app.js`: xác nhận prefix `app.use('/api/apartments', ...)`.
4. `controllers/apartment.controller.js`: đối chiếu field + message delete-guard giống ví dụ trong đề.

### Test bằng Postman (theo đúng thứ tự, ~10 phút)

| # | Request | Kỳ vọng |
|---|---|---|
| 1 | `POST /auth/login` body JSON `{"us":"bizlo","pw":"123456789"}` | 200 + `token` |
| 2 | Sai pw | 400 + message |
| 3 | `GET /api/apartments` **không** token | 401 |
| 4 | `GET /api/apartments` + Header `Authorization: Bearer <token>` | 200 + 4 apartments |
| 5 | `GET /api/apartments/:id` (id thật từ bước 4) | 200 |
| 6 | `POST /api/apartments` `{"apartmentName":"Test Tower","totalOfFloors":10}` | 201 |
| 7 | `PUT /api/apartments/:id` đổi totalOfFloors | 200 |
| 8 | `DELETE` apartment **có** residents (vd Joe Tower) | 400 "Cannot delete..." |
| 9 | `DELETE` apartment vừa tạo ở bước 6 (không có resident) | 200 |

Password của account trong JSON đề luôn là `123456789` (hash bcrypt 2 đề giống hệt nhau).

**Qua được bảng này = cầm chắc ~6 điểm = qua môn.** Lúc này mới sang Task 03.

## GIAI ĐOẠN 3 — Task 03: Views (30-35 phút → 4 điểm)

Kit có sẵn `login.ejs` + `residents.ejs`. Đổi tên field theo đề rồi test trên browser:

1. `/auth/signin` → login sai → **thấy error đỏ trên form** (yêu cầu đề). Login đúng → redirect list.
2. List hiển thị card (không phải table) + đủ field đề liệt kê + tên collection cha (populate).
3. Add modal: điền sai (tên có số, floor 50, age 90) → HTML validation chặn; tên trùng → error hiển thị trên trang.
4. Edit modal: dữ liệu cũ được pre-fill, select đúng option, switch đúng trạng thái.
5. Delete: có `confirm()` → có `alert()` kết quả → list refresh.
6. Field đặc biệt: **SU25** nhập Age nhưng Compass phải thấy `yOB` đúng (2026 - age); **FA25** rating hiển thị ★.

## GIAI ĐOẠN 4 — Rà cuối (5-8 phút)

```bash
# check syntax mọi file js (điều kiện 0 điểm của đề)
for f in app.js server.js config/*.js models/*.js middlewares/*.js controllers/*.js routes/*.js utils/*.js; do node --check "$f" && echo "OK $f"; done
```
- Chạy lại full flow 1 lần: login → add → edit → delete → Postman GET.
- Mở `.env` nhìn lại 3 biến lần cuối. Xóa file/comment không liên quan.

## Xử lý sự cố nhanh

| Triệu chứng | Nguyên nhân thường gặp |
|---|---|
| 401 dù đã gửi token | Thiếu chữ `Bearer ` trong header / secret .env khác secret lúc sign (restart server sau khi sửa .env) |
| `secretOrPrivateKey must have a value` | Chưa load dotenv hoặc tên biến .env sai `JWT_SECRET` |
| Populate ra null | Chuỗi `ref` không khớp tên model, hoặc data import trước khi sửa model thì check lại ObjectId |
| Form submit không có field boolean | Checkbox bỏ tick sẽ KHÔNG gửi field → phải `=== 'on'`, không được "giữ giá trị cũ" |
| E11000 khi add | Trùng unique field — hiển thị message thân thiện, đừng để văng 500 |
| View đổi rồi không thấy khác | Cache browser — Ctrl+F5; hoặc đang sửa nhầm file view khác |
