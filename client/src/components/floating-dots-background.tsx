import React, { useEffect, useRef } from 'react';

const FloatingDotsBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Dot properties
        const dots: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            maxOpacity: number;
        }> = [];

        // Create dots
        const createDots = () => {
            dots.length = 0;
            const dotCount = Math.floor((canvas.width * canvas.height) / 15000); // Adjust density

            for (let i = 0; i < dotCount; i++) {
                dots.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.6 + 0.2,
                    maxOpacity: Math.random() * 0.8 + 0.2,
                });
            }
        };

        createDots();

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dots.forEach((dot) => {
                // Update position
                dot.x += dot.vx;
                dot.y += dot.vy;

                // Wrap around edges
                if (dot.x < 0) dot.x = canvas.width;
                if (dot.x > canvas.width) dot.x = 0;
                if (dot.y < 0) dot.y = canvas.height;
                if (dot.y > canvas.height) dot.y = 0;

                // Update opacity with subtle pulsing
                dot.opacity += (dot.maxOpacity - dot.opacity) * 0.02;

                // Draw dot
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${dot.opacity})`; // Blue color
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
};

export default FloatingDotsBackground;
