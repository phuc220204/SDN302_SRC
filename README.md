# SDN302 Source Kit v0.2.0

Kit tái sử dụng cho các đề PE dạng: **3 collections (cha + con + account), JWT REST API, view CRUD với modal**. Kit được viết sẵn theo đề SU25 (Residents) làm bản mẫu — gặp đề mới chỉ cần đổi tên field/route theo bảng dưới.

## Cấu trúc

```
app.js                     # trung tâm, tương thích express-generator ([ĐỔI THEO ĐỀ]: 3 dòng mount route)
server.js                  # dùng khi KHÔNG xài generator (node server.js)
.env.example               # 3 biến bắt buộc — THIẾU LÀ 0 ĐIỂM
config/db.js               # connect MongoDB
models/                    # account + cha (apartment) + con (resident) + index.js
middlewares/
  auth.middleware.js       # protectApi (JWT Bearer header) + protectView (session) — JWT KHONG vao cookie
  errorHandler.js          # ValidationError/E11000/CastError -> 400, còn lại 500
controllers/
  auth.controller.js       # apiLogin (JWT JSON) + showLogin + viewLogin (cookie)
  apartment.controller.js  # CRUD API + delete-guard
  resident.controller.js   # view: list/create/update/remove + age<->yOB
routes/                    # route mỏng, chỉ khai báo path
utils/seed.js              # import JSON ($oid) 1 lệnh   utils/jwt.js   utils/hash.js
views/login.ejs  views/residents.ejs   # login + card list + 2 modal + delete fetch
data/*.json                # copy JSON đề vào đây
snippets/sdn302.code-snippets          # cài vào VSCode (xem dưới)
```

## Cài snippets vào VSCode (làm 1 lần ở nhà)

VSCode → `Ctrl+Shift+P` → **Snippets: Configure Snippets** → **New Global Snippets file** → đặt tên `sdn302` → paste toàn bộ nội dung `snippets/sdn302.code-snippets`. Sau đó gõ prefix (vd `!crud`) + Tab.

| Prefix | Sinh ra |
|---|---|
| `!model` | Mongoose schema + timestamps |
| `!dbconn` | config/db.js |
| `!crud` | controller 5 hàm CRUD + delete-guard |
| `!router` | router CRUD + protect |
| `!jwtauth` | middleware hybrid Bearer + cookie |
| `!loginapi` / `!loginview` | login trả JWT / login set cookie |
| `!errh` | notFound + errorHandler |
| `!seed` | seed script $oid |
| `!chk` / `!age` | checkbox->boolean / age<->yOB |
| `!cardlist` / `!modalform` / `!switch` / `!select` | EJS Bootstrap |
| `!delfetch` | confirm + fetch DELETE + alert |
| `!stars` | rating -> ★ (đề FA25) |
| `!env` | nội dung .env |

## Gặp đề mới — bảng "chỗ cần sửa" (theo thứ tự)

| # | File | Sửa gì |
|---|---|---|
| 1 | `.env` | Tên DB + JWT secret **đúng format đề** (SP26 `!` / SU25 `!!` / FA25 `!@`) + SESSION_SECRET |
| 2 | `models/*.model.js` | Tên field + min/max + tên model/collection + chuỗi `ref` |
| 3 | `models/index.js`, `utils/seed.js` | Tên model + tên file JSON |
| 4 | `app.js` | 3 dòng mount route prefix (`/api/...`, `/view/...` hoặc `/page/...`) |
| 5 | `routes/auth.route.js` | Path nào là API, path nào là view (**2 đề đã hoán đổi nhau!**) |
| 6 | `controllers/*` | Tên field trong destructuring + message lỗi delete-guard |
| 7 | `views/*` | Tên field trong form + card; field đặc biệt (★, age...) |

Mẹo: dùng `Ctrl+Shift+H` (find & replace toàn project) đổi `resident`→`<tên mới>`, `apartment`→`<tên mới>` trước, rồi mới rà từng file.

## Import JSON — 2 cách

Cách 1 (khuyên dùng): copy file JSON đề vào `data/`, sửa `seedMap` trong `utils/seed.js`, chạy:
```
npm run seed
```

Cách 2 (backup nếu seed lỗi): MongoDB Compass → chọn DB đúng tên → Create collection → ADD DATA → Import JSON. Hoặc mongoimport:
```
mongoimport --db TÊN_DB --collection apartments --file apartments.json --jsonArray
```

## Checklist "0 điểm" — rà TRƯỚC KHI NỘP

- [ ] `.env` có đủ PORT + MONGO_URI + JWT_SECRET, secret **đúng format đề** (SU25: `!!`, FA25: `!@`)
- [ ] Tên project + tên DB copy **nguyên văn** từ đề (kể cả khi đề có vẻ typo)
- [ ] Không syntax error: chạy `node --check app.js` và từng file trong controllers/routes/models
- [ ] Server chạy được, login được, CRUD được ít nhất 1 vòng
- [ ] Không chứa nội dung không liên quan (xóa file rác, comment nhảm)
