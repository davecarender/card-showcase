// Toggle flip on click or keyboard (Enter / Space) and add tilt — apply to every .card on the page
(function(){
    const cards = Array.from(document.querySelectorAll('.card'));
    if(!cards.length) return;

    // Initial flip: start all cards flipped, then unflip all simultaneously after page load
    // Keep flip duration in CSS at 1.8s so the visual flip remains unchanged
    cards.forEach((c)=>{
        c.classList.add('is-flipped','initializing');
        c.setAttribute('aria-pressed','true');
    });

    // When the page is fully loaded, remove the flipped state from all cards at once
    window.addEventListener('load', ()=>{
        // Small additional delay to ensure paints are ready so the flip animates visibly
        const unflipDelay = 120; // ms after load
        setTimeout(()=>{
            // Force a reflow so the browser registers the flipped state before we remove it
            // This reduces a visual 'blink' when background-images swap on some browsers
            void document.body.offsetHeight;
            cards.forEach((c)=>{
                c.classList.remove('is-flipped','initializing');
                c.setAttribute('aria-pressed','false');
            });
        }, unflipDelay);
    });

    cards.forEach((card)=>{
        const tilt = card.querySelector('.card-tilt');
        let rafId = null;
        const state = {rx:0, ry:0, tx:0, ty:0};

        function setAria(flipped){
            card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
        }

    // initial state handled by central sequential intro above

        // flip on click / keyboard
        card.addEventListener('click', ()=>{
            const flipped = card.classList.toggle('is-flipped');
            setAria(flipped);
        });

        card.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter' || e.key === ' '){
                e.preventDefault();
                card.click();
            }
        });

        // Mouse-based tilt
        // Disable tilt on touch-capable devices for mobile usability
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isTouch) {
            function updateTilt() {
                // faster smoothing so the card follows the mouse more responsively
                state.rx += (state.tx - state.rx) * 0.18;
                state.ry += (state.ty - state.ry) * 0.18;
                if (tilt) tilt.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
                rafId = requestAnimationFrame(updateTilt);
            }

            function onMouseMove(e){
                if (card.classList.contains('initializing')) return;
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;
                const py = (e.clientY - rect.top) / rect.height;
                // increase multipliers for a more intense tilt
                const rotY = (px - 0.5) * 36; // was 24
                const rotX = (0.5 - py) * 28; // was 18
                state.tx = rotX; state.ty = rotY;
                if (!rafId) rafId = requestAnimationFrame(updateTilt);
            }

            function resetTilt(){
                if (card.classList.contains('initializing')) return;
                state.tx = 0; state.ty = 0;
            }

            card.addEventListener('mousemove', onMouseMove);
            card.addEventListener('mouseleave', resetTilt);
            card.addEventListener('blur', resetTilt);

            // Touch support (simple) — map touch to mouse-like movement if desired (left off for mobile)
        }

        // cleanup when unloading
        window.addEventListener('unload', ()=>{ if(rafId) cancelAnimationFrame(rafId); });
    });

})();

// Randomize page background
(function(){
    const images = [
        '../images/duallands/duallands-bg1.png',
        '../images/duallands/duallands-bg2.png',
        '../images/duallands/duallands-bg3.png'
    ];

    function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

    // Apply on DOMContentLoaded so stylesheet is available to read the var
    window.addEventListener('DOMContentLoaded', ()=>{
        const chosen = pickRandom(images);
        const cssValue = `url('${chosen}')`;
        document.documentElement.style.setProperty('--duallands-bg', cssValue);
    });
})();
