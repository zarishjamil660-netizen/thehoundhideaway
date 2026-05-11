import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const PawCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    // Desktop/laptop only: avoid showing custom cursor on touch devices.
    if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const interactiveSelector =
      "a, button, [role='button'], input, .btn-mint, .btn-primary, .btn-outline-light";

    const onEnter = () => {
      if (isHovering.current) return;
      isHovering.current = true;
      gsap.to(cursor, { scale: 2, duration: 0.28, ease: "elastic.out(1,0.4)", overwrite: "auto" });
      gsap.to(follower, { scale: 1.8, opacity: 0.25, duration: 0.28, overwrite: "auto" });
    };

    const onLeave = () => {
      if (!isHovering.current) return;
      isHovering.current = false;
      gsap.to(cursor, { scale: 1, duration: 0.22, ease: "power2.out", overwrite: "auto" });
      gsap.to(follower, { scale: 1, opacity: 0.12, duration: 0.22, overwrite: "auto" });
    };

    // Hide native cursor so only paw cursor is visible.
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-paw-cursor", "true");
    styleTag.textContent = `
      @media (min-width: 768px) and (pointer: fine) {
        html, body, a, button, input, textarea, select, [role="button"] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleTag);

    // quickTo reduces jank vs creating new tweens on every mousemove.
    const moveCursorX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const moveCursorY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });
    const moveFollowerX = gsap.quickTo(follower, "x", { duration: 0.38, ease: "power3.out" });
    const moveFollowerY = gsap.quickTo(follower, "y", { duration: 0.38, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      moveCursorX(e.clientX - 16);
      moveCursorY(e.clientY - 16);
      moveFollowerX(e.clientX - 22);
      moveFollowerY(e.clientY - 22);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(interactiveSelector)) onEnter();
    };

    const onMouseOut = (e: MouseEvent) => {
      const from = (e.target as Element | null)?.closest(interactiveSelector);
      const to = (e.relatedTarget as Element | null)?.closest?.(interactiveSelector);
      if (from && !to) onLeave();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      styleTag.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <span className="text-2xl leading-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">🐾</span>
      </div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-11 h-11 rounded-full border-2 border-highlight pointer-events-none z-[99998] opacity-[0.12] hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default PawCursor;
