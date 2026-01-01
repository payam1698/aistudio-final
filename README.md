# مستندات فنی بک‌بند موسسه روانکارگاه (Ravankargah)

این مستند به عنوان مرجع پیاده‌سازی سمت سرور (API) و طراحی پایگاه داده، بر اساس آخرین تغییرات فرانت‌اند (شامل فرم ثبت‌نام گسترده و پنل کاربری جدید) تهیه شده است.

---

## ۱. تکنولوژی‌های پیشنهادی
- **Backend Framework:** Node.js (NestJS/Express) یا Python (Django/FastAPI)
- **Database:** PostgreSQL (پیشنهادی به دلیل پشتیبانی عالی از JSONB برای گزارش‌های آزمون)
- **Authentication:** JWT (JSON Web Token)

---

## ۲. طراحی جداول پایگاه داده (Database Schema)

### جدول کاربران (Users)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID / INT (PK) | شناسه منحصر به فرد |
| `mobile` | String (Unique) | نام کاربری اصلی (برای ورود) |
| `national_code` | String | رمز عبور اولیه (باید Hash شود) |
| `full_name_fa` | String | نام و نام خانوادگی (فارسی) |
| `full_name_en` | String | نام و نام خانوادگی (انگلیسی) |
| `father_name` | String | نام پدر |
| `birth_place` | String | محل تولد |
| `birth_date` | JSON / Object | شامل `{ day: string, month: string, year: string }` |
| `age` | Integer | سن محاسبه شده |
| `gender` | Enum | `male`, `female` |
| `education` | String | میزان تحصیلات (دیپلم تا دکتری) |
| `marital_status`| String | وضعیت تأهل (مجرد، متأهل، متارکه) |
| `role` | Enum | `admin`, `user` |
| `mcmi_status` | Enum | `none`, `approved` |
| `created_at` | Timestamp | تاریخ عضویت |

### جدول پیام‌ها (Messages)
*مربوط به بخش «ارسال پیام به مدیریت» در پنل کاربری*
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه پیام |
| `user_id` | UUID (FK) | فرستنده پیام |
| `subject` | String | عنوان پیام |
| `content` | Text | متن پیام |
| `is_read` | Boolean | وضعیت خوانده شده توسط ادمین |
| `created_at` | Timestamp | زمان ارسال |

### جدول اساتید (Instructors)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه استاد |
| `name` | String | نام و نام خانوادگی |
| `title` | String | عنوان علمی |
| `image_url` | String | لینک تصویر پروفایل |
| `specialties` | Array/JSON | لیست تخصص‌ها |
| `full_bio` | Text | رزومه کامل (HTML) |

### جدول دوره‌های آموزشی (Courses)
| فیلد | نوع داده | توضیحات |
| :--- | :--- | :--- |
| `id` | UUID (PK) | شناسه دوره |
| `title` | String | عنوان دوره |
| `price` | BigInt | قیمت به تومان |
| `installments` | JSON | شرایط اقساط (تعداد و مبلغ هر قسط) |
| `syllabus` | JSON | سرفصل‌های آموزشی |

---

## ۳. نقاط اتصال API (Endpoints)

### احراز هویت و پروفایل
- `POST /api/auth/register` : ثبت نام با تمامی فیلدهای هویتی.
- `POST /api/auth/login` : ورود با `mobile` و `national_code`.
- `GET /api/auth/me` : دریافت اطلاعات کامل پروفایل.
- `PATCH /api/auth/profile` : ویرایش اطلاعات پروفایل (نام پدر، تحصیلات و غیره).

### مدیریت پیام‌ها
- `POST /api/messages/send` : دریافت پیام از کاربر و ذخیره (یا ارسال ایمیل به مدیریت).
- `GET /api/admin/messages` : مشاهده پیام‌های دریافتی توسط مدیر.

### آزمون میلون (MCMI-II)
- `POST /api/mcmi/submit` : دریافت ۱۷۵ پاسخ، محاسبه نمرات (طبق منطق `utils/mcmiScoring.ts`) و ذخیره گزارش.
- `GET /api/mcmi/my-report` : دریافت آخرین نتیجه آزمون کاربر فعلی.

---

## ۴. منطق محاسباتی آزمون (بسیار حیاتی)
بک‌بند باید الگوریتم‌های موجود در فایل `utils/mcmiScoring.ts` را به دقت پیاده‌سازی کند:
1. **Raw Scores:** محاسبه بر اساس وزن‌های ۱، ۲ و ۳ برای هر مقیاس.
2. **BR Conversion:** تبدیل نمره خام به Base Rate بر اساس جداول جنسیتی (Male/Female).
3. **Adjustments:** اعمال تعدیل‌های X (Disclosure)، DA (Anxiety)، DD (Deviation) و DC (Commonality).
4. **Inpatient Adjustment:** اعمال تعدیل نهایی بر اساس وضعیت بستری بودن کاربر.

---

## ۵. ملاحظات امنیتی
- **Hash Passwords:** کد ملی در اولین بار باید به عنوان رمز عبور هش شده ذخیره شود.
- **Validation:** اعتبارسنجی کد ملی (۱۰ رقم) و شماره موبایل ایران در سمت سرور.
- **CORS:** محدود کردن دسترسی به دامنه اصلی سایت.
- **Rate Limiting:** محدود سازی تعداد درخواست‌ها برای جلوگیری از حملات Brute-force روی لاگین.