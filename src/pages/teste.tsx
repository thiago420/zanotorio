import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const PhysicsDraggable: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const boxBodyRef = useRef<Matter.Body | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!boxRef.current) return;

    // Configuração do motor de física Matter.js
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 }
    });
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: boxRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#f4f4f4'
      }
    });
    renderRef.current = render;

    // Criar corpos físicos
    const box = Matter.Bodies.rectangle(400, 200, 80, 80, {
      restitution: 0.7,
      friction: 0.01,
      render: {
        fillStyle: '#3498db',
        strokeStyle: '#2980b9',
        lineWidth: 2
      }
    });
    boxBodyRef.current = box;

    // Criar paredes
    const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(800, 300, 60, 600, { isStatic: true });

    Matter.Composite.add(engine.world, [box, ground, leftWall, rightWall]);
    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Função para converter coordenadas do mouse para coordenadas do mundo físico
    const getRelativeMousePosition = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    // Eventos de arrastar
    const canvas = render.canvas;

    const onMouseDown = (e: MouseEvent) => {
      if (!boxBodyRef.current) return;

      const mousePos = getRelativeMousePosition(canvas, e.clientX, e.clientY);
      const bodies = Matter.Query.point([boxBodyRef.current], mousePos);

      if (bodies.length > 0) {
        isDraggingRef.current = true;
        Matter.Body.setStatic(boxBodyRef.current, true);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !boxBodyRef.current) return;

      const mousePos = getRelativeMousePosition(canvas, e.clientX, e.clientY);
      Matter.Body.setPosition(boxBodyRef.current, mousePos);
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current || !boxBodyRef.current) return;

      isDraggingRef.current = false;
      Matter.Body.setStatic(boxBodyRef.current, false);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);

      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: '800px',
        height: '600px',
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};

export default PhysicsDraggable;
