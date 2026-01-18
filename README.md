# 🎯 Outfred Gen-Z Survey | استبيان الجيل زد

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

## 📝 نبذة عن المشروع | About

استبيان تفاعلي ثنائي اللغة (عربي/فرانكو) مصمم خصيصاً للجيل الجديد في مصر لفهم سلوكيات الشراء والموضة. المشروع مبني بتقنيات حديثة ويوفر تجربة مستخدم سلسة وجذابة.

An interactive bilingual survey (Arabic/Franco) designed for Gen-Z in Egypt to understand shopping and fashion behaviors. Built with modern technologies for a smooth and engaging user experience.

## ✨ المميزات | Features

- 🌐 **ثنائي اللغة**: دعم كامل للعربية والفرانكو (العامية المصرية)
- 🎨 **تصميم عصري**: واجهة مستخدم جذابة مع تأثيرات حديثة
- 📱 **متجاوب بالكامل**: يعمل بشكل مثالي على جميع الأجهزة
- �️ **قاعدة بيانات**: حفظ البيانات في Neon PostgreSQL
- 🔐 **لوحة إدارة محمية**: نظام تسجيل دخول آمن بـ JWT
- 📊 **استعراض البيانات**: استعراض وتصدير النتائج بصيغة CSV
- ⚡ **أداء سريع**: بني على Vite للحصول على تجربة سريعة
- 🎯 **تقدم واضح**: شريط تقدم يوضح نسبة إكمال الاستبيان

## 🛠️ التقنيات المستخدمة | Tech Stack

- **Frontend Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Database**: Neon PostgreSQL (Serverless)
- **Authentication**: JWT + bcrypt
- **Styling**: Tailwind CSS (via inline styles)
- **RTL Support**: Native HTML direction support

## 📦 التثبيت والتشغيل | Installation

### المتطلبات الأساسية | Prerequisites

- Node.js (v18 أو أحدث)
- npm أو yarn
- حساب في Neon Database (مجاني)

### خطوات التشغيل | Steps

1. **استنساخ المشروع | Clone the repository**
   ```bash
   git clone https://github.com/your-username/outfred-genz-survey.git
   cd outfred-genz-survey

2. **تثبيت المكتبات | Install dependencies**
   ```bash
   npm install
   ```

3. **إعداد قاعدة البيانات في Neon | Setup Neon Database**
   
   أ. اذهب إلى [Neon Console](https://console.neon.tech)
   
   ب. أنشئ مشروع جديد
   
   ج. انسخ الـ Connection String من Dashboard
   
   د. افتح SQL Editor في Neon ونفذ محتوى ملف `schema.sql`:
   ```bash
   # انسخ محتوى schema.sql والصقه في SQL Editor
   ```

4. **إعداد المتغيرات البيئية | Setup environment variables**
   ```bash
   # انسخ ملف .env.example
   cp .env.example .env.local
   
   # افتح .env.local وضع البيانات التالية:
   # DATABASE_URL: من Neon Dashboard
   # JWT_SECRET: أي string عشوائي قوي
   ```

5. **تشغيل المشروع | Run the development server**
   ```bash
   npm run dev
   ```

6. **افتح المتصفح | Open your browser**
   ```
   http://localhost:3000
   ```

## 🔐 الدخول لوحة الإدارة | Admin Access

### بيانات الدخول الافتراضية:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **مهم**: غيّر كلمة المرور فوراً بعد أول تسجيل دخول!

### إنشاء مستخدم أدمن جديد:

```bash
# استخدم Node.js لتوليد hash للباسورد
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"

# ثم نفذ في Neon SQL Editor:
INSERT INTO admins (username, password_hash) 
VALUES ('new_username', 'the_generated_hash');
```

2. **تثبيت المكتبات | Install dependencies**
   ```bash
   npm install
   ```

3. **إعداد المتغيرات البيئية | Setup environment variables**
   ```bash
   # انسخ ملف .env.example
   cp .env.example .env.local
   
   # ثم افتح .env.local وضع الـ API Key الخاص بك (إذا كنت تستخدم Gemini)
   # Or edit .env.local and add your API key if using Gemini
   ```

4. **تشغيل المشروع | Run the development server**
   ```bash
   npm run dev
   ```

5. **افتح المتصفح | Open your browser**
   ```
   http://localhost:3000
   ```

## 🚀 البناء للإنتاج | Build for Production

```bash
npm run build
```

الملفات المبنية ستكون في مجلد `dist/`

## 📊 استعراض البيانات | View Survey Data

للوصول إلى لوحة الإدارة واستعراض نتائج الاستبيان:
:

1. اذهب لأسفل الصفحة واضغط "Admin Login"
2. أدخل username و password
3. استعرض جميع الإجابات المحفوظة في قاعدة البيانات
4. صدّر النتائج بصيغة CSV
5. احذف جميع البيانات إذا لزم الأمر

## 📁 هيكل المشروع | Project Structure

```
outfred-genz-survey/
├── api/                 # Backend API functions
│   ├── db.ts           # Database connection
│   ├── auth.ts         # Authentication logic
│   └── responses.ts    # Survey responses handlers
├── components/          # React components
│   ├── AdminPanel.tsx   # لوحة الإدارة
│   ├── AdminLogin.tsx   # صفحة تسجيل الدخول
│   ├── LanguageToggle.tsx # زر تبديل اللغة
│   └── QuestionCard.tsx # بطاقة السؤال
├── App.tsx             # المكون الرئيسي
├── constants.ts        # محتوى الاستبيان
├── types.ts            # TypeScript types
├── schema.sql          # Database schema
├── create-admin.sql    # Admin creation script
```

## 🎨 التخصيص | Customization

لتخصيص أسئلة الاستبيان، عدّل ملف [constants.ts](constants.ts):

```typescript
export const SURVEY_CONTENT: SurveyData = {
  intro: { /* محتوى المقدمة */ },
  sections: [ /* الأقسام والأسئلة */ ],
  outro: { /* محتوى الخاتمة */ }
};
```

## 🤝 المساهمة | Contributing

المساهمات مرحب بها! إذا كنت تريد المساهمة:

1. Fork المشروع
2. أ� الأمان | Security

- كلمات المرور محفوظة بـ bcrypt hashing
- JWT tokens لإدارة الجلسات
- جميع المتغيرات الحساسة في `.env.local` (غير مرفوع على Git)
- غيّر الباسورد الافتراضي فوراً
- استخدم JWT_SECRET قوي وعشوائي

## �نشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📄 الترخيص | License

هذا المشروع مرخص تحت MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📧 التواصل | Contact

**Outfred** - [Website](https://outfred.com)

---

<div align="center">
Made with ❤️ for Egyptian Gen-Z | صنع بحب للجيل الجديد المصري
</div>
