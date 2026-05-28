/**
 * Undangan Haflah Takharruj
 * Logika JavaScript Utama
 */

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM sudah siap dimuat');

    /* =========================================
       ANIMASI AMPLOP
       ========================================= */
    const envelopeContainer = document.getElementById('envelope-container');
    const transitionScreen = document.getElementById('transition-screen');
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');
    const envelopeHint = document.querySelector('.envelope-hint');
    const backsound = document.getElementById('backsound');
    const musicToggle = document.getElementById('music-toggle');

    console.log('Elemen amplop ditemukan:', {
        envelopeContainer: !!envelopeContainer,
        transitionScreen: !!transitionScreen,
        envelopeOverlay: !!envelopeOverlay,
        mainContent: !!mainContent
    });

    if (!envelopeContainer) {
        console.error('amplop-container tidak ditemukan!');
        return;
    }

    // Buat amplop dapat diklik dengan menghapus pointer-events: none
    envelopeContainer.style.pointerEvents = 'auto';
    envelopeContainer.style.cursor = 'pointer';

    const handleEnvelopeClick = () => {
        console.log('Amplop diklik!');
        
        // Langkah 1: Berhenti mengambang, zoom kecil, flap terbuka
        envelopeContainer.classList.add('open-animation');
        if (envelopeHint) envelopeHint.style.opacity = '0';
        
        // Mainkan audio saat klik amplop (trigger interaksi pengguna)
        if (backsound) {
            backsound.play().catch(err => console.log('Pemutaran audio gagal:', err));
        }
        if (musicToggle) {
            musicToggle.classList.add('visible');
            musicToggle.classList.add('playing');
        }
        
        console.log('Menunggu flap terbuka...');
        // Tunggu flap terbuka (600ms)
        setTimeout(() => {
            console.log('Flap terbuka, tarik kertas...');
            // Langkah 2: Tarik keluar kertas
            envelopeContainer.classList.add('pull-out');
            
            // Tunggu kertas keluar (1000ms)
            setTimeout(() => {
                console.log('Kertas keluar, ekspansi layar transisi...');
                // Langkah 3: Perluas layar transisi
                transitionScreen.classList.add('expand');
                
                // Tunggu ekspansi menutupi layar (1000ms)
                setTimeout(() => {
                    console.log('Layar transisi menutup, tampilkan konten utama...');
                    // Langkah 4: Sembunyikan overlay, tampilkan situs utama
                    envelopeOverlay.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    
                    // Trigger fade in untuk konten utama
                    setTimeout(() => {
                        mainContent.classList.add('visible');
                    }, 50);

                    // Pastikan window discroll ke atas
                    window.scrollTo(0, 0);

                }, 900); // sedikit sebelum transisi selesai
            }, 1000);
        }, 600);
    };

    envelopeContainer.addEventListener('click', handleEnvelopeClick);
    
    // Tambahan: juga izinkan klik pada elemen dalam amplop
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.addEventListener('click', handleEnvelopeClick);
    }

    // Kontrol pemutaran musik melalui tombol mengambang
    if (musicToggle && backsound) {
        musicToggle.addEventListener('click', () => {
            if (backsound.paused) {
                backsound.play().catch(err => console.log('Pemutaran audio gagal:', err));
                musicToggle.classList.add('playing');
            } else {
                backsound.pause();
                musicToggle.classList.remove('playing');
            }
        });
    }


    /* =========================================
       TIMER HITUNG MUNDUR
       ========================================= */
    // Tanggal target: 15 Juni 2026 08:00:00
    const targetDate = new Date('June 15, 2026 08:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Acara telah dimulai atau sudah berlalu
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }

        // Perhitungan waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format tampilan (tambahkan angka nol di depan)
        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    // Panggilan awal
    updateCountdown();
    // Perbarui setiap detik
    setInterval(updateCountdown, 1000);

});
