/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";

// Default export a React component
export default function DraggableMatterComponent({
  width = 800,
  height = 600,
  background = "#0f172a", // slate-900-ish
}: {
  width?: number;
  height?: number;
  background?: string;
}) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = 1; // earth-like gravity
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Add boundaries (static)
    const thickness = 60;
    const ground = Bodies.rectangle(width / 2, height + thickness / 2 - 10, width + 2 * thickness, thickness, {
      isStatic: true,
      label: "ground",
    });
    const ceiling = Bodies.rectangle(width / 2, -thickness / 2 + 10, width + 2 * thickness, thickness, {
      isStatic: true,
      label: "ceiling",
    });
    const left = Bodies.rectangle(-thickness / 2 + 10, height / 2, thickness, height + 2 * thickness, {
      isStatic: true,
      label: "left",
    });
    const right = Bodies.rectangle(width + thickness / 2 - 10, height / 2, thickness, height + 2 * thickness, {
      isStatic: true,
      label: "right",
    });

    World.add(engine.world, [ground, ceiling, left, right]);

    // Create a pile of draggable boxes & circles
    const stack: any[] = [];
    const cols = 6;
    const rows = 4;
    const boxSize = 48;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = 150 + i * (boxSize + 6);
        const y = 80 + j * (boxSize + 6);
        const useCircle = Math.random() > 0.6;
        const body = useCircle
          ? Bodies.circle(x, y, boxSize / 2, {
              restitution: 0.4,
              friction: 0.5,
              label: "ball",
            })
          : Bodies.rectangle(x, y, boxSize, boxSize, {
              restitution: 0.1,
              friction: 0.6,
              chamfer: { radius: 6 },
              label: "box",
            });
        // Add a small custom property to style inside render's beforeRender if needed
        (body as any).render.fillStyle = Math.random() > 0.5 ? "#f97316" : "#60a5fa"; // orange / blue
        stack.push(body);
      }
    }
    World.add(engine.world, stack);

    // Mouse control - allows grabbing & dragging
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
        },
      },
      // You can limit which bodies are draggable using collisionFilter or events
    });
    World.add(engine.world, mouseConstraint);

    // Improve dragging feel on touch devices
    render.canvas.addEventListener("touchstart", (e) => {
      // Prevent default page scrolling while interacting with the canvas
      e.preventDefault();
    });

    // Optional: highlight grabbed body
    Events.on(mouseConstraint, "startdrag", (event: any) => {
      const b = event.body;
      if (b) {
        (b as any).render.strokeStyle = "#ffffff";
        (b as any).render.lineWidth = 3;
      }
    });
    Events.on(mouseConstraint, "enddrag", (event: any) => {
      const b = event.body;
      if (b) {
        (b as any).render.strokeStyle = undefined;
        (b as any).render.lineWidth = undefined;
      }
    });

    // Clean up on unmount
    return () => {
      // Remove listeners
      try {
        Render.stop(render);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
      } catch {
        // ignore
      }
    };
  }, [width, height, background]);

  // Simple UI wrapper with Tailwind classes (works even if Tailwind is not present)
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div
        ref={sceneRef}
        style={{ width, height, borderRadius: 12, overflow: "hidden", touchAction: "none" }}
        className="shadow-2xl"
      />
      <div className="mt-3 text-sm text-slate-300">
        Segure e arraste com mouse ou toque — toque no canvas para interação em mobile.
      </div>
      <div className="mt-2 text-xs text-slate-400">Dica: npm install matter-js@latest</div>
    </div>
  );
}
