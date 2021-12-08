import React, { FC, useState } from 'react';

const index: FC = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <div className="container mt-5">
      <footer className="bg-white border-top p-3 text-muted small">
        <div className="row">
          <div className="col-12">
            <p>
              لا يعتبر موقع طحن الدولار في أي حال من الأحوال بديلا لاستشارة
              المهنية في المجالات التي نتكلم عنها. المرجو استخدم هذه المعلومات
              على مسؤليتك الخاصة. موقع طحن الدولار قد يحتوي على روابط الإحالة من
              المواقع المدكورة بالموقع.
            </p>
          </div>
          <div className="col-12">
            <p>جميع الحقوق محفوظة &copy; t7andollar.com {currentYear}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default index;
