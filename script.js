document.getElementById('start-btn').addEventListener('click', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const video = document.getElementById('intro-video');
    const audio = document.getElementById('intro-audio');
    const mainSite = document.getElementById('main-site');

    // 1. Tugma bosilishi bilan audio va videoni yoqamiz
    video.play().catch(err => console.log("Video xatosi:", err));
    audio.play().catch(err => console.log("Audio xatosi:", err));

    // 2. Videoni ekranda ko'rsatamiz
    video.classList.add('video-active');

    // 3. START tugmasi bor fonni silliq yo'qotamiz
    welcomeScreen.classList.add('fade-out');

    // 4. Ssenariy: Video tugagach nima bo'ladi?
    video.onended = function() {
        // Videoni o'chiramiz
        video.classList.remove('video-active');
        
        // Asosiy sayt qismini ko'rsatamiz
        mainSite.classList.remove('hidden');
        
        // Agar video tugagach ham audio orqada chalinib turishini xohlasangiz,
        // audio.pause() ni yozmang. Agar audio ham o'chsin desangiz pastdagini yoqing:
        // audio.pause();
    };
});
