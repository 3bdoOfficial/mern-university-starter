# الدليل العربي لاستخدام MERN University Starter

هذا الدليل مخصص لطلاب الفرق التي ستستخدم مشروع `mern-university-starter` كنقطة بداية لمشاريعها الجامعية.

الهدف من الـ Starter Kit هو توفير البنية الأساسية الجاهزة حتى لا يضيع كل فريق وقته في إعداد React وExpress والاتصال بقاعدة البيانات وتنظيم الملفات من الصفر.

**مهم:** هذا المشروع ليس تطبيقًا مكتملًا، ولا يحتوي على Features جاهزة مثل تسجيل الدخول أو CRUD أو Dashboard. كل فريق مسؤول عن فهم متطلبات مشروعه والبحث عن طريقة تنفيذها وبنائها بنفسه.

---

## 1. ماذا يوفر لنا المشروع؟

### Frontend

- React لبناء واجهة المستخدم.
- Vite لتشغيل وتطوير وبناء تطبيق React.
- React Router لإدارة التنقل بين الصفحات.
- Axios لإرسال HTTP Requests إلى الـ Backend.
- CSS عادي لتنظيم التنسيقات.

### Backend

- Node.js لتشغيل JavaScript خارج المتصفح.
- Express لبناء HTTP Server وAPI Routes.
- MongoDB لتخزين البيانات.
- Mongoose للتعامل مع MongoDB.
- dotenv لقراءة Environment Variables.
- CORS للسماح للـ Frontend بالاتصال بالـ Backend.
- Helmet لإضافة HTTP Security Headers.
- Morgan لتسجيل HTTP Requests أثناء التطوير.
- Nodemon لإعادة تشغيل السيرفر تلقائيًا عند تعديل ملفات الـ Backend.

---

## 2. قبل تشغيل المشروع

تأكد من تثبيت:

1. Node.js بإصدار `20.19+` أو `22.12+`.
2. npm.
3. Git.
4. MongoDB محليًا، أو حساب MongoDB Atlas.

افتح Terminal واختبر التثبيت:

```bash
node -v
npm -v
git --version
```

إذا لم يكن MongoDB مثبتًا محليًا، يمكنك استخدام MongoDB Atlas، لكن يجب وضع Connection String الخاص بك في ملف البيئة.

---

## 3. كيف تحصل على نسخة المشروع؟

الأفضل في العمل الجماعي أن يقوم Team Leader بعمل Fork للمستودع أولًا، ثم يضيف بقية أعضاء الفريق إلى نسخته.

بعد ذلك يستنسخ كل عضو نسخة الفريق:

```bash
git clone https://github.com/TEAM-USERNAME/PROJECT-REPOSITORY.git
cd PROJECT-REPOSITORY
```

استبدل `TEAM-USERNAME/PROJECT-REPOSITORY` برابط مستودع فريقك.

لا تعملوا جميعًا على مستودع الـ Starter الأصلي. كل فريق يعمل على Fork مستقل خاص به.

---

## 4. إعداد وتشغيل Backend

افتح Terminal داخل مجلد المشروع:

```bash
cd server
npm install
```

أنشئ ملف `.env` بنسخ ملف المثال.

### على Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### على macOS / Linux

```bash
cp .env.example .env
```

افتح `server/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/mern_university_starter
```

شرح المتغيرات:

| المتغير       | وظيفته                                          |
| ------------- | ----------------------------------------------- |
| `PORT`        | المنفذ الذي سيعمل عليه Express                  |
| `NODE_ENV`    | يحدد بيئة التشغيل                               |
| `CLIENT_URL`  | عنوان الـ Frontend المسموح له بالاتصال عبر CORS |
| `MONGODB_URI` | رابط الاتصال بقاعدة بيانات MongoDB              |

إذا كنت تستخدم MongoDB Atlas، استبدل قيمة `MONGODB_URI` برابط الاتصال الخاص بك.

شغّل السيرفر:

```bash
npm run dev
```

من المفترض أن ترى رسالة تفيد بنجاح الاتصال بـ MongoDB ثم تشغيل السيرفر على المنفذ 5000.

اترك Terminal مفتوحًا.

---

## 5. إعداد وتشغيل Frontend

افتح Terminal ثانيًا من جذر المشروع:

```bash
cd client
npm install
```

أنشئ ملف `.env` من المثال.

### على Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### على macOS / Linux

```bash
cp .env.example .env
```

افتح `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

شغّل React:

```bash
npm run dev
```

افتح الرابط الذي يظهر في Terminal، وغالبًا سيكون:

```text
http://localhost:5173
```

يجب أن يعمل الـ Frontend والـ Backend في Terminalين منفصلين، ويظلان قيد التشغيل أثناء التطوير.

---

## 6. كيف يتصل Frontend بالـ Backend؟

في `client/src/services/api.js` أنشأنا Axios Instance:

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export default api;
```

بدل كتابة عنوان السيرفر كاملًا في كل طلب، نستخدم الـ Instance:

```js
api.get("/health");
```

إذا كان `VITE_API_BASE_URL` يساوي:

```text
http://localhost:5000/api
```

فسيكون عنوان الطلب النهائي:

```text
http://localhost:5000/api/health
```

في الـ Backend يوجد Endpoint للاختبار:

```text
GET http://localhost:5000/api/health
```

افتح العنوان في المتصفح أو استخدم Postman. يجب أن تحصل على JSON يؤكد أن السيرفر يعمل.

### ماذا يفعل CORS؟

المتصفح يتعامل مع `localhost:5173` و`localhost:5000` باعتبارهما Origin مختلفين بسبب اختلاف المنفذ.

لذلك نحدد في `server/.env` عنوان الواجهة المسموح له بالاتصال:

```env
CLIENT_URL=http://localhost:5173
```

إذا شغّل Vite على منفذ مختلف، مثل `5174`، حدّث `CLIENT_URL` ليطابق العنوان الذي ظهر في المتصفح، ثم أعد تشغيل Backend.

---

## 7. الملفات المهمة ومسؤولية كل منها

### داخل client/src

| الملف / المجلد      | المسؤولية                                        |
| ------------------- | ------------------------------------------------ |
| `main.jsx`          | نقطة تشغيل React وربط التطبيق بالـ BrowserRouter |
| `App.jsx`           | تعريف Routes الأساسية                            |
| `pages/`            | صفحات التطبيق                                    |
| `components/`       | المكونات القابلة لإعادة الاستخدام                |
| `layouts/`          | الهياكل المشتركة للصفحات                         |
| `services/api.js`   | Axios Instance وإعداد الاتصال بالـ API           |
| `styles/global.css` | التنسيقات العامة وCSS Reset                      |
| `assets/`           | الصور والملفات الثابتة المستخدمة داخل التطبيق    |

### داخل server/src

| الملف / المجلد                             | المسؤولية                                    |
| ------------------------------------------ | -------------------------------------------- |
| `server.js`                                | الاتصال بقاعدة البيانات ثم تشغيل HTTP Server |
| `app.js`                                   | إعداد Express وMiddleware وربط Routes        |
| `config/env.js`                            | قراءة وإتاحة Environment Variables           |
| `config/database.js`                       | الاتصال بقاعدة بيانات MongoDB                |
| `routes/`                                  | تعريف API Endpoints                          |
| `controllers/`                             | تنفيذ منطق التعامل مع الطلبات                |
| `middlewares/notFound.middleware.js`       | التعامل مع المسارات غير الموجودة             |
| `middlewares/error.middleware.js`          | توحيد شكل استجابات الأخطاء                   |
| `health.routes.js` و`health.controller.js` | Endpoint بسيط لاختبار حالة السيرفر           |

لا تنشئ مجلدات أو طبقات لمجرد ملء الهيكل. أضف الملفات عندما توجد حاجة حقيقية في مشروعك.

---

## 8. أوامر مهمة أثناء العمل

### Frontend

نفّذ الأوامر من داخل `client`:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

### Backend

نفّذ الأوامر من داخل `server`:

```bash
npm run dev
npm start
```

- `dev` يشغل Nodemon لمراقبة تغييرات ملفات السيرفر.
- `start` يشغل السيرفر باستخدام Node.js مباشرة.

---

# 9. طريقة العمل الجماعي على GitHub

هذا الجزء مهم جدًا. نجاح المشروع لا يعتمد فقط على كتابة الكود، بل على تنظيم عمل الفريق وإدارة التعديلات.

## أولًا: دور Team Leader

1. يفتح صفحة الـ Starter Repository.
2. يضغط **Fork** لإنشاء نسخة مستقلة داخل حسابه.
3. يضيف أعضاء الفريق من إعدادات المستودع:
   `Settings → Collaborators` أو إعدادات الوصول المتاحة في GitHub.
4. يرسل رابط مستودع الفريق للأعضاء.
5. يتفق مع الفريق على تقسيم المهام والفروع وطريقة مراجعة الكود.

كل فريق لديه Fork مستقل. لا ترفعوا تعديلات مشاريعكم إلى المستودع الأصلي.

## ثانيًا: كل عضو يستنسخ مستودع الفريق

```bash
git clone https://github.com/TEAM-USERNAME/PROJECT-REPOSITORY.git
cd PROJECT-REPOSITORY
```

ثم ينشئ Branch خاصًا بالمهمة التي يعمل عليها:

```bash
git switch -c feature/student-page
```

أمثلة لأسماء الفروع:

```text
feature/login-page
feature/student-management
feature/navbar
fix/api-error-handling
```

## ثالثًا: دورة العمل اليومية

قبل بدء مهمة جديدة، حدّث فرع الدمج المتفق عليه مع الفريق. إذا كان الفريق يستخدم `main` مباشرة:

```bash
git switch main
git pull origin main
```

ثم أنشئ فرع المهمة:

```bash
git switch -c feature/your-task
```

بعد الانتهاء:

```bash
git add .
git commit -m "feat: add student page"
git push -u origin feature/your-task
```

بعد ذلك افتح Pull Request على GitHub من فرع المهمة إلى فرع الدمج الذي اتفق عليه الفريق.

راجع التغييرات واختبرها، ثم ادمجها بعد موافقة الفريق.

**لا تعمل Merge عشوائيًا، ولا تجعل أكثر من عضو يعدّل نفس الملفات دون تنسيق.**

## رابعًا: ما الفرق بين Commit وPush وPull وPull Request وMerge؟

| المصطلح        | المعنى                                        |
| -------------- | --------------------------------------------- |
| Commit         | حفظ مجموعة تغييرات داخل تاريخ Git المحلي      |
| Push           | رفع الـ Commits إلى المستودع البعيد           |
| Pull           | جلب ودمج التحديثات من المستودع البعيد         |
| Pull Request   | طلب مراجعة ودمج تغييرات فرع في فرع آخر        |
| Merge          | دمج تاريخ وتغييرات فرع مع فرع آخر             |
| Branch         | مسار عمل مستقل للتطوير                        |
| Merge Conflict | تعارض يحتاج إلى تدخل لحسم التغييرات المتعارضة |

## خامسًا: التعامل مع Merge Conflicts

قد يحدث التعارض عندما يعدّل أكثر من عضو نفس الجزء من الملف، ثم يحاول Git دمج التغييرات.

عند حدوثه:

1. لا تتسرع في حذف أي تغييرات.
2. افتح الملفات التي أشار إليها Git.
3. افهم التغييرات القادمة من كل فرع.
4. قرر الشكل النهائي الصحيح بالتنسيق مع صاحب التغيير الآخر.
5. احذف علامات التعارض بعد حلّه.
6. اختبر المشروع.
7. أضف الملفات بعد حل التعارض واعمل Commit.

علامات التعارض التي قد تظهر داخل الملف:

```text
<<<<<<< HEAD
Your current changes
=======
Incoming changes
>>>>>>> branch-name
```

هذه العلامات ليست جزءًا من كود المشروع؛ يجب حل التعارض وإزالتها.

## سادسًا: هل تحديثات المستودع الأصلي تصل تلقائيًا إلى Fork؟

لا. الـ Fork نسخة مستقلة، وأي تحديث جديد في المستودع الأصلي لا ينتقل تلقائيًا إلى Fork الفريق.

إذا احتاج الفريق إلى تحديثات من الـ Starter، يمكنه استخدام **Sync fork** من GitHub، أو إعداد المستودع الأصلي كـ `upstream` ثم جلب التحديثات بعناية.

لا تجروا مزامنة أثناء العمل على تغييرات كبيرة دون مراجعتها وفهم أثرها.

---

## 10. قواعد مهمة للفريق

- لا ترفع ملفات `.env` إلى GitHub.
- لا تضع كلمات المرور أو Connection Strings السرية في الكود.
- لا تعمل على `main` مباشرة إذا كان الفريق يستخدم Feature Branches.
- لا تستخدم `git push --force` إلا إذا كنت تفهم أثره واتفقت مع الفريق.
- لا تدمج Pull Request قبل مراجعة التغييرات واختبارها.
- لا تعدّل ملفات عضو آخر دون تنسيق.
- اجعل كل Commit صغيرًا وواضحًا ويعبّر عن تغيير محدد.
- إذا واجهت مشكلة، حاول فهم سببها والبحث عنها قبل نسخ حل لا تفهمه.

---

## 11. ما الذي يجب على كل فريق تنفيذه بنفسه؟

الـ Starter يجهز الأساس فقط. على كل فريق أن يحدد احتياجات مشروعه ويصمم وينفذ ما يلزمه، مثل:

- تصميم قاعدة البيانات والـ Models.
- إضافة Routes وControllers الخاصة بالمشروع.
- بناء صفحات ومكونات الواجهة.
- تنفيذ Authentication/Authorization إذا تطلب المشروع ذلك.
- التحقق من صحة المدخلات.
- تنفيذ CRUD والبحث والتصفية والترقيم عند الحاجة.
- رفع الملفات أو الإشعارات إذا كانت ضمن المتطلبات.
- كتابة اختبارات مناسبة لمشروعه.

لا تضيفوا كل هذه الأشياء لمجرد أنها موجودة في القائمة؛ اختاروا ما تتطلبه متطلبات مشروعكم فقط.

---

## 12. مشاكل شائعة وحلولها

### MongoDB لا يتصل

- تأكد أن خدمة MongoDB تعمل إذا كنت تستخدم نسخة محلية.
- راجع `MONGODB_URI` في `server/.env`.
- إذا كنت تستخدم Atlas، راجع Connection String وإعدادات Network Access.

### Frontend لا يستطيع الاتصال بالـ Backend

- تأكد أن Backend يعمل.
- راجع `VITE_API_BASE_URL` في `client/.env`.
- راجع `CLIENT_URL` في `server/.env`.
- تأكد أن عنوان الواجهة والمنفذ يطابقان ما يظهر في المتصفح.
- أعد تشغيل السيرفر بعد تعديل ملفات البيئة.

### ظهر خطأ أن المنفذ مستخدم

إذا كان المنفذ 5000 مستخدمًا، غيّر `PORT` في `server/.env`، ثم حدّث `VITE_API_BASE_URL` في `client/.env` ليطابق المنفذ الجديد، وأعد تشغيل الطرفين.

### ظهرت رسالة أن Environment Variable غير موجود

تأكد من إنشاء ملفات `.env` داخل `client` و`server` من ملفات `.env.example`، وأن أسماء المتغيرات مكتوبة بشكل صحيح.

---

## الخلاصة

استخدموا هذا المشروع لتوفير وقت التهيئة، وليس لتجاوز مرحلة التعلم.

كل فريق مسؤول عن فهم الكود الذي يضيفه، واختيار التصميم المناسب لمشروعه، وتنظيم العمل الجماعي باستخدام Git وGitHub.

بالتوفيق لجميع الفرق.
