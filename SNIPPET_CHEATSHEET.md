# ⚡ SNIPPET CHEATSHEET v0.2.0 — Tra cứu siêu tốc trong phòng thi (22 snippets)

**Kích hoạt:** gõ prefix (vd `!crud`) → `Tab`. Không hiện → `Ctrl+Space`. Điền ô trống bằng `Tab`; placeholder trùng tên **sửa 1 chỗ = đổi mọi chỗ** → luôn đi bằng Tab, đừng click sửa lẻ.
**Scope:** snippet EJS chỉ hiện trong file `.ejs`/`.html`; snippet JS chỉ trong `.js`; `!env` gõ trong file `.env`.

---

## 🟦 SETUP & TASK 01 — phút 5–22

| Keyword | Chức năng | Vai trò & Chiến thuật |
|---|---|---|
| **`!env`** | 4 biến: PORT, MONGO_URI, JWT_SECRET, SESSION_SECRET | **Gõ ĐẦU TIÊN** — thiếu .env = 0 điểm. Tab 1: tên DB nguyên văn đề; Tab 2: secret đúng từng ký tự (**SP26 `!` · SU25 `!!` · FA25 `!@`**). Sửa .env xong PHẢI restart server |
| **`!dbconn`** | `config/db.js` — connect + log tên DB | Log tên DB ra terminal → nhìn là biết đúng DB chưa. Fail thì `process.exit(1)`, không dùng `next()` (đây không phải middleware) |
| **`!model`** | Schema + timestamps + **`match` regex** + ref + export | 1 lần cho mỗi collection. `match` chặn "chỉ letters+space" **phía server** (HTML pattern chỉ chặn browser, Postman lọt). Bẫy: chuỗi `ref` phải TRÙNG tên model cha, sai là populate ra null. Chép `min/max/required/unique/default` **nguyên văn đề** |
| **`!seed`** | Import JSON, tự đổi `{$oid}` → ObjectId | Chỉ sửa `seedMap`. Chạy lại vô tư (tự `deleteMany` trước). Lỗi quá 5 phút → bỏ, import bằng Compass |

## 🟥 TASK 02 — API + JWT — phút 22–40 (5 điểm)

| Keyword | Chức năng | Vai trò & Chiến thuật |
|---|---|---|
| **`!jwtauth`** | `protectApi` (**Bearer header only** → JSON 401) + `protectView` (**session** → redirect) | Xương sống Task 2+3. **JWT không bao giờ vào cookie** — đề SP26 cấm thẳng. Tab 1: path login view của đề |
| **`!loginapi`** | Handler trả `{ token }` JSON | Route sinh JWT cho Postman. Tab: 2 field account theo đề (`name/code` SP26 · `us/pw` SU25 · `name/key` FA25) — lệch với body JSON là 400 dù đúng mật khẩu. Cần sẵn `require` bcrypt/db/generateToken |
| **`!crud`** | 5 hàm: getAll/getById/create/update (`runValidators`)/remove (**delete-guard**) | Trái tim Task 02. Dùng `{ ...req.body }` → **không bao giờ sót field khi đổi đề** (Mongoose strict tự loại field lạ). Tab 1 model CHA · Tab 2-3 model CON + field ref · Tab 4 message guard **copy nguyên văn ví dụ đề** |
| **`!router`** | 5 endpoint + `router.use(protectApi)` | Mount prefix ở app.js đúng đề (`/rest/...` SP26 · `/api/...` SU25 · `/api/v1/...` FA25). Nhớ test case KHÔNG token → phải 401 |
| **`!errh`** | notFound + errorHandler: ValidationError/E11000/CastError → 400 | Đặt SAU tất cả route trong app.js. Nhờ nó Postman thấy status đúng thay vì 500 tuốt |

## 🟩 TASK 03 — VIEWS — phút 40–70 (4 điểm)

| Keyword | Chức năng | Vai trò & Chiến thuật |
|---|---|---|
| **`!sess`** | Cấu hình `express-session` trong app.js | `npm i express-session` trước. Session chỉ giữ **trạng thái đăng nhập**, KHÔNG chứa JWT → hợp lệ với mọi đề. Đặt TRƯỚC các route |
| **`!loginview`** | Login form: bcrypt → **fail: `render('login',{error})`** → OK: `req.session.user` + redirect (+ `logout`) | Ăn điểm "display error messages for failed logins" — tuyệt đối không trả JSON ở đây. Tab 4: prefix view của đề |
| **`!cardlist`** | `forEach` render Bootstrap card | Đề **CẤM table**. `$0` dừng giữa card-body → gõ tiếp các field đề liệt kê. Field ref phải `populate` mới có tên |
| **`!modalform`** | Nút Add + modal + form POST + `pattern="[A-Za-z ]+"` | Khung cho cả Add lẫn Edit. **Bẫy chí mạng:** `name="..."` phải TRÙNG field schema — lệch 1 ký tự là `undefined`. Edit: thêm `value=` pre-fill + đổi `action` sang `/:id` |
| **`!switch`** | Bootstrap form-switch cho Boolean | Đề bắt "toggle or switch control". Edit nhớ thêm `checked`. Server nhận `'on'` → đi kèm `!chk` |
| **`!chk`** | `field: req.body.field === 'on',` | Bỏ tick = KHÔNG gửi field → biểu thức tự ra `false` (đúng ý). Đặt SAU `...req.body` để override |
| **`!select`** | `<select>` render option từ collection cha | Controller phải truyền mảng cha vào render. Edit: thêm `selected` so sánh `_id.toString()` |
| **`!delfetch`** | `confirm()` → `fetch DELETE` → `alert()` → reload | Ăn điểm "confirm + **notify the result**". Form HTML không gửi được DELETE nên bắt buộc fetch. Tab 1: prefix view |

## 🟨 TWIST — mỗi đề có 1–2 cái, nằm ở Task 03 mục 4–5

| Keyword | Chức năng | Đề nào & Bẫy |
|---|---|---|
| **`!percent`** | `(off*100).toFixed(0)%` + input `step="0.01"` | **SP26**: `{off: 0.75}` → `75%`. **Quên `step="0.01"` là không nhập được số lẻ!** min=0 max=1 |
| **`!icon`** | Boolean → icon `fa-mars`/`fa-venus` + link Font Awesome | **SP26**: gender hiển thị **icon** nam/nữ, không phải chữ "true/false" |
| **`!img`** | `<img>` trong card + input `type="url"` | **SP26**: field `image` phải hiện ảnh thật trong card |
| **`!stars`** | `'★'.repeat(rating)` | **FA25**: `{rating:3}` ⇒ ★★★. In số là mất điểm |
| **`!age`** | `toYOB(age)` / `toAge(yOB)` | **SU25**: nhập age → lưu yOB. Nhớ **đủ 2 chiều**: save dùng toYOB, hiển thị + pre-fill dùng toAge |

---

## 🧭 THỨ TỰ GÕ KHI BUILD TỪ TRẮNG

```
!env → !dbconn → !model (×3) → !seed → !jwtauth → !errh
→ !crud + !loginapi → !router     ⇒ TEST 9 REQUEST POSTMAN (chốt 6 điểm)
→ !sess → !loginview → !cardlist → !modalform (+!switch +!select +!chk) → !delfetch
→ twist của đề (!percent / !icon / !img / !stars / !age)
```

## 🚑 SNIPPET "KHÔNG ĂN" — xử lý

| Hiện tượng | Nguyên nhân |
|---|---|
| Gõ `!xxx` không hiện gợi ý | Sai loại file (JS snippet trong .ejs & ngược lại) → `Ctrl+Space`; kiểm tra đuôi file |
| Điền xong 1 chỗ vẫn tên cũ | Đã thoát chế độ Tab rồi mới sửa → dùng `Ctrl+D` chọn các cụm trùng sửa đồng loạt |
| Code dán vào lỗi `require` | `!crud`/`!loginapi`/`!loginview` chỉ sinh HÀM — cần require db/bcrypt/generateToken ở đầu file |
| `req.session is undefined` | Chưa gõ `!sess` / đặt session SAU route → phải đặt TRƯỚC |
