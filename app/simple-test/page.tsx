export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 font-[var(--font-yekan)]">
          ✅ تست ساده
        </h1>
        <p className="text-gray-600 font-[var(--font-yekan)]">
          اگر این متن رو می‌بینی، routing کار می‌کنه!
        </p>
        <div className="mt-6 space-y-2">
          <a
            href="/test-api"
            className="block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-[var(--font-yekan)]"
          >
            رفتن به تست API
          </a>
          <a
            href="/test-category"
            className="block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-[var(--font-yekan)]"
          >
            رفتن به تست CategoryManager
          </a>
          <a
            href="/admin-test"
            className="block bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded font-[var(--font-yekan)]"
          >
            رفتن به تست ادمین
          </a>
          <a
            href="/debug-access"
            className="block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-[var(--font-yekan)]"
          >
            رفتن به دیباگ دسترسی
          </a>
        </div>
      </div>
    </div>
  );
}
