/ js/matrix-animation.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return; // Salir si el canvas no existe en la página actual

    const ctx = canvas.getContext('2d');

    // Make the canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Unicode characters for the Matrix effect (more diverse than just numbers)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/~`';
    const charArr = chars.split('');

    const font_size = 16;
    const columns = canvas.width / font_size;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }


    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fondo semi-transparente para el rastro
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00'; // Verde Neón
        ctx.font = font_size + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArr[Math.floor(Math.random() * charArr.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    let matrixInterval = setInterval(drawMatrix, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = canvas.width / font_size;
        for (let x = 0; x < newColumns; x++) {
            if (drops[x] === undefined) {
                drops[x] = 1;
            }
        }
        drops.length = newColumns;
        clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 33);
    });
});