# مستندات فنی بک‌بند موسسه روانکارگاه (Ravankargah)

این مستند بر اساس نیازهای فرانت‌اند توسعه داده شده با React و TypeScript تهیه شده است تا به عنوان مرجعی برای پیاده‌سازی API و طراحی پایگاه داده (Database Schema) استفاده شود.

---

## ۱. تکنولوژی‌های پیشنهادی
- **Language:** Node.js (Express/NestJS) or Python (Django/FastAPI)
- **Database:** PostgreSQL or MySQL (به دلیل نیاز به روابط بین موجودیت‌ها)
- **File Storage:** S3 (Cloud) or Local Server Storage (برای ذخیره تصاویر اساتید، دوره‌ها و مقالات)

---

## ۲. طراحی جداول پایگاه داده (Database Schema)

### جدول کاربران (Users)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID / INT (PK) | شناسه منحصر به فرد |
| `mobile` | String (Unique) | نام کاربری (اجباری) |
| `national_code` | String | رمز عبور (Hash شده) |
| `full_name_fa` | String | نام فارسی |
| `full_name_en` | String | نام انگلیسی |
| `age` | Integer | سن |
| `gender` | Enum | `male`, `female` |
| `education` | String | تحصیلات |
| `marital_status`| String | وضعیت تأهل |
| `role` | Enum | `admin`, `user` |
| `mcmi_status` | Enum | `none`, `approved` |
| `created_at` | Timestamp | تاریخ ثبت نام |

### جدول اساتید (Instructors)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه استاد |
| `name` | String | نام و نام خانوادگی |
| `title` | String | عنوان علمی (مثلاً: دکتری روانشناسی) |
| `description` | Text | خلاصه رزومه |
| `full_bio` | LongText | رزومه کامل (HTML) |
| `image_url` | String | لینک تصویر |
| `specialties` | JSON / Array | لیست تخصص‌ها |
| `status` | Enum | `active`, `inactive` |

### جدول دوره‌های آموزشی (Courses)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه دوره |
| `title` | String | عنوان دوره |
| `instructor_id` | UUID (FK) | ارتباط با جدول اساتید |
| `category` | String | دسته‌بندی (تخصصی، کودک و ...) |
| `price` | BigInt | قیمت به تومان |
| `duration_hours`| Integer | مدت زمان (ساعت) |
| `sessions` | Integer | تعداد جلسات |
| `image_url` | String | تصویر شاخص |
| `description` | Text | توضیحات کوتاه |
| `objectives` | JSON / Array | اهداف دوره |
| `syllabus` | JSON | سرفصل‌ها (ساختار درختی) |
| `mode` | String | آنلاین / حضوری |
| `has_certificate`| Boolean | دارد/ندارد |
| `installments` | Boolean | امکان خرید اقساطی |

### جدول مقالات/وبلاگ (BlogPosts)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه مقاله |
| `title` | String | عنوان مقاله |
| `excerpt` | Text | خلاصه برای کارت وبلاگ |
| `content` | LongText | متن کامل (HTML/Markdown) |
| `author_name` | String | نام نویسنده |
| `image_url` | String | تصویر شاخص |
| `category` | String | دسته‌بندی |
| `created_at` | Date | تاریخ انتشار |

### جدول نظرات (Comments)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه نظر |
| `user_id` | UUID (FK) | نویسنده نظر |
| `content_id` | UUID | شناسه دوره یا مقاله مربوطه |
| `content_type` | Enum | `course`, `blog` |
| `text` | Text | متن نظر |
| `rating` | Integer | امتیاز (۱ تا ۵) |
| `status` | Enum | `pending`, `approved` |

### جدول گزارش آزمون میلون (MCMI_Reports)
*نکته: به دلیل حجم بالای محاسبات، پیشنهاد می‌شود آبجکت نهایی در دیتابیس ذخیره شود.*
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه گزارش |
| `user_id` | UUID (FK) | کاربر آزمون دهنده |
| `patient_info` | JSON | مشخصات لحظه‌ای وارد شده (نام، سن و...) |
| `raw_scores` | JSON | نمرات خام تمام مقیاس‌ها |
| `br_scores` | JSON | نمرات BR اولیه |
| `final_scores` | JSON | نمرات نهایی پس از تمام تعدیل‌ها (DA, DD, DC, Inp) |
| `test_date` | Timestamp | تاریخ انجام آزمون |

---

## ۳. نقاط اتصال API (Endpoints)

### احراز هویت (Auth)
- `POST /api/auth/register` : ثبت نام کاربر جدید
- `POST /api/auth/login` : ورود با موبایل و کد ملی
- `GET /api/auth/me` : دریافت اطلاعات پروفایل فعلی
- `PATCH /api/auth/profile` : ویرایش پروفایل کاربر

### دوره‌ها و اساتید
- `GET /api/courses` : لیست دوره‌ها (با فیلتر)
- `GET /api/courses/:id` : جزئیات کامل دوره
- `GET /api/instructors` : لیست اساتید
- `GET /api/instructors/:id` : رزومه و دوره‌های استاد

### آزمون میلون (MCMI)
- `POST /api/mcmi/submit` : ارسال ۱۷۵ پاسخ و دریافت نمرات نهایی (محاسبات سمت بک‌بند انجام شود)
- `GET /api/mcmi/report/:userId` : دریافت آخرین گزارش کاربر

### مدیریت (Admin - نیازمند Middleware احراز هویت Admin)
- `POST/PUT/DELETE /api/admin/courses` : مدیریت دوره‌ها
- `POST/PUT/DELETE /api/admin/instructors` : مدیریت اساتید
- `POST/PUT/DELETE /api/admin/blog` : مدیریت مقالات
- `PATCH /api/admin/comments/:id` : تایید یا حذف نظرات منتظر

---

## ۴. منطق محاسباتی آزمون میلون ۲ (بسیار مهم)
بک‌بند باید توابع موجود در `utils/mcmiScoring.ts` فرانت‌اند را پیاده‌سازی کند:
1. دریافت آرایه ۱۷۵ تایی از Boolean.
2. محاسبه نمرات خام (Raw Scores) بر اساس کلیدهای تصحیح.
3. تبدیل نمره خام به BR بر اساس جداول نرم (Male/Female).
4. اعمال تعدیل‌های چهارگانه:
   - **X (Disclosure):** تعدیل نمرات بر اساس میزان بازگویی.
   - **DA (Anxiety/Depression):** تعدیل مقیاس‌های اجتنابی، خودشکن و مرزی.
   - **DD (Recent Deviation):** تعدیل بر اساس تفاوت مقیاس‌های مطلوبیت و تنزل.
   - **DC (Commonality):** تعدیل مقیاس‌های شدید.
   - **Inpatient Adjustment:** بر اساس وضعیت بستری.

---

## ۵. امنیت (Security)
- استفاده از **JWT** برای مدیریت سشن‌ها.
- رمزنگاری اطلاعات حساس (کد ملی باید به صورت Hash ذخیره شود یا حداقل در لایه API محافظت شود).
- کنترل دسترسی (CORS) فقط برای دامنه‌های مجاز.
