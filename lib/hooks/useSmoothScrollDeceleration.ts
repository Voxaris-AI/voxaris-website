import { useEffect } from "react";

export function useSmoothScrollDeceleration() {
  useEffect(() => {
    let velocity = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      velocity = e.deltaY;
      isScrolling = true;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;

        // Apply easing with higher friction for smoother deceleration
        let currentVelocity = velocity * 0.1; // Further reduced for slower scrolling
        const friction = 0.99; // Higher friction = longer, smoother deceleration
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
          const deltaTime = Math.min(currentTime - lastTime, 16.67); // Cap at ~60fps
          lastTime = currentTime;

          window.scrollBy(0, currentVelocity);
          currentVelocity *= friction;

          // Smoother threshold for stopping
          if (Math.abs(currentVelocity) > 0.05) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);
}
