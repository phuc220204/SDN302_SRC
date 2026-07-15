# KẾ HOẠCH ÔN 2 NGÀY — Mục tiêu: chắc Task 01 + 02 (6 điểm), với Task 03 làm được phần login + list

Nguyên tắc: Phúc KHÔNG cần học viết NodeJS trong 2 ngày — bất khả thi và không cần thiết. Phúc cần 3 kỹ năng hẹp hơn nhiều: (1) chạy đúng chuỗi lệnh setup, (2) ĐỌC HIỂU code kit để đổi đúng tên field, (3) test bằng Postman. Mỗi buổi dưới đây ~3 tiếng, có bài kiểm tra đầu ra rõ ràng — chưa đạt thì chưa sang buổi sau.

---

## NGÀY 1 — SÁNG: Dựng môi trường + hiểu kit chạy thế nào (3h)

**Việc 1 (45'): Môi trường.** Cài Node.js LTS (nodejs.org), MongoDB Community + Compass, Postman, VSCode. Kiểm tra: mở terminal gõ `node -v`, `npm -v` ra số version; mở Compass bấm Connect với `mongodb://localhost:27017` thấy kết nối được. Cài snippets vào VSCode (theo hướng dẫn đã gửi). *Đây là rủi ro lớn nhất của người mới — làm NGAY buổi đầu, kẹt thì còn thời gian xử lý.*

**Việc 2 (45'): Chạy kit bản HỌC (bản có comment).** Giải nén → `npm install` → tạo `.env` từ `.env.example` → `npm run seed` → mở Compass thấy 3 collections → `npm run dev` → mở `http://localhost:3000/auth/signin` login `bizlo / 123456789`.

**Việc 3 (90'): Đọc hiểu luồng chạy — quan trọng nhất ngày 1.** Mở lần lượt và đọc comment tiếng Việt trong từng file theo đúng thứ tự một request đi qua:

`app.js` → `routes/auth.route.js` → `controllers/auth.controller.js` → `middlewares/auth.middleware.js` → `models/resident.model.js` → `views/residents.ejs`

Vừa đọc vừa nghiệm bằng **Cheatsheet cú pháp** ở cuối file này. Bài tập nghiệm thu: tự vẽ ra giấy sơ đồ "browser gõ /view/residents → request chạy qua những file nào, theo thứ tự nào, tại sao bị đá về login khi chưa có cookie". Vẽ được = hiểu đủ để thi.

**Đầu ra Ngày 1 Sáng:** server chạy, login được, vẽ được sơ đồ luồng.

## NGÀY 1 — CHIỀU: Postman + Task 02 (3h)

**Việc 1 (60'):** Làm theo `POSTMAN_GUIDE.md` từ đầu: login lấy token, gắn Bearer, chạy đủ 9 request, save vào Collection. Cố tình làm sai từng kiểu (quên Bearer, body để Text, tắt server) để nhìn mặt từng loại lỗi — thi thật gặp là nhận ra ngay.

**Việc 2 (60'): Hiểu Task 02 sâu bằng cách phá.** Lần lượt: đổi `JWT_SECRET` trong .env rồi dùng token cũ → 401 (bài học: đổi .env phải restart + login lại); POST apartment trùng tên → 400 duplicate; POST thiếu field → 400 validation; DELETE apartment có residents → 400 guard. Mỗi lần phá xong sửa lại cho chạy.

**Việc 3 (60'):** Đọc `EXAM_ANALYSIS_SHEET.md`, tự điền thử 10 ô cho **đề SU25** (đáp án chính là giá trị kit đang dùng — để hiểu mỗi ô nghĩa là gì).

**Đầu ra Ngày 1:** 9/9 request pass, giải thích được từng mã lỗi 400/401/404 vừa gặp.

## NGÀY 2 — SÁNG: Giả lập chuyển đề (bài tập quyết định) (3h)

Lấy đề **FOODEX (FA25)** làm đề "mới", bấm giờ, chuyển kit SU25 → FOODEX theo đúng quy trình EXAM_ANALYSIS_SHEET:

1. Điền 10 ô cho đề FOODEX (nations/foods/users, name/key, `/api/v1/nations`, `/page/foods`, secret `!@`, API login tại `/auth/signin`...).
2. Find & Replace: `resident→food`, `apartment→nation`, `account fields us/pw→name/key`.
3. Sửa models theo schema FOODEX (foodName, calories 700–1500, rating 1–5, isVegetarian...).
4. Sửa route paths (chú ý: đề này login API/view NGƯỢC với SU25).
5. Seed 3 file JSON FOODEX → 9 request Postman phiên bản nations.
6. Twist: rating hiển thị ★ trong view (snippet `!stars`).

Mục tiêu thời gian: lần 1 dưới 90 phút là đạt (thi thật chỉ cần Task 1+2 trong ~40'; bài này làm cả Task 3 nên 90' là tương đương). Ghi lại khâu nào chậm nhất.

## NGÀY 2 — CHIỀU: Lặp lại từ trắng + tổng duyệt (3h)

**Việc 1 (90'):** Làm lại từ đầu đúng như thi thật với đề SU25: `npx express-generator --view=ejs TênProject` → copy bản **CLEAN** vào → ghi đè app.js → xóa file thừa generator → .env → seed → Postman → browser. Bấm giờ: mục tiêu Task 01 + 02 xong và test pass trong **45 phút**.

**Việc 2 (45'):** Chạy checklist nộp bài trong EXAM_ANALYSIS_SHEET trên chính project vừa làm — tập thói quen rà "irrelevant content": file generator thừa, console.log, comment thừa, server.js trùng bin/www.

**Việc 3 (45'):** Ôn lại chỗ yếu nhất ghi nhận từ sáng. Đọc lại POSTMAN_GUIDE mục 5 (bảng lỗi) và EXAM_GUIDE mục "Xử lý sự cố".

**Đầu ra Ngày 2 = tiêu chuẩn sẵn sàng thi:** dựng + seed + API pass 9 request trong 45', không cần nhìn tài liệu ngoài tờ ANALYSIS SHEET.

---

# CHEATSHEET — 10 cú pháp đủ để ĐỌC HIỂU kit (không cần thuộc để viết)

1. **`require` / `module.exports`** — cách file JS "import/export" lẫn nhau. `const db = require('../models')` nghĩa là lấy thứ mà `models/index.js` đã `module.exports`. Thấy require ở đầu file = danh sách nguyên liệu file đó dùng.

2. **Arrow function** — `const getAll = async (req, res, next) => { ... }` chỉ là cách viết gọn của "hàm tên getAll nhận 3 tham số". Mọi handler trong kit đều có dạng này.

3. **`async` / `await`** — thao tác DB mất thời gian, `await` = "đợi xong rồi mới chạy dòng dưới". Quy tắc đọc: hàm nào có `await` bên trong thì khai báo phải có `async`. Quên `await` trước lệnh Mongoose là bug kinh điển (nhận về Promise thay vì data).

4. **`try/catch` + `next(err)`** — code DB bọc trong try; lỗi rơi vào catch và `next(err)` chuyển cho `errorHandler.js` xử lý tập trung. Vì vậy controller không cần tự viết res 500.

5. **Destructuring** — `const { us, pw } = req.body` = "lấy field us và pw từ body". Tên trong ngoặc nhọn PHẢI trùng `name="..."` trong form / key trong JSON Postman — lệch 1 ký tự là thành `undefined`. Đây là chỗ sửa nhiều nhất khi đổi đề.

6. **Template literal** — `` `Server running at http://localhost:${PORT}` `` — chuỗi có backtick thì `${...}` được thay bằng giá trị biến.

7. **`req` / `res`** — `req.body` (dữ liệu form/JSON gửi lên), `req.params.id` (phần `:id` trên URL), `req.cookies.token`. Trả lời: `res.json(...)` cho API, `res.render('tênView', {dữLiệu})` cho EJS, `res.redirect('/path')`, `res.status(400)` đặt mã lỗi.

8. **Mongoose 6 lệnh:** `Model.find()` (tất cả), `findById(id)`, `findOne({field: x})` (1 cái đầu khớp), `create({...})`, `findByIdAndUpdate(id, data, {new:true, runValidators:true})`, `findByIdAndDelete(id)`. `.populate('apartment', 'apartmentName')` = thay ObjectId bằng document cha (chỉ lấy field apartmentName).

9. **Middleware** — hàm đứng chặn giữa request và handler: `router.use(protectApi)` nghĩa là mọi request vào router này phải qua kiểm tra token trước; hợp lệ thì gọi `next()` cho đi tiếp, không thì trả 401/redirect tại chỗ.

10. **EJS 3 loại thẻ:** `<%= biến %>` in giá trị ra HTML; `<% if/forEach %>` chạy logic không in; form `name="floor"` sẽ thành `req.body.floor` ở server. Hết.

Đọc lại cheatsheet này mỗi khi mở file kit thấy ký hiệu lạ — 10 mục trên phủ 100% code trong kit.
