# 🚀 دليل الرفع على GitHub

## الخطوات:

### 1. إنشاء Repository جديد على GitHub

اذهب إلى: https://github.com/new

- **Repository name**: `outfred-genz-survey`
- **Description**: `استبيان تفاعلي للجيل الجديد في مصر - Interactive Gen-Z Survey for Egypt`
- **Public** أو **Private** (حسب اختيارك)
- ❌ **لا تفعّل** "Add a README file"
- ❌ **لا تفعّل** "Add .gitignore"
- ❌ **لا تفعّل** "Choose a license"

ثم اضغط **Create repository**

---

### 2. تجهيز المشروع محلياً

افتح Terminal في مجلد المشروع ونفذ:

```bash
# تأكد من أنك في مجلد المشروع
cd c:\Users\Dell\Desktop\abdo\outfred-genz-survey

# ابدأ Git repository
git init

# أضف جميع الملفات
git add .

# اعمل commit
git commit -m "Initial commit: Outfred Gen-Z Survey with Neon DB integration"

# اربط المشروع بالـ repository
git branch -M main
git remote add origin https://github.com/outfred/outfred-genz-survey.git

# ارفع الكود
git push -u origin main
```

⚠️ **مهم**: استبدل `YOUR-USERNAME` باسم المستخدم الخاص بك على GitHub

---

### 3. تثبيت المكتبات بعد الرفع

عندما تستنسخ المشروع من GitHub، نفذ:

```bash
npm install
```

---

### 4. إعداد قاعدة البيانات

1. افتح [Neon Console](https://console.neon.tech)
2. أنشئ مشروع جديد
3. افتح SQL Editor ونفذ محتوى ملف `schema.sql`
4. انسخ Connection String

---

### 5. إعداد ملف .env.local

```bash
# انسخ .env.example
cp .env.example .env.local

# افتح .env.local وضع:
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_random_secret_string
```

---

### 6. تشغيل المشروع

```bash
npm run dev
```

الموقع سيعمل على: http://localhost:3000

---

## 🔐 بيانات تسجيل الدخول الافتراضية:

- **Username**: admin
- **Password**: admin123

⚠️ غيّر الباسورد فوراً!

---

## 📝 ملاحظات:

1. ملف `.env.local` **لن يُرفع** على GitHub (محمي في .gitignore)
2. كل شخص يستنسخ المشروع يحتاج إنشاء `.env.local` الخاص به
3. شارك الـ DATABASE_URL بشكل آمن فقط مع الفريق

---

✅ المشروع جاهز للرفع!
