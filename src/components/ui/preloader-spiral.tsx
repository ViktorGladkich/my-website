"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Vector Utility Class for 2D operations
class Vector2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  static random(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}

class Vector3D {
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {}

  static random(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}

// Controller for the entire animation loop and state
class AnimationController {
  private timeline: gsap.core.Timeline;
  private time = 0;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private size: number;
  private stars: Star[] = [];

  // Animation constants
  private readonly changeEventTime = 0.32;
  private readonly cameraZ = -400;
  private readonly cameraTravelDistance = 3400;
  private readonly startDotYOffset = 0;
  private readonly viewZoom = 100;
  private readonly numberOfStars = 5000;
  private readonly trailLength = 80;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    dpr: number,
    size: number,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.dpr = dpr;
    this.size = size;
    this.timeline = gsap.timeline({ repeat: -1 });

    // Initialize the system
    this.setupRandomGenerator();
    this.createStars();
    this.setupTimeline();
  }

  // Set up a deterministic random number generator for consistent star patterns
  private setupRandomGenerator() {
    const originalRandom = Math.random;
    const customRandom = () => {
      let seed = 1234;
      return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    };

    Math.random = customRandom();
    this.createStars();
    Math.random = originalRandom;
  }

  // Generate the star field
  private createStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance));
    }
  }

  // Configure the GSAP timeline for the main animation loop
  private setupTimeline() {
    this.timeline.to(this, {
      time: 1,
      duration: 7,
      repeat: -1,
      ease: "none",
      onUpdate: () => this.render(),
    });
  }

  // Custom easing function
  public ease(p: number, g: number): number {
    if (p < 0.5) return 0.5 * Math.pow(2 * p, g);
    else return 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }

  // Elastic ease for that bouncy feel
  public easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }

  // Utility to map a value from one range to another
  public map(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
  ): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  // Clamp value between min and max
  public constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  // Standard Linear Interpolation
  public lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  // Calculate the spiral path coordinates based on progress (p)
  public spiralPath(p: number): Vector2D {
    p = this.constrain(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const numberOfSpiralTurns = 6;
    const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p);
    const r = 320 * Math.sqrt(p);

    return new Vector2D(
      r * Math.cos(theta),
      r * Math.sin(theta) + this.startDotYOffset,
    );
  }

  // Apply rotation transformation to particles
  public rotate(
    v1: Vector2D,
    v2: Vector2D,
    p: number,
    orientation: boolean,
  ): Vector2D {
    const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);

    const dx = v1.x - middle.x;
    const dy = v1.y - middle.y;
    const angle = Math.atan2(dy, dx);
    const o = orientation ? -1 : 1;
    const r = Math.sqrt(dx * dx + dy * dy);

    // Add a bounce effect during rotation
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p);

    return new Vector2D(
      middle.x +
        r *
          (1 + bounce) *
          Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      middle.y +
        r *
          (1 + bounce) *
          Math.sin(angle + o * Math.PI * this.easeOutElastic(p)),
    );
  }

  // Project 3D coordinates to 2D canvas space and draw the dot
  public showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(
      this.map(this.time, this.changeEventTime, 1, 0, 1),
      0,
      1,
    );
    const newCameraZ =
      this.cameraZ +
      this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;

    if (position.z > newCameraZ) {
      const dotDepthFromCamera = position.z - newCameraZ;

      // 3D to 2D projection math
      const x = (this.viewZoom * position.x) / dotDepthFromCamera;
      const y = (this.viewZoom * position.y) / dotDepthFromCamera;
      const sw = (400 * sizeFactor) / dotDepthFromCamera;

      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  // Draw the initial central dot
  private drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
      const position = new Vector3D(0, dy, this.cameraTravelDistance);
      this.showProjectedDot(position, 2.5);
    }
  }

  // Main render loop
  public render() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.size, this.size);

    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);

    // Calculate time-based progress variables
    const t1 = this.constrain(
      this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1),
      0,
      1,
    );
    // const t2 = this.constrain(
    //   this.map(this.time, this.changeEventTime, 1, 0, 1),
    //   0,
    //   1,
    // );

    // Note: Camera rotation was removed to keep the view straight
    // ctx.rotate(-Math.PI * this.ease(t2, 2.7));

    // Draw the particle trail
    this.drawTrail(t1);

    // Draw the star field
    ctx.fillStyle = "white";
    for (const star of this.stars) {
      star.render(t1, this);
    }

    // Draw the center origin point
    this.drawStartDot();

    ctx.restore();
  }

  // Render the spiral trail
  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;

      this.ctx.fillStyle = "white";
      this.ctx.lineWidth = sw;

      const pathTime = t1 - 0.00015 * i;
      const position = this.spiralPath(pathTime);

      // Apply rotation to the trail particles
      const basePos = position;
      const offset = new Vector2D(position.x + 5, position.y + 5);
      const rotated = this.rotate(
        basePos,
        offset,
        Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
        i % 2 === 0,
      );

      this.ctx.beginPath();
      this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  public pause() {
    this.timeline.pause();
  }

  public resume() {
    this.timeline.play();
  }

  public destroy() {
    this.timeline.kill();
  }
}

// Represents a single star particle in the animation
class Star {
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeWeightFactor: number;
  private z: number;
  private angle: number;
  private distance: number;
  private rotationDirection: number; // Director of spin
  private expansionRate: number; // Rate of outward expansion
  private finalScale: number; // Target scale size

  constructor(cameraZ: number, cameraTravelDistance: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.distance = 30 * Math.random() + 15;
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;

    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);

    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ);

    const lerp = (start: number, end: number, t: number) =>
      start * (1 - t) + end * t;
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
  }

  render(p: number, controller: AnimationController) {
    const spiralPos = controller.spiralPath(this.spiralLocation);
    const q = p - this.spiralLocation;

    if (q > 0) {
      const displacementProgress = controller.constrain(4 * q, 0, 1);

      // Easing functions for different phases of movement
      const linearEasing = displacementProgress;
      const elasticEasing = controller.easeOutElastic(displacementProgress);
      const powerEasing = Math.pow(displacementProgress, 2);

      // Blend easing functions for natural motion
      let easing;
      if (displacementProgress < 0.3) {
        // Start: Linear / Quad mix
        easing = controller.lerp(
          linearEasing,
          powerEasing,
          displacementProgress / 0.3,
        );
      } else if (displacementProgress < 0.7) {
        // Middle: Transition to elastic
        const t = (displacementProgress - 0.3) / 0.4;
        easing = controller.lerp(powerEasing, elasticEasing, t);
      } else {
        // End: Fully elastic
        easing = elasticEasing;
      }

      // Calculate screen position
      let screenX, screenY;

      // Apply different motion patterns based on progress
      if (displacementProgress < 0.3) {
        // Phase 1: Linear move (30%)
        screenX = controller.lerp(
          spiralPos.x,
          spiralPos.x + this.dx * 0.3,
          easing / 0.3,
        );
        screenY = controller.lerp(
          spiralPos.y,
          spiralPos.y + this.dy * 0.3,
          easing / 0.3,
        );
      } else if (displacementProgress < 0.7) {
        // Phase 2: Curved trajectory (40%)
        const midProgress = (displacementProgress - 0.3) / 0.4;
        const curveStrength =
          Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;

        // Base pos (30% linear)
        const baseX = spiralPos.x + this.dx * 0.3;
        const baseY = spiralPos.y + this.dy * 0.3;

        // Target pos (70% distance)
        const targetX = spiralPos.x + this.dx * 0.7;
        const targetY = spiralPos.y + this.dy * 0.7;

        // Add perpendicular curve offset
        const perpX = -this.dy * 0.4 * curveStrength;
        const perpY = this.dx * 0.4 * curveStrength;

        screenX =
          controller.lerp(baseX, targetX, midProgress) + perpX * midProgress;
        screenY =
          controller.lerp(baseY, targetY, midProgress) + perpY * midProgress;
      } else {
        // Phase 3: Spiral expansion (30%)
        const finalProgress = (displacementProgress - 0.7) / 0.3;

        // Base pos (70% linear)
        const baseX = spiralPos.x + this.dx * 0.7;
        const baseY = spiralPos.y + this.dy * 0.7;

        // Final destination (further out)
        const targetDistance = this.distance * this.expansionRate * 1.5;
        const spiralTurns = 1.2 * this.rotationDirection;
        const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI;

        const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
        const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);

        // Lerp to final
        screenX = controller.lerp(baseX, targetX, finalProgress);
        screenY = controller.lerp(baseY, targetY, finalProgress);
      }

      // Project 2D screen coords back to 3D space relative to camera
      const vx =
        ((this.z - controller["cameraZ"]) * screenX) / controller["viewZoom"];
      const vy =
        ((this.z - controller["cameraZ"]) * screenY) / controller["viewZoom"];

      const position = new Vector3D(vx, vy, this.z);

      // Particle size animation: swell then settle
      let sizeMultiplier = 1.0;
      if (displacementProgress < 0.6) {
        // Swell
        sizeMultiplier = 1.0 + displacementProgress * 0.2;
      } else {
        // Settle to final scale
        const t = (displacementProgress - 0.6) / 0.4;
        sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t;
      }

      const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier;

      controller.showProjectedDot(position, dotSize);
    }
  }
}

export function SpiralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<AnimationController | null>(null);
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 创建和管理动画
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 处理DPR以解决模糊问题
    const dpr = window.devicePixelRatio || 1;
    // 使用全屏尺寸
    const size = Math.max(dimensions.width, dimensions.height);

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // 设置CSS尺寸
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    // 缩放上下文以适应DPR
    ctx.scale(dpr, dpr);

    // 创建动画控制器
    animationRef.current = new AnimationController(canvas, ctx, dpr, size);

    return () => {
      // 清理动画
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [dimensions]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute" />
    </div>
  );
}
