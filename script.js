document.addEventListener('DOMContentLoaded',()=>{
  // Filter destinations
  const cards=[...document.querySelectorAll('#destination .fade-up')];
  if(cards.length){const section=document.querySelector('#destination');const title=section?.querySelector('.section-title');const wrap=document.createElement('div');wrap.className='destination-filters';wrap.innerHTML='<button class="destination-filter active" data-filter="all">Semua</button><button class="destination-filter" data-filter="sejarah">Sejarah</button><button class="destination-filter" data-filter="kuliner">Kuliner</button><button class="destination-filter" data-filter="alam">Alam</button>';if(title)title.insertAdjacentElement('afterend',wrap);
    const cats=['sejarah','sejarah','sejarah','alam','sejarah','sejarah','alam','kuliner','kuliner','sejarah','alam','sejarah'];cards.forEach((c,n)=>{c.dataset.category=c.dataset.category||cats[n%cats.length];c.style.transition='opacity .35s ease, transform .35s ease';});
    wrap.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{wrap.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;cards.forEach(c=>{const show=f==='all'||c.dataset.category===f;c.style.display=show?'':'none';if(show){c.classList.remove('filter-show');void c.offsetWidth;c.classList.add('filter-show')}})}));
  }
  // Live London weather/time using public Open-Meteo endpoints
  const nav=document.querySelector('.navbar .container');if(nav){const w=document.createElement('div');w.className='london-info-widget';w.innerHTML='<span class="weather-icon">☀️</span><span class="weather-temp">--°C</span><span class="london-clock">London --:--</span>';const collapse=nav.querySelector('.navbar-collapse');(collapse||nav).appendChild(w);
    const icon=w.querySelector('.weather-icon'),temp=w.querySelector('.weather-temp'),clock=w.querySelector('.london-clock');function time(){clock.textContent='London '+new Intl.DateTimeFormat('id-ID',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())}time();setInterval(time,1000);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,weather_code&timezone=Europe%2FLondon').then(r=>r.json()).then(d=>{temp.textContent=Math.round(d.current.temperature_2m)+'°C';const code=d.current.weather_code;icon.textContent=code===0?'☀️':code<=3?'⛅':code<=67?'🌧️':code<=77?'❄️':'⛈️';}).catch(()=>{icon.textContent='🌤️';temp.textContent='London';});
  }
});
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("#navbar");

    if (navbar) {
        // Bersihkan instance lama jika ada
        const oldSpy = bootstrap.ScrollSpy.getInstance(document.body);
        if (oldSpy) oldSpy.dispose();

        // Aktifkan ScrollSpy secara eksplisit
        new bootstrap.ScrollSpy(document.body, {
            target: "#navbar",
            offset: 110,
            rootMargin: "0px 0px -25%"
        });
    }

    // Smooth scroll untuk menu navbar
    document.querySelectorAll('#navbar .nav-link, .navbar-brand[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetTop =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;

                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth"
                });

                // Tutup navbar mobile setelah menu diklik
                const menu = document.querySelector("#menuNavbar");
                if (menu && menu.classList.contains("show")) {
                    bootstrap.Collapse.getOrCreateInstance(menu).hide();
                }
            }
        });
    });

    // Refresh ScrollSpy setelah semua layout selesai dihitung
    window.addEventListener("load", function () {
        const spy = bootstrap.ScrollSpy.getInstance(document.body);
        if (spy) spy.refresh();
    });
});

    /* =========================
       ANIMASI SAAT SCROLL
    ========================= */

    // =========================
    // ANIMATION ON SCROLL
    // =========================
    const animatedElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(element => observer.observe(element));


    // =========================
    // TYPEWRITER ANIMATION (BANNER HERO)
    // =========================
    const typewriterText = [
        "Keindahan Kota London",
        "Sejarah & Budaya London",
        "Destinasi Wisata Terbaik",
        "Pengalaman Tak Terlupakan"
    ];
    let typeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const heroTypewriterEl = document.getElementById("heroTypewriter");

    function typeEffect() {
        if (!heroTypewriterEl) return;

        const currentText = typewriterText[typeIndex];

        if (isDeleting) {
            heroTypewriterEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTypewriterEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause saat teks lengkap
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeIndex = (typeIndex + 1) % typewriterText.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    document.addEventListener("DOMContentLoaded", () => {
        typeEffect();
    });


    // =========================
    // COUNT-UP ANIMATION
    // Angka mulai dari 0 dan menghitung saat masuk layar
    // =========================
    const counters = document.querySelectorAll('.count-up');
    let counted = false;

    function startCountUp() {
        if (counted) return;
        counted = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            const suffix = counter.dataset.suffix || '';
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                // easeOutCubic agar hitungan cepat di awal lalu melambat
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                counter.textContent = current.toLocaleString('id-ID') + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('id-ID') + suffix;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    const statsSection = document.querySelector('.stats-section');

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCountUp();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        statsObserver.observe(statsSection);
    }


    // =========================
    // NOTIFIKASI SAAT FORM PESAN DIKIRIM
    // =========================
    const contactForm = document.querySelector('.contact-form form');
    const notification = document.getElementById('bookingNotification');
    const closeNotification = document.querySelector('.notification-close');
    let notificationTimer;

    function showBookingNotification() {
        if (!notification) return;

        notification.classList.add('show');
        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showBookingNotification();
            contactForm.reset();
        });
    }

    if (closeNotification) {
        closeNotification.addEventListener('click', () => {
            notification.classList.remove('show');
            clearTimeout(notificationTimer);
        });
    }

/* =========================
   NOTIFIKASI + HISTORY + TIKET
========================= */
const notificationBtn = document.getElementById('notificationBtn');
const notificationPanel = document.getElementById('notificationPanel');
const notificationBadge = document.getElementById('notificationBadge');
const notificationList = document.getElementById('notificationList');
const clearNotifications = document.getElementById('clearNotifications');
const historyList = document.getElementById('historyList');

let notifications = [];
let bookingHistory = [];

function nowText() {
    return 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
}
function updateNotificationUI() {
    notificationBadge.textContent = notifications.length;
    notificationBadge.classList.toggle('show', notifications.length > 0);
    notificationList.innerHTML = notifications.length ? notifications.map(x =>
        `<div class="notification-item"><i class="bi bi-bell-fill"></i><div><strong>${x.title}</strong><small>${x.time}</small></div></div>`
    ).join('') : '<div class="empty-notification">Belum ada notifikasi.</div>';
    historyList.innerHTML = bookingHistory.length ? bookingHistory.map(x =>
        `<div class="history-item"><div class="history-icon"><i class="bi bi-ticket-perforated-fill"></i></div><div><strong>${x.place}</strong><small>Pemesanan tiket • ${x.time}</small></div></div>`
    ).join('') : '<div class="empty-history"><i class="bi bi-clock-history fs-4 d-block mb-2"></i>Belum ada history pemesanan.</div>';
}
function addNotification(title) {
    notifications.unshift({title, time:nowText()});
    notificationBtn.classList.remove('has-notification');
    void notificationBtn.offsetWidth;
    notificationBtn.classList.add('has-notification');
    updateNotificationUI();
}
function addBooking(place) {
    bookingHistory.unshift({place, time:nowText()});
    addNotification('Pemesanan tiket: ' + place);
}
notificationBtn.addEventListener('click', e => { e.stopPropagation(); notificationPanel.classList.toggle('show'); });
notificationPanel.addEventListener('click', e => e.stopPropagation());
document.addEventListener('click', () => notificationPanel.classList.remove('show'));
clearNotifications.addEventListener('click', () => { notifications=[]; updateNotificationUI(); });

document.querySelectorAll('.notification-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.notification-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.notification-page').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.notifTab === 'history' ? 'historyPage' : 'notificationsPage').classList.add('active');
    });
});

const mainContactForm = document.querySelector('.contact-form form');
if (mainContactForm) mainContactForm.addEventListener('submit', e => {
    e.preventDefault(); addNotification('Pesan kontak berhasil dikirim'); mainContactForm.reset();
});

const ticketButton = document.getElementById('ticketButton');
const ticketModalEl = document.getElementById('ticketModal');
const ticketToast = document.getElementById('ticketToast');
const ticketModal = ticketModalEl ? new bootstrap.Modal(ticketModalEl) : null;
if (ticketButton && ticketModal) ticketButton.addEventListener('click', () => ticketModal.show());

document.querySelectorAll('.btn-book-place').forEach(btn => {
    btn.addEventListener('click', function() {
        const place=this.dataset.place;
        addBooking(place);
        if (ticketToast) {
            ticketToast.querySelector('strong').textContent='Tiket '+place+' berhasil dipesan!';
            ticketToast.querySelector('small').textContent='History pemesanan sudah masuk ke ikon 🔔.';
            ticketToast.classList.add('show');
            clearTimeout(window.ticketToastTimer);
            window.ticketToastTimer=setTimeout(()=>ticketToast.classList.remove('show'),3500);
        }
        ticketModal.hide();
        notificationPanel.classList.add('show');
        document.querySelectorAll('.notification-tab').forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('.notification-page').forEach(p=>p.classList.remove('active'));
        document.querySelector('[data-notif-tab="history"]').classList.add('active');
        document.getElementById('historyPage').classList.add('active');
        clearTimeout(window.notificationPanelTimer);
        window.notificationPanelTimer=setTimeout(()=>notificationPanel.classList.remove('show'),5000);
    });
});
updateNotificationUI();

/* =========================
   CHAT BANTUAN DI DALAM WEBSITE
   TANPA LINK WHATSAPP
========================= */
const openChatButton=document.getElementById('openChatButton');
const chatWindow=document.getElementById('chatWindow');
const chatClose=document.getElementById('chatClose');
const chatBody=document.getElementById('chatBody');
const chatForm=document.getElementById('chatForm');
const chatInput=document.getElementById('chatInput');
const chatTyping=document.getElementById('chatTyping');

function addChatMessage(text,type='bot'){
    const wrap=document.createElement('div'); wrap.className='chat-message '+type;
    const bubble=document.createElement('div'); bubble.className='chat-bubble';
    bubble.textContent=text; wrap.appendChild(bubble); chatBody.appendChild(wrap);
    chatBody.scrollTop=chatBody.scrollHeight;
}
function botReply(message){
    const m=message.toLowerCase();
    if(m.includes('destinasi')||m.includes('wisata')) return 'Destinasi populer di London: Big Ben, Tower Bridge, Buckingham Palace, dan London Eye. Kamu bisa memilihnya melalui tombol Pesan Tiket Sekarang.';
    if(m.includes('tiket')||m.includes('pesan')) return 'Untuk memesan tiket, klik Pesan Tiket Sekarang, pilih destinasi, lalu tekan Pesan Tiket. Pesanan akan masuk ke notifikasi dan History Pemesanan.';
    if(m.includes('jam')||m.includes('buka')||m.includes('operasional')) return 'Jam operasional dapat berbeda untuk setiap destinasi. Silakan cek informasi destinasi sebelum berkunjung.';
    if(m.includes('harga')||m.includes('biaya')) return 'Harga tiket dapat berbeda berdasarkan destinasi dan jenis kunjungan. Silakan pilih destinasi pada menu tiket.';
    if(m.includes('halo')||m.includes('hai')) return 'Halo! 👋 Selamat datang di London Tourism. Ada yang bisa saya bantu?';
    return 'Terima kasih sudah menghubungi London Tourism 😊 Saya bisa membantu tentang destinasi London, tiket, jam operasional, dan informasi kunjungan.';
}
function sendChat(text){
    const message=text.trim(); if(!message)return;
    addChatMessage(message,'user'); chatInput.value=''; chatTyping.style.display='block';
    setTimeout(()=>{chatTyping.style.display='none'; addChatMessage(botReply(message),'bot');},650);
}
openChatButton.addEventListener('click',()=>{chatWindow.classList.toggle('show'); chatWindow.setAttribute('aria-hidden',chatWindow.classList.contains('show')?'false':'true'); if(chatWindow.classList.contains('show'))chatInput.focus();});
chatClose.addEventListener('click',()=>{chatWindow.classList.remove('show');chatWindow.setAttribute('aria-hidden','true');});
chatForm.addEventListener('submit',e=>{e.preventDefault();sendChat(chatInput.value);});
document.querySelectorAll('.chat-quick button').forEach(btn=>btn.addEventListener('click',()=>sendChat(btn.dataset.chat)));
