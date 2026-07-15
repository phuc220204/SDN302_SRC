# POSTMAN GUIDE — Từ số 0 đến test xong Task 02

Postman là công cụ gửi HTTP request thay cho browser. Browser chỉ gửi GET dễ dàng; Postman gửi được POST/PUT/DELETE kèm body JSON và header — chính là thứ grader dùng để chấm Task 02, nên Phúc phải test bằng đúng công cụ họ chấm.

## 0. Cài đặt (làm trước ngày ôn)

Tải tại postman.com/downloads → cài → mở lên. Nếu bắt đăng nhập, tạo account free (hoặc tìm nút "Skip / lightweight API client" để dùng không cần đăng nhập). Trong phòng thi máy thường cài sẵn.

## 1. Hiểu 4 thứ trên màn hình (chỉ cần 4 thứ này)

Bấm nút **+** (New → HTTP Request) để mở 1 tab request. Trong tab có:

1. **Ô dropdown method** (mặc định GET) — chọn GET / POST / PUT / DELETE.
2. **Ô URL** — gõ địa chỉ, vd `http://localhost:3000/auth/login`.
3. **Hàng tab bên dưới URL**: quan trọng nhất là **Body** và **Authorization**.
4. **Nút Send** — gửi request. Kết quả hiện ở nửa dưới màn hình: **Status** (góc phải, vd `200 OK`, `401 Unauthorized`) và **Body** (JSON server trả về).

## 2. Request đầu tiên: login lấy token

1. Method: **POST**. URL: `http://localhost:3000/auth/login`
2. Tab **Body** → chọn **raw** → dropdown bên phải chữ raw đổi từ `Text` thành **JSON** (bước hay quên nhất — nếu để Text, server đọc body ra rỗng và báo sai mật khẩu dù gõ đúng).
3. Gõ vào khung:
```json
{
  "us": "bizlo",
  "pw": "123456789"
}
```
4. **Send** → kỳ vọng Status `200 OK` và body có dạng:
```json
{ "status": "success", "token": "eyJhbGciOiJIUzI1NiIs..." }
```
5. **Bôi đen copy chuỗi token** (không copy dấu ngoặc kép).

Lưu ý: tên field trong body phải khớp đề (`us`/`pw` ở đề SU25; `name`/`key` ở đề FA25).

## 3. Gửi request có token (mọi request /api đều cần)

1. Tab mới: **GET** `http://localhost:3000/api/apartments`
2. Tab **Authorization** → Type chọn **Bearer Token** → dán token vào ô Token.
   (Postman sẽ tự tạo header `Authorization: Bearer <token>` — đây chính là thứ middleware đọc.)
3. **Send** → kỳ vọng `200 OK` + danh sách 4 apartments.

Thử phản chứng để hiểu: quay lại Authorization chọn **No Auth** → Send → phải ra `401` + `"No token provided"`. Đó là bằng chứng JWT hoạt động — grader sẽ thử đúng cách này.

## 4. Bộ 9 request chấm điểm Task 02 (làm theo thứ tự)

| # | Method + URL | Body (raw JSON) | Auth | Kỳ vọng |
|---|---|---|---|---|
| 1 | POST `/auth/login` | `{"us":"bizlo","pw":"123456789"}` | — | 200 + token |
| 2 | POST `/auth/login` | `{"us":"bizlo","pw":"sai"}` | — | 400 |
| 3 | GET `/api/apartments` | — | Không | 401 |
| 4 | GET `/api/apartments` | — | Bearer | 200 + 4 items |
| 5 | GET `/api/apartments/<id>` | — | Bearer | 200 (lấy `_id` từ kết quả #4) |
| 6 | POST `/api/apartments` | `{"apartmentName":"Test Tower","totalOfFloors":10}` | Bearer | 201 |
| 7 | PUT `/api/apartments/<id của #6>` | `{"apartmentName":"Test Tower","totalOfFloors":20}` | Bearer | 200 |
| 8 | DELETE `/api/apartments/<id của Joe Tower>` | — | Bearer | **400 "Cannot delete..."** (Joe Tower đang có residents) |
| 9 | DELETE `/api/apartments/<id của #6>` | — | Bearer | 200 (Test Tower không có resident) |

Request #8 là câu ăn điểm riêng của đề (delete-guard) — nhớ test cả 2 chiều: xóa cái có con phải bị chặn, xóa cái không con phải thành công.

Mẹo: mỗi request làm xong bấm **Save** vào 1 Collection tên `PE` — lúc rà bài cuối giờ chỉ việc bấm Send lại từng cái, không phải gõ lại.

## 5. Đọc lỗi — gặp gì hiểu nấy

| Postman báo | Nghĩa là | Sửa ở đâu |
|---|---|---|
| `Error: connect ECONNREFUSED` | Server chưa chạy / sai port | Chạy `npm run dev`; check PORT trong .env và trong URL |
| `401 No token provided` | Chưa gắn Bearer token | Tab Authorization → Bearer Token |
| `401/403 Invalid token` | Token cũ ký bằng secret khác | Sau khi sửa .env phải **restart server**, rồi login lấy token MỚI |
| `400` khi POST dù data đúng | Body đang ở chế độ Text, hoặc tên field sai | Đổi raw→JSON; so tên field với schema |
| `404 Not found: /api/...` | URL sai prefix | So với `app.use(...)` trong app.js và đề |
| `500` | Lỗi code server | Nhìn terminal đang chạy server — stack trace chỉ đúng file + dòng |

Quy tắc vàng khi debug: **luôn nhìn terminal chạy server song song với Postman** — morgan log mọi request (`POST /auth/login 400 ...`), và lỗi 500 in stack trace ở đó.
