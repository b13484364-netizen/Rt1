// utility.js

// لتوليد هاش SHA-256
async function generateHash(imageId, password) {
    const input = imageId + ':' + password;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// لتخزين بيانات الطلاب (الهاشات وصفحاتهم) محلياً
function saveStudentData(studentKey, studentInfo) {
    // نجلب البيانات الموجودة أولاً
    const allStudents = JSON.parse(localStorage.getItem('studentLogins')) || {};
    // نضيف أو نحدث بيانات الطالب الجديد
    allStudents[studentKey] = studentInfo; // studentInfo قد تحتوي على {name: "اسم الطالب", page: "student_page_1.html"}
    // نحفظ البيانات مرة أخرى
    localStorage.setItem('studentLogins', JSON.stringify(allStudents));
}

// لجلب جميع بيانات الطلاب المخزنة
function getAllStudentData() {
    return JSON.parse(localStorage.getItem('studentLogins')) || {};
}

// لجلب بيانات طالب معين باستخدام الهاش
function getStudentDataByKey(studentKey) {
    const allStudents = getAllStudentData();
    return allStudents[studentKey];
}
