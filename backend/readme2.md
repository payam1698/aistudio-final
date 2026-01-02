# Implementation Guide - API Reference

### Public / Auth Endpoints
- `POST /api/auth/register` : ثبت نام کاربر
- `POST /api/auth/login` : ورود کاربر
- `GET /api/auth/me` : اطلاعات پروفایل جاری

### MCMI Test Endpoints
- `POST /api/mcmi/submit` : ذخیره گزارش نهایی آزمون (ارسالی از فرانت)
- `GET /api/mcmi/my-results` : تاریخچه آزمون‌های کاربر

### Admin Panel Endpoints (Requires JWT)
- `GET /api/admin/users` : لیست تمامی کاربران
- `PATCH /api/admin/users/:id` : تغییر نقش یا وضعیت کاربر
- `POST /api/admin/courses` : ایجاد دوره جدید
- `DELETE /api/admin/courses/:id` : حذف دوره
- `POST /api/admin/instructors` : ثبت استاد جدید
- `POST /api/admin/articles` : انتشار مقاله جدید

### Notes:
- تمام مبالغ (`price`) به صورت `BigInt` (تومان) ذخیره می‌شوند.
- فیلدهای `specialties` و `syllabus` به صورت JSONB برای انعطاف‌پذیری بالا در دیتابیس PostgreSQL قرار دارند.