# الدليل المرجعي الشامل لمشروع MERN University Starter (مادة CS309)

مرحباً بكم في القالب التأسيسي **`mern-university-starter`**. صُمم هذا المستودع خصيصاً ليكون نقطة انطلاق نظيفة، منظمة، واحترافية لفرق المشاريع الجامعية التي تعمل بمسار **MERN Stack** (MongoDB, Express.js, React, Node.js).

---

## 💡 لماذا صُنع هذا المستودع؟ وما هي فلسفته؟

هذا القالب يحل لك مشكلة **"البداية من الصفر"**، ويوفر لفريقك بيئة عمل جاهزة ومقسمة وفق أفضل الممارسات الهندسية المبسطة (Clean Architecture).

> **⚠️ تنبيه جوهري لكل الفرق:**
> هذا المشروع **ليس تطبيقاً مكتملاً**، ولا يحتوي عن قصد على أي ميزات جاهزة تخص مشروعاً بعينه (لا يوجد به تسجيل دخول Authentication، ولا جداول بيانات جاهزة، ولا لوحة تحكم Dashboard). كل فريق مسؤول مسؤولية كاملة عن فهم فكرة مشروعه، وتصميم قاعدة بياناته، وكتابة الأكواد الخاصة به بنفسه. الغرض من هذا الدليل هو أن تفهم **كل سطر وكل ملف** موجود هنا لتتمكن من البناء فوقه بثقة وفهم كامل.

---

## 📑 فهرس المحتويات

1. [كيف يعمل نظام MERN Stack؟ (الصورة الكبيرة)](#1-كيف-يعمل-نظام-mern-stack-الصورة-الكبيرة)
2. [التقنيات والحزم المستخدمة (ولماذا نستخدم كل واحدة منها؟)](#2-التقنيات-والحزم-المستخدمة-ولماذا-نستخدم-كل-واحدة-منها)
3. [المتطلبات الأساسية قبل البدء (Prerequisites)](#3-المتطلبات-الأساسية-قبل-البدء-prerequisites)
4. [دليل إعداد قاعدة البيانات السحابية MongoDB Atlas بالتفصيل](#4-دليل-إعداد-قاعدة-البيانات-السحابية-mongodb-atlas-بالتفصيل)
5. [خطوات تشغيل المشروع لأول مرة (خطوة بخطوة)](#5-خطوات-تشغيل-المشروع-لأول-مرة-خطوة-بخطوة)
6. [هيكل المشروع العام (Project Structure)](#6-هيكل-المشروع-العام-project-structure)
7. [تشريح الكود: شرح كل ملف وسطر برمجي بالتفصيل](#7-تشريح-الكود-شرح-كل-ملف-وسطر-برمجي-بالتفصيل)
   - [أولاً: تشريح الخادم الخلفي (Backend - `server/`)](#أولا-تشريح-الخادم-الخلفي-backend---server)
   - [ثانياً: تشريح الواجهة الأمامية (Frontend - `client/`)](#ثانيا-تشريح-الواجهة-الأمامية-frontend---client)
8. [التطبيق العملي الشامل (End-to-End): كيف تبني ميزة جديدة من الصفر؟](#8-التطبيق-العملي-الشامل-end-to-end-كيف-تبني-ميزة-جديدة-من-الصفر)
9. [دليل العمل الجماعي الاحترافي على Git و GitHub](#9-دليل-العمل-الجماعي-الاحترافي-على-git-و-github)
10. [دليل حل المشاكل والأخطاء الشائعة (Troubleshooting)](#10-دليل-حل-المشاكل-والأخطاء-الشائعة-troubleshooting)

---

## 1. كيف يعمل نظام MERN Stack؟ (الصورة الكبيرة)

قبل أن نفتح أي ملف كود، يجب أن تتخيل كيف تتحدث أجزاء المشروع مع بعضها البعض. المشروع مقسم إلى جزأين مستقلين تماماً يعمل كل منهما على منفذ (Port) مختلف:

1. **الواجهة الأمامية (`client`):** هي ما يراه المستخدم في المتصفح (مبنية بـ **React** وتعمل افتراضياً على المنفذ `5173`).
2. **الخادم الخلفي (`server`):** هو العقل المدبر الذي يستقبل الطلبات، يتأكد من صحتها، ويتحدث مع قاعدة البيانات (مبني بـ **Node.js & Express** ويعمل افتراضياً على المنفذ `5000`).
3. **قاعدة البيانات (`MongoDB`):** هي المخزن الذي تُحفظ فيه البيانات بشكل دائم (سواء على جهازك أو سحابياً عبر **MongoDB Atlas**).

### دورة حياة أي طلب (Request Lifecycle) في المشروع:

```text
[ المتصفح (React UI) ]  (يعمل على http://localhost:5173)
         │
         │ 1. المستخدم يضغط زراً أو يفتح صفحة -> يرسل طلب HTTP عبر (Axios)
         ▼
[ إعدادات الحماية والـ Middleware في Express ] (http://localhost:5000)
  (Helmet -> CORS -> express.json -> Morgan)
         │
         │ 2. يمر الطلب عبر الموجه (Route) المناسب (مثلاً: /api/health)
         ▼
[ المتحكم (Controller) ]
         │
         │ 3. ينفذ المنطق البرمجي ويطلب أو يحفظ بيانات عبر (Mongoose Model)
         ▼
[ قاعدة البيانات (MongoDB) ]
         │
         │ 4. تُرجع البيانات إلى الـ Controller، الذي يرسلها كـ JSON Response
         ▼
[ المتصفح (React UI) ] -> يستقبل الـ JSON ويعرض البيانات للمستخدم على الشاشة!
```

---

## 2. التقنيات والحزم المستخدمة (ولماذا نستخدم كل واحدة منها؟)

يستخدم المشروع نظام **ES Modules** الحديث في لغة JavaScript (أي استخدام `import` و `export` بدلاً من `require` القديمة)، وذلك بفضل وجود `"type": "module"` في ملفات `package.json`.

### أولاً: حزم الخادم الخلفي (`server/package.json`)

| الحزمة (Package)              | الغرض منها ولماذا نحتاجها في مشروعنا؟                                                                                                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`express`**                 | إطار العمل الأساسي لبناء السيرفر وتنظيم المسارات (Routes) والطلبات (Requests) والاستجابات (Responses).                                                                                            |
| **`mongoose`**                | مكتبة (ODM) تسهل التعامل مع قاعدة بيانات MongoDB؛ تسمح لنا بتعريف شكل البيانات (Schema) وإجراء عمليات البحث والإضافة والحذف بسهولة وأمان.                                                         |
| **`dotenv`**                  | تقرأ المتغيرات السرية والإعدادات من ملف `.env` وتضعها داخل `process.env` في Node.js حتى لا نكتب كلمات المرور داخل الكود.                                                                          |
| **`cors`**                    | (Cross-Origin Resource Sharing) حزمة ضرورية جداً؛ لأن المتصفح يمنع أمنياً أي موقع يعمل على منفذ (`5173`) من التحدث مع سيرفر على منفذ آخر (`5000`) إلا إذا سمح السيرفر بذلك صراحةً عبر هذه الحزمة. |
| **`helmet`**                  | تضيف مجموعة من ترويسات الحماية (HTTP Security Headers) تلقائياً لحماية السيرفر من الثغرات الشائعة.                                                                                                |
| **`morgan`**                  | تطبع سجل الطلبات (Logs) في شاشة الـ Terminal أثناء التطوير (مثل: `GET /api/health 200 4.5ms`) لتعرف فوراً أي طلب وصل للسيرفر وهل نجح أم فشل.                                                      |
| **`nodemon`** _(للتطوير فقط)_ | أداة تراقب ملفات السيرفر؛ كلما قمت بحفظ تعديل (`Ctrl + S`) في أي ملف داخل `server/`، تقوم بإعادة تشغيل السيرفر تلقائياً بدلاً من أن تغلقه وتشغله بيدك كل مرة.                                     |

### ثانياً: حزم الواجهة الأمامية (`client/package.json`)

| الحزمة (Package)          | الغرض منها ولماذا نحتاجها في مشروعنا؟                                                                                                                                |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`react` & `react-dom`** | المكتبة الأساسية لبناء واجهات المستخدم التفاعلية المعتمدة على المكونات (Components).                                                                                 |
| **`vite`**                | أداة تشغيل وبناء المشروع (Bundler & Dev Server)؛ سريعة جداً وتقوم بتحديث المتصفح لحظياً عند تعديل الكود (HMR).                                                       |
| **`react-router-dom`**    | مسؤولة عن التنقل بين صفحات الموقع المختلفة (مثلاً من الصفحة الرئيسية `/` إلى صفحة `/login` أو `/products`) دون إعادة تحميل الصفحة بالكامل (Single Page Application). |
| **`axios`**               | مكتبة لإرسال طلبات HTTP (`GET`, `POST`, `PUT`, `DELETE`) من React إلى سيرفر Express بسهولة، وهي أسهل وأقوى من دالة `fetch` الافتراضية.                               |
| **`eslint`**              | أداة تفحص كود React وتنبهك إذا كان هناك متغيرات غير مستخدمة أو أخطاء برمجية محتملة.                                                                                  |

---

## 3. المتطلبات الأساسية قبل البدء (Prerequisites)

قبل أن تبدأ بتحميل المشروع وتشغيله، تأكد من تثبيت البرامج التالية على جهازك:

1. **Node.js:** يجب أن يكون الإصدار **`20.19+`** أو **`22.12+`** (أو أحدث إصدار LTS متاح).
   - _لماذا هذا الإصدار تحديداً؟_ لأن الإصدار الحديث من **Vite 8** المستخدم في المشروع يتطلب هذه الإصدارات من Node.js ولن يعمل على الإصدارات القديمة مثل Node 16 أو 18.
2. **npm:** مدير الحزم، ويتم تثبيته تلقائياً بمجرد تثبيت Node.js.
3. **Git:** لإدارة الأكواد والعمل الجماعي مع فريقك.
4. **محرر أكواد:** يُنصح بشدة باستخدام **VS Code**.
5. **أداة اختبار API (اختياري ولكن مهم جداً):** برنامج **Postman** أو إضافة **Thunder Client** داخل VS Code لاختبار الـ Backend قبل ربطه بالـ Frontend.
6. **قاعدة بيانات MongoDB:** إما مثبتة محلياً على جهازك (MongoDB Community Server)، أو عبر حساب مجاني على **MongoDB Atlas** (وهو الخيار الأفضل للفرق ومشروح بالتفصيل في القسم التالي).

### كيف تتأكد أن الأدوات مثبتة لديك؟

افتح شاشة الأوامر (**Terminal** أو **PowerShell** أو **Command Prompt**) واكتب الأوامر التالية:

```bash
node -v
npm -v
git --version
```

إذا ظهر لك رقم إصدار لكل أمر (وتأكدت أن `node -v` يبدأ بـ `v20.19` أو أعلى، أو `v22.12` أو أعلى)، فأنت جاهز تماماً!

---

## 4. دليل إعداد قاعدة البيانات السحابية MongoDB Atlas بالتفصيل

عند العمل ضمن فريق، يفضل غالباً استخدام **MongoDB Atlas** (قاعدة بيانات سحابية مجانية) بدلاً من تثبيت MongoDB محلياً على جهاز كل طالب، أو حتى لتجربة العمل على بيئة سحابية حقيقية.

إليك خطوات إعدادها من الصفر حتى الحصول على رابط الاتصال (`MONGODB_URI`):

### الخطوة 1: إنشاء حساب وبناء Cluster مجاني

1. ادخل إلى موقع [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) وأنشئ حساباً مجانياً (يمكنك التسجيل بحساب Google).
2. بعد الدخول، اضغط على **Build a Cluster** (أو **Create**).
3. اختر الخطة المجانية **`M0` (Free Tier)**.
4. اختر مزود الخدمة (AWS) وأقرب منطقة جغرافية لك (مثل Frankfurt أو أيرلندا)، ثم اضغط **Create Deployment**.

### الخطوة 2: إنشاء مستخدم لقاعدة البيانات (Database User)

ستظهر لك نافذة إعداد الأمان (**Security Quickstart**) أو يمكنك الوصول إليها من القائمة الجانبية تحت قسم **Security -> Database Access**:

1. اضغط **Add New Database User**.
2. اختر طريقة المصادقة **Password**.
3. اكتب اسم مستخدم (Username) مثل: `team_admin`.
4. اكتب كلمة مرور قوية (Password) **واحفظها في مكان آمن لأنك ستحتاجها بعد قليل**.
   > **💡 نصيحة مهمة جداً:** تجنب استخدام الرموز الخاصة المعقدة مثل `@` أو `#` أو `/` أو `:` في كلمة المرور؛ لأنها تسبب خطأ في رابط الاتصال ما لم يتم تشفيرها (URL Encoding). استخدم حروفاً كبيرة وصغيرة وأرقاماً فقط لتجنب المشاكل!
5. تأكد أن الصلاحيات مضبوطة على **Read and write to any database** ثم اضغط **Add User**.

### الخطوة 3: السماح بالوصول عبر الشبكة (Network Access) — **(خطوة ينساها 90% من الطلاب!)**

افتراضياً، تمنع MongoDB Atlas أي جهاز في العالم من الاتصال بقاعدة البيانات إلا إذا أضفت عنوان الـ IP الخاص به. وبما أن أعضاء الفريق يعملون من منازلهم أو من شبكة الجامعة (ويتغير الـ IP الخاص بهم باستمرار)، يجب فتح الوصول للجميع أثناء فترة تطوير المشروع الدراسي:

1. من القائمة الجانبية اليسرى، اذهب إلى **Security -> Network Access**.
2. اضغط على زر **Add IP Address**.
3. اضغط على زر **Allow Access from Anywhere** (سيقوم تلقائياً بكتابة `0.0.0.0/0` في خانة Access List Entry).
4. اضغط **Confirm** وانتظر دقيقة حتى تتحول الحالة من `Pending` إلى `Active`.

### الخطوة 4: الحصول على رابط الاتصال (Connection String)

1. من القائمة الجانبية، ارجع إلى **Deployment -> Database** (أو **Clusters**).
2. اضغط على زر **Connect** بجوار اسم الـ Cluster الخاص بك.
3. اختر **Drivers** (الاتصال عبر الكود).
4. تأكد من اختيار Driver: **Node.js**، ثم انسخ الرابط الذي يظهر لك، وسيكون شكله هكذا:
   ```text
   mongodb+srv://team_admin:<db_password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **تعديل الرابط قبل وضعه في ملف `.env`:**
   - استبدل `<db_password>` بكلمة المرور الحقيقية التي أنشأتها في الخطوة 2 (مع حذف علامتي `<` و `>`).
   - اكتب اسم قاعدة بيانات مشروعك **بعد علامة `/` مباشرة وقبل علامة `?`** (مثلاً `hospital_system` أو `library_db`).
   - ليصبح الشكل النهائي الصحيح هكذا:
   ```text
   mongodb+srv://team_admin:MyPass12345@cluster0.xxxxx.mongodb.net/my_project_db?retryWrites=true&w=majority
   ```

---

## 5. خطوات تشغيل المشروع لأول مرة (خطوة بخطوة)

> **📌 ملاحظة مهمة:** هذا المستودع لا يستخدم حزمة واحدة في الجذر الرئيسي، بل يحتوي على مشروعين منفصلين: مجلد `server` ومجلد `client`. لذلك **لا تشغل أمر `npm install` في المجلد الرئيسي للمشروع**، بل داخل كل مجلد على حدة كما هو موضح بالأسفل.

### أولاً: تحميل المشروع على جهازك

بعد أن يقوم قائد الفريق (Team Leader) بعمل **Fork** للمشروع (كما سنشرح في قسم Git)، يقوم كل عضو بنسخ رابط مستودع الفريق وتشغيل الأمر التالي:

```bash
git clone https://github.com/YOUR-TEAM-LEADER-USERNAME/mern-university-starter.git
cd mern-university-starter
```

---

### ثانياً: إعداد وتشغيل الخادم الخلفي (`server`)

1. افتح الـ Terminal داخل مجلد المشروع، وادخل إلى مجلد `server` ثم ثبت الحزم:

   ```bash
   cd server
   npm install
   ```

2. أنشئ ملف البيئة السري `.env` عن طريق نسخ ملف `.env.example` الموجود:
   - **إذا كنت تستخدم Windows PowerShell:**
     ```powershell
     Copy-Item .env.example .env
     ```
   - **إذا كنت تستخدم macOS / Linux / Git Bash:**
     ```bash
     cp .env.example .env
     ```
     _(أو يمكنك ببساطة داخل VS Code عمل نسخة من ملف `.env.example` وتسميتها `.env`)._

3. افتح ملف `server/.env` وتأكد من الإعدادات الموجودة بداخله:

   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://127.0.0.1:27017/mern_university_starter
   ```

   - إذا كنت تستخدم **MongoDB محلياً** على جهازك، اترك `MONGODB_URI` كما هو.
   - إذا كنت تستخدم **MongoDB Atlas**، امسح السطر الأخير وضع رابط الـ Connection String الذي جهزناه في القسم السابق.

4. شغّل السيرفر في وضع التطوير:

   ```bash
   npm run dev
   ```

5. **كيف تعرف أن السيرفر يعمل بنجاح؟**
   يجب أن ترى هاتين الرسالتين في الـ Terminal:
   ```text
   MongoDB connected: mern_university_starter
   Server running on port 5000
   ```
   **⚠️ اترك شاشة الـ Terminal هذه مفتوحة ولا تغلقها طوال فترة عملك!**

---

### ثالثاً: إعداد وتشغيل الواجهة الأمامية (`client`)

1. افتح **شاشة Terminal ثانية جديدة تماماً** (من داخل VS Code اضغط على علامة `+` في نافذة الـ Terminal)، ثم ادخل إلى مجلد `client` وثبت الحزم:

   ```bash
   cd client
   npm install
   ```

2. أنشئ ملف `.env` داخل مجلد `client` بنسخ ملف `.env.example`:
   - **على Windows PowerShell:**
     ```powershell
     Copy-Item .env.example .env
     ```
   - **على macOS / Linux / Git Bash:**
     ```bash
     cp .env.example .env
     ```

3. افتح ملف `client/.env` وستجد بداخله هذا السطر:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   _(هذا السطر يخبر React أن السيرفر الخلفي يعمل على المنفذ `5000` تحت المسار `/api`)._

4. شغّل تطبيق React:

   ```bash
   npm run dev
   ```

5. سيطبع لك Vite رابطاً في الـ Terminal (غالباً `http://localhost:5173`). افتح هذا الرابط في المتصفح!

---

### رابعاً: كيف تتأكد أن الـ Frontend والـ Backend متصلان فعلياً؟

1. بعد فتح `http://localhost:5173` في المتصفح، ستظهر لك جملة:
   - **MERN University Starter**
   - **Frontend is running.**
2. اضغط بزر الفأرة الأيمن في أي مكان بالصفحة واختر **Inspect (فحص)** ثم افتح تبويب **Console**.
3. ستجد رسالة مطبوعة في الـ Console:
   ```javascript
   Backend Response: {
     success: true,
     message: "Server is running",
     data: { environment: "development", timestamp: "..." }
   }
   ```
4. إذا رأيت هذه الرسالة في الـ Console، فهذا يعني أن **React تواصل مع Express، وExpress متصل بـ MongoDB، وكل شيء يعمل بنسبة 100%!** 🎉

---

## 6. هيكل المشروع العام (Project Structure)

إليك الخريطة الكاملة لمجلدات وملفات المشروع، حتى تعرف أين يقع كل جزء قبل أن نشرح الكود سطراً بسطر:

```text
mern-university-starter/
├── client/                                 # مشروع الواجهة الأمامية (React + Vite)
│   ├── src/
│   │   ├── assets/                         # الصور، الأيقونات، والملفات الثابتة
│   │   ├── components/                     # المكونات القابلة لإعادة الاستخدام (Navbar, Button, Card...)
│   │   ├── layouts/                        # تخطيطات الصفحات المشتركة (MainLayout, DashboardLayout...)
│   │   ├── pages/                          # صفحات الموقع الكاملة
│   │   │   ├── Home.jsx                    # الصفحة الرئيسية
│   │   │   └── NotFound.jsx                # صفحة الخطأ 404
│   │   ├── services/                       # إعدادات الاتصال بالـ Backend API
│   │   │   └── api.js                      # نسخة Axios المجهزة مسبقاً
│   │   ├── styles/                         # ملفات التنسيق CSS
│   │   │   └── global.css                  # التنسيقات العامة وتصفير إعدادات المتصفح (CSS Reset)
│   │   ├── App.jsx                         # المكون الرئيسي الذي يحدد مسارات الصفحات (Routes)
│   │   └── main.jsx                        # نقطة انطلاق React وربطها بملف index.html
│   ├── .env.example                        # نموذج متغيرات البيئة للواجهة الأمامية
│   ├── index.html                          # ملف الـ HTML الوحيد الذي يحمل تطبيق React
│   ├── package.json                        # حزم وأوامر تشغيل الواجهة الأمامية
│   └── vite.config.js                      # إعدادات أداة Vite
│
├── server/                                 # مشروع الخادم الخلفي (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/                         # ملفات الإعدادات والتهيئة
│   │   │   ├── env.js                      # قراءة وتصدير متغيرات البيئة (.env)
│   │   │   └── database.js                 # دالة الاتصال بقاعدة بيانات MongoDB
│   │   ├── controllers/                    # المنطق البرمجي لكل مسار (Request Handlers)
│   │   │   └── health.controller.js        # متحكم فحص حالة السيرفر
│   │   ├── middlewares/                    # الدوال الوسيطة (معالجة الأخطاء، الحماية، التحقق)
│   │   │   ├── notFound.middleware.js      # التقاط أي مسار غير موجود وإرجاع 404
│   │   │   └── error.middleware.js         # المعالج المركزي الموحد لجميع أخطاء السيرفر
│   │   ├── routes/                         # تعريف مسارات الـ API (Endpoints)
│   │   │   └── health.routes.js            # مسار فحص حالة السيرفر
│   │   ├── app.js                          # تهيئة تطبيق Express وتركيب الـ Middlewares والـ Routes
│   │   └── server.js                       # نقطة التشغيل: يتصل بقاعدة البيانات ثم يشغل السيرفر
│   ├── .env.example                        # نموذج متغيرات البيئة للخادم الخلفي
│   └── package.json                        # حزم وأوامر تشغيل الخادم الخلفي
│
├── docs/                                   # مجلد التوثيق الإضافي
├── .gitignore                              # يحدد الملفات التي يجب ألا تُرفع على GitHub (مثل node_modules و .env)
└── README.md                               # هذا الدليل الشامل
```

> **💡 لماذا توجد ملفات باسم `.gitkeep` داخل بعض المجلدات مثل `components` و `layouts` و `assets`؟**
> أداة Git تتجاهل المجلدات الفارغة تماماً ولا ترفعها إلى GitHub. ولأننا أردنا تجهيز هيكل المجلدات الصحيح لكم منذ البداية، وضعنا ملفاً فارغاً غير مؤثر اسمه `.gitkeep` داخل كل مجلد فارغ ليتم رفعه على GitHub. بمجرد أن تضيفوا ملفاتكم الحقيقية داخل هذه المجلدات، يمكنكم ترك `.gitkeep` أو حذفه.

---

## 7. تشريح الكود: شرح كل ملف وسطر برمجي بالتفصيل

في هذا القسم، سنفتح **كل ملف** في المستودع ونشرح الكود المكتوب بداخله سطراً بسطر، ولماذا كُتب بهذه الطريقة.

---

### أولاً: تشريح الخادم الخلفي (Backend - `server/`)

#### 1. ملف `server/src/config/env.js` (مركز متغيرات البيئة)

```javascript
import "dotenv/config";

export const PORT = process.env.PORT || 5000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

export const MONGODB_URI = process.env.MONGODB_URI;
```

- **ماذا يفعل هذا الملف؟**
  - السطر `import "dotenv/config"` يقوم فوراً بقراءة ملف `server/.env` وتحميل كل ما فيه داخل كائن `process.env`.
  - بدلاً من أن نكتب `process.env.PORT` في عشرات الملفات داخل المشروع، نقوم بقراءتها هنا في مكان واحد وتصديرها (`export const`) مع وضع **قيمة احتياطية (Fallback)** باستخدام المعامل `||`.
  - مثلاً: إذا نسي شخص وضع `PORT` في ملف `.env`، سيعمل السيرفر تلقائياً على `5000`.
  - **لماذا لم نضع قيمة احتياطية لـ `MONGODB_URI`؟** لأن الاتصال بقاعدة البيانات أمر حساس؛ إذا نسي المطور إعداد ملف `.env`، نريد أن ينبهه السيرفر فوراً بدلاً من الاتصال بقاعدة بيانات خاطئة دون علمه.

---

#### 2. ملف `server/src/config/database.js` (الاتصال بقاعدة البيانات)

```javascript
import mongoose from "mongoose";

import { MONGODB_URI } from "./env.js";

const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const connection = await mongoose.connect(MONGODB_URI);

  console.log(`MongoDB connected: ${connection.connection.name}`);
};

export default connectDB;
```

- **ماذا يفعل هذا الملف؟**
  - يستورد مكتبة `mongoose` ورابط القاعدة `MONGODB_URI` من ملف الإعدادات.
  - يعرف دالة غير متزامنة (`async`) اسمها `connectDB`.
  - يتحقق أولاً: هل `MONGODB_URI` غير موجود؟ إذا كان فارغاً، يلقي خطأ واضحاً (`throw new Error("MONGODB_URI is not defined")`) ليخبرك أنك نسيت إعداد ملف `.env`.
  - يتصل بـ MongoDB عبر `await mongoose.connect(MONGODB_URI)`.
  - عند نجاح الاتصال، يطبع اسم قاعدة البيانات التي اتصل بها (`connection.connection.name`) في الـ Terminal.

---

#### 3. لماذا فصلنا بين `server.js` و `app.js`؟ (سؤال هندسي مهم!)

في الشروحات المبدئية، يضع المبتدئون كود Express وكود تشغيل السيرفر في ملف واحد. لكن في المشاريع المنظمة نفصل بينهما لسببين:

1. **`app.js`** مسؤول فقط عن **تهيئة تطبيق Express** (إعداد الحماية، قراءة الـ JSON، ربط الـ Routes، ومعالجة الأخطاء).
2. **`server.js`** مسؤول فقط عن **التشغيل الفعلي (Bootstrapping)**: يتصل بقاعدة البيانات أولاً، ثم يفتح منفذ الشبكة (`app.listen`). هذا الفصل يجعل الكود أنظف بكثير ويسهل اختبار التطبيق لاحقاً.

---

#### 4. ملف `server/src/server.js` (نقطة تشغيل السيرفر)

```javascript
import app from "./app.js";

import connectDB from "./config/database.js";

import { PORT } from "./config/env.js";

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start HTTP Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);

    process.exit(1);
  }
};

startServer();
```

- **ماذا يحدث هنا بالترتيب؟**
  1. نستدعي `await connectDB()` **قبل** تشغيل السيرفر. لماذا؟ لأنه لا معنى لأن يستقبل السيرفر طلبات من المستخدمين بينما قاعدة البيانات غير متصلة!
  2. إذا نجح الاتصال بقاعدة البيانات، ينتقل السطر التالي لتشغيل السيرفر عبر `app.listen(PORT)`.
  3. إذا فشل الاتصال بقاعدة البيانات لأي سبب، ينتقل الكود إلى `catch (error)`، ويطبع سبب الخطأ بوضوح، ثم ينفذ `process.exit(1)` التي تقوم بإيقاف عملية Node.js فوراً مع كود خروج يدل على وجود خطأ (`1`).

---

#### 5. ملف `server/src/app.js` (العمود الفقري لتطبيق Express)

```javascript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { CLIENT_URL, NODE_ENV } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Security Middleware
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

// Request Parsing
app.use(express.json());

// HTTP Request Logging
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/health", healthRoutes);

// 404 Handler
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

export default app;
```

- **قاعدة ذهبية في Express:** **الترتيب في `app.js` مهم جداً!** أي طلب (Request) يدخل السيرفر يمر على دوال `app.use(...)` من الأعلى إلى الأسفل بالترتيب:
  1. `app.use(helmet())`: يضيف ترويسات الحماية أولاً.
  2. `app.use(cors({ origin: CLIENT_URL }))`: يتحقق من أن الطلب قادم من تطبيق React المصرح له (`http://localhost:5173`).
  3. `app.use(express.json())`: **مهم جداً!** عندما يرسل React بيانات (مثل بيانات تسجيل طالب جديد بصيغة JSON في `req.body`)، لا يستطيع Express قراءتها افتراضياً إلا بوجود هذا السطر الذي يحول البيانات النصية القادمة إلى كائن JavaScript داخل `req.body`.
  4. `app.use(morgan("dev"))`: يعمل فقط عندما نكون في بيئة التطوير (`development`) ليطبع تفاصيل الطلبات في الـ Terminal.
  5. `app.use("/api/health", healthRoutes)`: هنا نركّب مسارات الـ API الخاصة بنا. أي طلب يبدأ بـ `/api/health` سيتم توجيهه إلى ملف `health.routes.js`. **(وهنا ستضيفون مسارات مشاريعكم الجديدة)**.
  6. `app.use(notFound)`: إذا وصل الطلب إلى هذا السطر، فهذا يعني أنه **لم يطابق أياً من المسارات السابقة**! فيقوم `notFound` بالتقاطه واعتباره خطأ `404`.
  7. `app.use(errorHandler)`: المحطة الأخيرة في السيرفر؛ تستقبل أي خطأ حدث في أي مكان فوقها، وترسله للمتصفح بصيغة JSON موحدة ومنظمة.

---

#### 6. ملفا `health.routes.js` و `health.controller.js` (مثال الفصل بين المسار والمنطق)

**ملف `server/src/routes/health.routes.js`:**

```javascript
import { Router } from "express";

import { getHealth } from "../controllers/health.controller.js";

const router = Router();

router.get("/", getHealth);

export default router;
```

- **ملاحظة ذكية:** لماذا كتبنا `router.get("/", getHealth)` ولم نكتب `router.get("/api/health", getHealth)`؟
  لأننا في `app.js` قمنا مسبقاً بتركيب هذا الراوتر على المسار `/api/health` عبر `app.use("/api/health", healthRoutes)`. وبالتالي فإن `/` هنا تعني تلقائياً `/api/health`!

**ملف `server/src/controllers/health.controller.js`:**

```javascript
import { NODE_ENV } from "../config/env.js";

const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    data: {
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
    },
  });
};

export { getHealth };
```

- **ماذا يفعل الـ Controller؟**
  يستقبل كائن الطلب `req` وكائن الاستجابة `res`، ويرجع حالة النجاح `200` مع كائن JSON قياسي يحتوي على `success: true`، ورسالة توضيحية، والبيانات المطلوبة `data`. ننصح جميع الفرق بتوحيد شكل الـ JSON Response في مشاريعهم بنفس هذا النمط (`{ success, message, data }`) لأنه يسهل التعامل مع البيانات في React.

---

#### 7. ملفا `notFound.middleware.js` و `error.middleware.js` (كيف تُدار الأخطاء باحترافية؟)

**ملف `server/src/middlewares/notFound.middleware.js`:**

```javascript
const notFound = (req, res, next) => {
  res.status(404);

  next(new Error(`Route not found: ${req.originalUrl}`));
};

export default notFound;
```

- عندما يطلب شخص مساراً غير موجود (مثلاً `GET /api/xyz`)، تضبط هذه الدالة حالة الاستجابة إلى `404`، ثم تنشئ كائن خطأ `new Error(...)` يحمل اسم الرابط الخاطئ (`req.originalUrl`)، وتمرره داخل دالة `next(...)`.
- **معلومة مهمة في Express:** عندما تمرر أي شيء داخل `next(err)`، يتخطى Express كل المسارات العادية ويقفز مباشرة إلى **معالج الأخطاء (`errorHandler`)**!

**ملف `server/src/middlewares/error.middleware.js`:**

```javascript
import { NODE_ENV } from "../config/env.js";

const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode ||
    err.status ||
    (res.statusCode >= 400 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,

    message: NODE_ENV === "development" ? err.message : "Internal Server Error",

    ...(NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
```

- **كيف يعرف Express أن هذه الدالة هي معالج أخطاء وليست Middleware عادياً؟**
  لأنها تستقبل **4 معاملات** بالضبط: `(err, req, res, next)`.
- تحسب الدالة كود الخطأ (`statusCode`)؛ فإذا كان للخطأ كود محدد (مثل `400` أو `404`) تستخدمه، وإلا تعتبره خطأ خادم داخلي `500`.
- ترجع JSON منظم يحتوي على `success: false` ورسالة الخطأ `err.message` وتفاصيل مكان الخطأ في الكود `err.stack` (أثناء التطوير فقط لمساعدتك على اكتشاف مكان الخطأ بسرعة).
- **ميزة إضافية رائعة في هذا القالب:** هذا المشروع يستخدم **Express 5** (`^5.3.0`)، والذي يتميز بأنه يلتقط أي خطأ يحدث داخل دوال `async/await` (مثل أخطاء قاعدة البيانات) ويرسله **تلقائياً** إلى `errorHandler` دون أن يتوقف السيرفر عن العمل (Crash)!

---

### ثانياً: تشريح الواجهة الأمامية (Frontend - `client/`)

#### 1. ملف `client/src/main.jsx` (نقطة انطلاق React)

```jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/global.css";

// StrictMode is disabled to avoid additional effect executions
// during development in this educational starter template.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

- يبحث هذا الملف عن العنصر `<div id="root"></div>` الموجود في `client/index.html` ويحقن بداخله تطبيق React بالكامل.
- نحيط المكون `<App />` بالمكون `<BrowserRouter>` لتمكين ميزة التنقل بين الصفحات في كل أنحاء التطبيق.
- **لماذا تم تعطيل `StrictMode` هنا؟** في مشاريع React الافتراضية، يقوم `StrictMode` بتشغيل `useEffect` مرتين متتاليتين أثناء التطوير، مما يجعل الطلاب المبتدئين يظنون أن الكود الخاص بهم به خطأ ويرسل الطلب للسيرفر مرتين! لذلك قمنا بإزالته في هذا القالب التعليمي لتكون تجربة التطوير واضحة ومباشرة.

---

#### 2. ملف `client/src/App.jsx` (خريطة مسارات الواجهة الأمامية)

```jsx
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

- يحدد هذا الملف أي صفحة تظهر للمستخدم بناءً على الرابط المكتوب في المتصفح:
  - إذا كان الرابط هو `/`، يعرض مكون `<Home />`.
  - إذا كتب المستخدم أي رابط آخر غير معرف (`path="*"`)، يعرض صفحة `<NotFound />` (404).
- عندما ينشئ فريقك صفحات جديدة (مثل صفحة عرض الطلاب أو صفحة تسجيل الدخول)، ستقومون باستيرادها هنا وإضافة `<Route path="/students" element={<Students />} />` قبل مسار `*`.

---

#### 3. ملف `client/src/services/api.js` (حلقة الوصل الذكية مع السيرفر)

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export default api;
```

- **لماذا أنشأنا هذا الملف بدلاً من استخدام `axios.get("http://localhost:5000/api/...")` مباشرة في الصفحات؟**
  تخيل أن لديكم 20 صفحة في المشروع، وكتبتم في كل صفحة `http://localhost:5000/api/...`، ثم قررتم تغيير المنفذ إلى `8000` أو رفعتم المشروع على الإنترنت! ستضطرون لتعديل 20 ملفاً يدوياً.
- أما باستخدام `api.js`، فإننا نقرأ العنوان الأساسي مرة واحدة من `import.meta.env.VITE_API_BASE_URL` (الموجود في `client/.env`). وفي أي صفحة داخل React، نكتب فقط:
  ```javascript
  api.get("/health"); // يرسل تلقائياً إلى http://localhost:5000/api/health
  ```
- **ملاحظة مهمة عن Vite:** في Vite، أي متغير بيئة داخل `client/.env` **يجب أن يبدأ بكلمة `VITE_`**، ويتم استدعاؤه بالكود عبر `import.meta.env.VITE_VARIABLE_NAME` (وليس `process.env` الذي يخص Node.js فقط).

---

#### 4. ملف `client/src/pages/Home.jsx` (مثال الاتصال بالسيرفر)

```jsx
import { useEffect } from "react";
import api from "../services/api";

function Home() {
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await api.get("/health");

        console.log("Backend Response:", response.data);
      } catch (error) {
        console.error("Backend Connection Failed:", error);
      }
    };

    checkServer();
  }, []);

  return (
    <main>
      <h1>MERN University Starter</h1>
      <p>Frontend is running.</p>
    </main>
  );
}

export default Home;
```

- بمجرد فتح الصفحة الرئيسية، يعمل الـ Hook المسمى `useEffect` (وبسبب وجود المصفوفة الفارغة `[]` في نهايته، فإنه يعمل **مرة واحدة فقط** عند تحميل المكون).
- يستدعي الدالة `api.get("/health")`، وعندما يرد السيرفر، يضع Axios بيانات الرد الفعلي داخل `response.data`، فنطبعها في الـ Console.

---

#### 5. ملف `client/src/pages/NotFound.jsx` و `client/src/styles/global.css`

- في **`NotFound.jsx`**: نستخدم المكون `<Link to="/">Go Home</Link>` من مكتبة `react-router-dom` بدلاً من وسم `<a href="/">` العادي في HTML. **لماذا؟** لأن `<a>` يجبر المتصفح على إعادة تحميل الصفحة بالكامل وفقدان حالة التطبيق (State)، بينما `<Link>` ينقلك للصفحة الأخرى فوراً وبسلاسة داخل React.
- في **`global.css`**: يحتوي على تصفير الهوامش الافتراضية للمتصفح (`margin: 0; padding: 0; box-sizing: border-box;`) وتنسيقات أساسية للخطوط والصور والأزرار لتبدأوا تصميمكم على أرضية نظيفة.

---

## 8. التطبيق العملي الشامل (End-to-End): كيف تبني ميزة جديدة من الصفر؟

هذا القسم هو **أهم جزء تطبيقي في الدليل**. لكي تفهم كيف تبني مشروع فريقك فوق هذا القالب، سنقوم معاً ببناء ميزة مصغرة كاملة (End-to-End) خطوة بخطوة: من قاعدة البيانات، مروراً بالـ Backend، ووصولاً إلى عرضها وإضافتها من شاشة React!

> **🎯 المثال التوضيحي:** لنفترض أننا نريد إضافة ميزة **"إدارة المقررات الدراسية (Courses)"** (عرض كل المقررات + إضافة مقرر جديد). طبق نفس هذه الخطوات الـ 5 على أي فكرة في مشروعك (منتجات، مرضى، كتب، مهام، حجوزات... إلخ).

---

### الخطوة 1: إنشاء الـ Model وتحديد شكل البيانات (`server/src/models/course.model.js`)

القالب لا يحتوي مبدئياً على مجلد `models/` لأنه لا يفرض عليك بيانات معينة. لذا أول خطوة هي إنشاء مجلد جديد باسم **`models`** داخل `server/src/`، وإنشاء ملف بداخله باسم `course.model.js`:

```javascript
// المسار: server/src/models/course.model.js
import mongoose from "mongoose";

// 1. تعريف الـ Schema (شكل البيانات وقواعد التحقق منها)
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "اسم المقرر مطلوب"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "كود المقرر مطلوب"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    creditHours: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
  },
  {
    // يضيف تلقائياً حقلي createdAt و updatedAt لكل سجل في قاعدة البيانات
    timestamps: true,
  },
);

// 2. تحويل الـ Schema إلى Model يمكننا من خلاله التحدث مع مجموعة (Collection) باسم courses
const Course = mongoose.model("Course", courseSchema);

export default Course;
```

---

### الخطوة 2: إنشاء الـ Controller لكتابة المنطق البرمجي (`server/src/controllers/course.controller.js`)

نذهب إلى مجلد `server/src/controllers/` وننشئ ملفاً باسم `course.controller.js` لكتابة دوال جلب المقررات وإضافة مقرر جديد:

```javascript
// المسار: server/src/controllers/course.controller.js
import Course from "../models/course.model.js";

// 1. دالة لجلب جميع المقررات (GET /api/courses)
export const getCourses = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: courses,
  });
};

// 2. دالة لإضافة مقرر جديد (POST /api/courses)
export const createCourse = async (req, res) => {
  const { title, code, creditHours } = req.body;

  // تحقق بسيط من المدخلات
  if (!title || !code || !creditHours) {
    res.status(400);
    throw new Error(
      "يرجى إدخال جميع الحقول المطلوبة (title, code, creditHours)",
    );
  }

  const newCourse = await Course.create({
    title,
    code,
    creditHours,
  });

  res.status(201).json({
    success: true,
    message: "تمت إضافة المقرر بنجاح",
    data: newCourse,
  });
};
```

_(لاحظ كيف أننا عندما رمينا خطأ `throw new Error(...)` بعد `res.status(400)`، سيتولى Express 5 إرساله تلقائياً إلى ملف `error.middleware.js` ليرجع للمتصفح رسالة خطأ منظمة!)._

---

### الخطوة 3: إنشاء الـ Routes لربط الروابط بالدوال (`server/src/routes/course.routes.js`)

نذهب إلى مجلد `server/src/routes/` وننشئ ملفاً باسم `course.routes.js`:

```javascript
// المسار: server/src/routes/course.routes.js
import { Router } from "express";
import { getCourses, createCourse } from "../controllers/course.controller.js";

const router = Router();

// عند إرسال طلب GET إلى /api/courses -> شغل دالة getCourses
router.get("/", getCourses);

// عند إرسال طلب POST إلى /api/courses -> شغل دالة createCourse
router.post("/", createCourse);

export default router;
```

---

### الخطوة 4: تعريف المسار الجديد داخل `server/src/app.js`

الآن نفتح ملف `server/src/app.js`، ونستورد ملف `courseRoutes` ونركبه **تحت مسار `healthRoutes` وقبل `notFound`**:

```javascript
// داخل ملف server/src/app.js
import healthRoutes from "./routes/health.routes.js";
import courseRoutes from "./routes/course.routes.js"; // <-- 1. استيراد المسار الجديد

// ... (باقي إعدادات الـ Middlewares كما هي)

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/courses", courseRoutes); // <-- 2. تركيب المسار الجديد هنا!

// 404 Handler (يجب أن يظل دائماً بعد جميع الـ Routes)
app.use(notFound);
app.use(errorHandler);
```

> **👏 مبروك!** الآن أصبح لديك Backend API كامل يعمل على `http://localhost:5000/api/courses`. يمكنك اختباره فوراً ببرنامج **Postman** قبل حتى أن تكتب سطراً واحداً في React!

---

### الخطوة 5: ربط الميزة بالواجهة الأمامية في React (`client/src/pages/Courses.jsx`)

الآن ننتقل إلى مجلد الواجهة الأمامية `client/src/pages/` وننشئ صفحة جديدة باسم `Courses.jsx` تجلب البيانات من السيرفر وتعرضها، وتحتوي على نموذج (Form) لإضافة مقرر جديد:

```jsx
// المسار: client/src/pages/Courses.jsx
import { useState, useEffect } from "react";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [creditHours, setCreditHours] = useState(3);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. دالة جلب المقررات من السيرفر
  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data.data); // لأن السيرفر يرجع { success: true, data: [...] }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  // تشغيل الجلب تلقائياً عند فتح الصفحة
  useEffect(() => {
    fetchCourses();
  }, []);

  // 2. دالة إرسال النموذج لإضافة مقرر جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await api.post("/courses", {
        title,
        code,
        creditHours: Number(creditHours),
      });

      // تفريغ الحقول وإعادة جلب القائمة المحدثة
      setTitle("");
      setCode("");
      setCreditHours(3);
      fetchCourses();
    } catch (error) {
      // قراءة رسالة الخطأ القادمة من error.middleware.js في السيرفر
      setErrorMsg(error.response?.data?.message || "حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>إدارة المقررات الدراسية</h1>

      {/* نموذج إضافة مقرر جديد */}
      <form
        onSubmit={handleSubmit}
        style={{ margin: "1.5rem 0", display: "grid", gap: "0.75rem" }}
      >
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <input
          type="text"
          placeholder="اسم المقرر (مثال: هندسة البرمجيات)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="كود المقرر (مثال: CS309)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="عدد الساعات"
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
          min="1"
          max="6"
          required
        />
        <button type="submit">إضافة المقرر</button>
      </form>

      {/* قائمة عرض المقررات */}
      <ul>
        {courses.map((course) => (
          <li key={course._id} style={{ marginBottom: "0.5rem" }}>
            <strong>{course.code}</strong> - {course.title} (
            {course.creditHours} ساعات)
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Courses;
```

وأخيراً، نضيف مسار هذه الصفحة داخل `client/src/App.jsx`:

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses"; // <-- 1. استيراد الصفحة
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />{" "}
      {/* <-- 2. إضافة المسار */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

الآن عند فتح `http://localhost:5173/courses` ستتمكن من إضافة مقررات ورؤيتها تحفظ في قاعدة بيانات MongoDB وتظهر أمامك فوراً!

---

## 9. دليل العمل الجماعي الاحترافي على Git و GitHub

أكبر سبب لتعطل مشاريع الفرق الجامعية ليس صعوبة البرمجة، بل **العمل العشوائي بدون تنظيم Git** (كتابة الكود على نفس الفرع `main`، أو مسح كود زميلك عن طريق الخطأ). اتبعوا هذا النظام الصارم منذ اليوم الأول:

### أولاً: مهمة قائد الفريق (Team Leader) — تُعمل مرة واحدة فقط في البداية

1. يفتح قائد الفريق صفحة هذا المستودع الأصلي على GitHub، ويضغط على زر **Fork** في أعلى اليمين لإنشاء نسخة خاصة بالفريق في حسابه الشخصي.
2. يدخل قائد الفريق إلى إعدادات نسخته: **`Settings` -> `Collaborators` -> `Add people`**، ويضيف حسابات جميع أعضاء فريقه.
3. يقبل أعضاء الفريق الدعوة التي ستصلهم عبر البريد الإلكتروني أو إشعارات GitHub.
4. يرسل قائد الفريق رابط المستودع الجديد الخاص به لأعضاء الفريق ليعملوا عليه.
   _(⚠️ لا يعمل أي فريق على المستودع الأصلي للـ Starter، بل يعمل كل فريق داخل الـ Fork الخاص بقائد فريقه)._

---

### ثانياً: دورة العمل اليومية لكل عضو في الفريق (Git Workflow)

**القاعدة الذهبية:** يُمنع منعاً باتاً كتابة كود أو عمل `push` مباشرة على الفرع الرئيسي `main`. كل مهمة (Task) لها فرع (`Branch`) مستقل خاص بها!

#### 1. استنساخ المشروع (تُعمل مرة واحدة فقط في بداية المشروع):

```bash
git clone https://github.com/TEAM-LEADER-USERNAME/PROJECT-REPO-NAME.git
cd PROJECT-REPO-NAME
```

#### 2. قبل أن تبدأ العمل على أي مهمة جديدة:

تأكد دائماً أنك تقف على الفرع الرئيسي `main` وأن لديك أحدث كود قام زملاؤك برفعه:

```bash
git switch main
git pull origin main
```

#### 3. أنشئ فرعاً (Branch) جديداً باسم المهمة التي تعمل عليها:

```bash
git switch -c feature/patient-booking
```

_أمثلة لأسماء فروع منظمة:_

- `feature/navbar-component`
- `feature/doctor-crud-api`
- `fix/login-form-alignment`

#### 4. اكتب الكود الخاص بمهمتك، وجربه جيداً على جهازك، ثم احفظ تعديلاتك (Commit):

```bash
git add .
git commit -m "feat: add patient booking model and controller"
```

_أمثلة لرسائل Commit احترافية وواضحة:_

- `feat: add course listing page` (عند إضافة ميزة جديدة)
- `fix: handle missing fields in course creation` (عند إصلاح خطأ)
- `style: update home page layout` (عند تعديل تنسيقات CSS)

#### 5. ارفع فرعك إلى GitHub:

```bash
git push -u origin feature/patient-booking
```

#### 6. افتح طلب دمج (Pull Request) على GitHub:

1. افتح صفحة مستودع فريقك على GitHub، ستجد زراً أخضر ظهر تلقائياً بعنوان **Compare & pull request**، اضغط عليه.
2. اكتب وصفاً بسيطاً لما قمت بعمله، واضغط **Create pull request**.
3. يقوم قائد الفريق (أو زميل آخر) بمراجعة الكود والتأكد من عدم وجود أخطاء، ثم يضغط **Merge pull request** لدمجه في `main`.

---

### ثالثاً: قواعد ذهبية لمنع التعارضات (Merge Conflicts) والكوارث

1. **لا ترفع ملفات `.env` أبداً:** ملف `.gitignore` مضبوط بالفعل لتجاهل `.env` و `node_modules`. إذا أضاف زميل متغيراً جديداً في `.env` الخاص به، يخبر الفريق عبر مجموعة التواصل ليضيفوه في أجهزتهم، ويضيف اسمه (بدون قيم سرية) في `.env.example`.
2. **ماذا تفعل إذا قمت بتثبيت مكتبة جديدة (`npm install some-package`)؟**
   عندما يثبت أحد أعضاء الفريق مكتبة جديدة، يتغير ملف `package.json` و `package-lock.json`. بمجرد دمج كوده في `main` وسحب التحديثات (`git pull`)، **يجب على باقي أعضاء الفريق تشغيل `npm install`** داخل المجلد المعني (`client` أو `server`) لتنزل المكتبة الجديدة على أجهزتهم.
3. **قسّموا العمل في ملفات منفصلة قدر الإمكان:**
   إذا كان الطالب (أ) يعمل على `doctor.routes.js` و `DoctorsPage.jsx`، والطالب (ب) يعمل على `patient.routes.js` و `PatientsPage.jsx`، فلن يحدث بينهما أي تعارض! المكان الوحيد المشترك بينهما هو سطر الإضافة في `app.js` و `App.jsx`.
4. **كيف تتصرف إذا ظهر لك `Merge Conflict`؟**
   لا تقلق ولا تحذف الملف! يحدث التعارض فقط عندما يعدل شخصان نفس السطر في نفس الملف. سيضع Git علامات داخل الملف هكذا:
   ```text
   <<<<<<< HEAD
   الكود الموجود حالياً في الفرع الذي تقف عليه
   =======
   الكود القادم من الفرع الآخر
   >>>>>>> feature/other-branch
   ```
   كل ما عليك فعله هو مسح علامات `<<<<<<<` و `=======` و `>>>>>>>` والإبقاء على السطرين معاً (إذا كنتما تضيفان مسارين مختلفين في `app.js` مثلاً)، ثم احفظ الملف، وجرب تشغيل المشروع، وقم بعمل `git add .` ثم `git commit`.

---

## 10. دليل حل المشاكل والأخطاء الشائعة (Troubleshooting)

إذا واجهتك أي مشكلة أثناء تشغيل المشروع، ابحث عن رسالة الخطأ في هذا الجدول قبل السؤال:

### 1. خطأ CORS في المتصفح: `Access to XMLHttpRequest has been blocked by CORS policy`

- **السبب:** عنوان الواجهة الأمامية في المتصفح لا يطابق قيمة `CLIENT_URL` المكتوبة في `server/.env`. يحدث هذا غالباً إذا كان المنفذ `5173` مشغولاً على جهازك، فقام Vite بتشغيل React على المنفذ `5174` مثلاً!
- **الحل:** انظر إلى الرابط الفعلي في المتصفح (مثلاً `http://localhost:5174`)، وعدل `CLIENT_URL` في `server/.env` ليطابقه تماماً (بدون علامة `/` في النهاية)، ثم **أعد تشغيل السيرفر الخلفي**.

### 2. خطأ عند تشغيل السيرفر: `Failed to start server: MONGODB_URI is not defined`

- **السبب:** لم تقم بإنشاء ملف `.env` داخل مجلد `server/`، أو أنشأته ولكن تركت قيمة `MONGODB_URI` فارغة.
- **الحل:** انسخ `server/.env.example` إلى `server/.env` وتأكد من حفظ الملف (`Ctrl + S`) قبل تشغيل `npm run dev`.

### 3. خطأ اتصال بـ MongoDB Atlas: `Could not connect to any servers in your MongoDB Atlas cluster`

- **السبب:** عنوان الـ IP الخاص بشبكتك غير مضاف في قائمة السماح داخل MongoDB Atlas.
- **الحل:** اذهب إلى حسابك في MongoDB Atlas -> قسم **Network Access** -> اضغط **Add IP Address** -> اختر **Allow Access from Anywhere (`0.0.0.0/0`)** واضغط Confirm.

### 4. خطأ اتصال بـ MongoDB محلياً: `connect ECONNREFUSED 127.0.0.1:27017`

- **السبب:** أنت تستخدم رابط MongoDB محلي (`127.0.0.1:27017`) ولكن خدمة MongoDB غير مثبتة على جهازك أو متوقفة عن العمل.
- **الحل:** إما أن تقوم بتشغيل خدمة MongoDB من إعدادات الخدمات (Services) في جهازك، أو تستخدم رابط **MongoDB Atlas** السحابي بدلاً منها.

### 5. خطأ المنفذ مستخدم بالفعل: `Error: listen EADDRINUSE: address already in use :::5000`

- **السبب:** يوجد Terminal آخر مفتوح على جهازك يشغل السيرفر بالفعل على المنفذ `5000`، أو برنامج آخر يستخدم نفس المنفذ.
- **الحل:** أغلق نوافذ الـ Terminal القديمة، أو غيّر `PORT=5001` في `server/.env` ولا تنسَ تحديث `VITE_API_BASE_URL=http://localhost:5001/api` في `client/.env` ثم أعد تشغيل الطرفين.

### 6. قمت بتعديل ملف `.env` ولكن التعديل لم يظهر أثره في الكود!

- **السبب:** متغيرات البيئة تُقرأ مرة واحدة عند بدء التشغيل.
- **الحل:** كلما عدلت ملف `.env` (سواء في `client` أو `server`)، يجب عليك إيقاف التشغيل (`Ctrl + C` في الـ Terminal) ثم تشغيل `npm run dev` من جديد.
