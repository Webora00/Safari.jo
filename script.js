/* ------------------------------------------------------------------
   1. تهيئة Animation On Scroll (AOS)
------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true, // Animation happens only once
        easing: 'ease-out-cubic'
    });
});

/* ------------------------------------------------------------------
   2. القائمة في الموبايل (Mobile Menu)
------------------------------------------------------------------ */
const mobileToggle = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.navbar');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    // تغيير الأيقونة
    const icon = mobileToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    });
});

/* ------------------------------------------------------------------
   3. تعبئة الأسئلة الشائعة (Dynamic FAQ)
------------------------------------------------------------------ */
const faqData = [
    { q: "هل الرحلات مناسبة للجميع؟", a: "نعم، معظم الرحلات مناسبة لمختلف الأعمار، ويتم توضيح مستوى الصعوبة قبل التسجيل." },
    { q: "من أين تكون نقطة الانطلاق؟", a: "غالبًا من محافظة عجلون، ويتم تحديد التفاصيل لكل رحلة بشكل مسبق." },
    { q: "هل الرحلات آمنة؟", a: "السلامة أولوية لدينا، وجميع الرحلات منظمة ضمن مسارات مدروسة وبإشراف مناسب." },
    { q: "ماذا أحتاج أن أحضر معي؟", a: "ملابس مريحة، حذاء مناسب للمشي، ماء، وأغراض شخصية أساسية." },
    { q: "كيف يتم التسجيل؟", a: "من خلال الموقع الإلكتروني أو صفحاتنا على وسائل التواصل الاجتماعي." },
    { q: "هل هناك عدد محدد للمشاركين؟", a: "نعم، يتم تحديد عدد المشاركين لكل رحلة لضمان التنظيم والراحة." },
    { q: "هل الرحلات مختلطة؟", a: "يتم توضيح طبيعة كل رحلة عند الإعلان عنها." },
    { q: "هل تشمل الرحلات المواصلات؟", a: "يتم توضيح ذلك لكل رحلة بشكل منفصل." },
    { q: "هل توجد رسوم للمشاركة؟", a: "بعض الرحلات برسوم رمزية تغطي تكاليف التنظيم، ويتم الإعلان عنها مسبقًا." },
    { q: "كيف تحافظ سفاري على البيئة؟", a: "نلتزم بمبادئ السياحة البيئية ونشجّع المشاركين على احترام الطبيعة والحفاظ على نظافة المواقع." },
    { q: "هل توجد سياسة إلغاء؟", a: "سياسة الإلغاء أو التعديل يتم توضيحها عند التسجيل." },
    { q: "كيف يمكن التواصل معنا؟", a: "من خلال نموذج التواصل بالموقع أو عبر منصات التواصل الاجتماعي." }
];

const accordionWrapper = document.querySelector('.accordion-wrapper');

faqData.forEach((item) => {
    const faqItem = document.createElement('div');
    faqItem.classList.add('accordion-item');
    
    faqItem.innerHTML = `
        <div class="accordion-header">
            ${item.q}
            <i class="fas fa-chevron-down"></i>
        </div>
        <div class="accordion-body">
            <p>${item.a}</p>
        </div>
    `;
    
    accordionWrapper.appendChild(faqItem);
});

// منطق التفاعل (Click Event)
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        // إغلاق جميع العناصر الأخرى (اختياري، يمكن إزالته لفتح متعدد)
        const currentActive = document.querySelector('.accordion-header.active');
        if (currentActive && currentActive !== header) {
            currentActive.classList.remove('active');
            currentActive.nextElementSibling.style.maxHeight = null;
        }

        header.classList.toggle('active');
        const body = header.nextElementSibling;
        
        if (header.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = null;
        }
    });
});

/* ------------------------------------------------------------------
   4. أنيميشن الخلفية (Fireflies / Nature Particles)
------------------------------------------------------------------ */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// ضبط حجم الكانفاس
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// فئة الجزيء (Particle Class)
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // حجم الجزيء
        this.size = Math.random() * 3 + 1; 
        // سرعة الحركة
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // اللون (تدرجات الأخضر والأصفر)
        const colors = ['rgba(76, 175, 80, 0.4)', 'rgba(255, 202, 40, 0.4)', 'rgba(129, 199, 132, 0.3)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // إعادة الجزيء إذا خرج من الشاشة
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// إنشاء الجزيئات
function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60; // عدد أقل للموبايل للأداء
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// حلقة الرسم (Animation Loop)
function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

initParticles();
animate();

// إعادة الإنشاء عند تغيير الحجم لضمان توزيع جيد
window.addEventListener('resize', initParticles);