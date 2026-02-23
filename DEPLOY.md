# Deploy portfolio để share cho HR

## 1. Đẩy code lên GitHub

Nếu chưa có repo:

```bash
cd d:\03_Coding\TechArt\porfolio-website\sangtran-portfolio-v2
git init
git add .
git commit -m "Portfolio ready for deploy"
```

Tạo repo mới trên [GitHub](https://github.com/new) (ví dụ: `sangtran-portfolio`), rồi:

```bash
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

## 2. Deploy trên Vercel (miễn phí, chuẩn Next.js)

1. Vào **[vercel.com](https://vercel.com)** → đăng nhập bằng **GitHub**.
2. **Add New** → **Project** → chọn repo vừa push.
3. **Framework Preset**: Next.js (tự nhận).
4. **Deploy** (không cần đổi gì).
5. Đợi xong → bạn có link dạng:  
   `https://sangtran-portfolio-v2.vercel.app`  
   (hoặc tên repo của bạn).

## 3. Share link cho HR

- Gửi link Vercel (ví dụ: `https://xxx.vercel.app`).
- Nếu muốn domain riêng (vd: `sangtran.com`): Vercel → Project → **Settings** → **Domains** → thêm domain và làm theo hướng dẫn.

## Lưu ý

- **Ảnh / video**: Đảm bảo file trong `public/` đã commit (video showreel, ảnh project, portrait…).
- **OG image**: Nếu có file `public/images/og-image.jpg` (1200×630), khi share link lên LinkedIn/Facebook sẽ hiện ảnh đẹp.
- **Env**: Hiện không bắt buộc env; nếu sau này dùng biến môi trường thì thêm trong Vercel → **Settings** → **Environment Variables**.
