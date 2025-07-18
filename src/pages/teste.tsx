import React, { useEffect, useRef } from "react";
import Matter, { Engine, Render, World, Bodies, Mouse } from "matter-js";

const DraggableBox: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: "#fafafa",
      },
    });

    // Cria um retângulo (caixa)
    const box = Bodies.rectangle(400, 200, 100, 100, {
      restitution: 0.5,
      render: {
        fillStyle: "#3498db",
      },
    });

    // Piso
    const ground = Bodies.rectangle(400, 580, 810, 60, {
      isStatic: true,
      render: {
        fillStyle: "#95a5a6",
      },
    });

    World.add(world, [box, ground]);

    // Adiciona o controle do mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    render.mouse = mouse;

    // Executa o motor e renderização
    Engine.run(engine);
    Render.run(render);

    // Cleanup
    return () => {
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default DraggableBox;
