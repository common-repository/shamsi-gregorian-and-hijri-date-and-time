// Convert Gregorian date to Jalali
function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let jy, jm, jd;
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m.slice(0, gm).reduce((a, b) => a + b));
    
    jy = -1595 + (33 * Math.floor(days / 12053)); 
    days %= 12053;
    
    jy += 4 * Math.floor(days / 1461); 
    days %= 1461;
    
    if (days > 365) {
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }
    
    if (days < 186) {
        jm = 1 + Math.floor(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + Math.floor((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }

    return [jy, jm, jd];
}

// Convert Gregorian date to Hijri
function gregorianToHijri(gy, gm, gd) {
    const date = moment(`${gy}-${gm}-${gd}`, 'YYYY-MM-DD');
    const hijriDate = date.subtract(1, 'days').format('iYYYY/iM/iD').split('/');
    return [parseInt(hijriDate[0]), parseInt(hijriDate[1]), parseInt(hijriDate[2])];
}

function updateTime() {
    const now = new Date();
    const dateType = document.querySelector('input[name="dateType"]:checked').value;
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;

    const gy = now.getFullYear();
    const gm = now.getMonth() + 1;
    const gd = now.getDate();

    if (dateType === 'jalali') {
        const jalaliDate = gregorianToJalali(gy, gm, gd);
        const [jy, jm, jd] = jalaliDate;
        const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        document.getElementById('date').textContent = `تاریخ شمسی: ${jd} ${months[jm - 1]} ${jy}`;
    } else if (dateType === 'gregorian') {
        const months = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
        document.getElementById('date').textContent = `تاریخ میلادی: ${gd} ${months[gm - 1]} ${gy}`;
    } else if (dateType === 'hijri') {
        const hijriDate = gregorianToHijri(gy, gm, gd);
        const [hy, hm, hd] = hijriDate;
        const months = ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'];
        document.getElementById('date').textContent = `تاریخ قمری: ${hd} ${months[hm - 1]} ${hy}`;
    }
}

// Update every second
setInterval(updateTime, 1000);
updateTime();

// Listen for changes in the date type radio buttons
document.querySelectorAll('input[name="dateType"]').forEach((input) => {
    input.addEventListener('change', updateTime);
});
