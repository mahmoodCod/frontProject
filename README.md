# آی‌کسب (AI-KSEB) - فروشگاه آنلاین با دستیار هوش مصنوعی

فروشگاه آنلاین قهوه با امکانات کامل مدیریت دسته‌بندی‌ها، محصولات و سفارشات.

## 🚀 ویژگی‌ها

- **مدیریت دسته‌بندی‌های هوشمند**: سیستم کامل CRUD برای دسته‌بندی‌های سلسله مراتبی
- **رابط کاربری مدرن**: طراحی زیبا با Framer Motion و Tailwind CSS
- **پنل مدیریت ادمین**: مدیریت کامل دسته‌بندی‌ها با رابط گرافیکی
- **Authentication**: سیستم ورود و ثبت‌نام با OTP
- **سبد خرید**: مدیریت سبد خرید و سفارشات
- **Responsive Design**: سازگار با موبایل و دسکتاپ

## 📚 API Category Documentation

### Base URL
```
/api/v1/category
```

### Authentication
برخی endpointها نیاز به authentication دارند (Admin Only):
- **Header**: `Authorization: Bearer <token>`
- **Role**: نقش `ADMIN` الزامی

### Available Endpoints

#### Public Endpoints
- `GET /api/v1/category/tree` - دریافت درخت دسته‌بندی‌ها
- `GET /api/v1/category/featured` - دریافت دسته‌بندی‌های ویژه
- `GET /api/v1/category/root` - دریافت دسته‌بندی‌های ریشه
- `GET /api/v1/category/:id/subcategories` - دریافت زیردسته‌بندی‌ها

#### Admin Endpoints
- `GET /api/v1/category` - لیست دسته‌بندی‌ها (با فیلتر و pagination)
- `POST /api/v1/category` - ایجاد دسته‌بندی جدید
- `PUT /api/v1/category/:id` - به‌روزرسانی دسته‌بندی
- `DELETE /api/v1/category/:id` - حذف دسته‌بندی
- `PUT /api/v1/category/:id/status` - تغییر وضعیت دسته‌بندی
- `PUT /api/v1/category/:id/order` - تغییر ترتیب دسته‌بندی

### Frontend Integration

```typescript
import {
  useCategories,
  useCategoryTree,
  useFeaturedCategories,
  useCategoryMutation
} from '@/services';

// استفاده در کامپوننت‌ها
const { categories, loading } = useCategoryTree();
const { create, update, remove } = useCategoryMutation();
```

## 🛠️ تکنولوژی‌ها

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Context
- **Icons**: React Icons, Lucide React
- **HTTP Client**: Fetch API (با wrapper سفارشی)

## 🏃‍♂️ شروع کار

1. **کلون کردن پروژه**:
```bash
git clone <repository-url>
cd frontProject
```

2. **نصب وابستگی‌ها**:
```bash
npm install
```

3. **تنظیم متغیرهای محیطی**:
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

4. **اجرای پروژه**:
```bash
npm run dev
```

5. **باز کردن مرورگر**:
```
http://localhost:3000
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
