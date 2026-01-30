"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType<{ className?: string }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending" | "active";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [radius, setRadius] = useState(140); // Default mobile
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration
  const totalNodes = timelineData.length;
  const isMobile = radius < 200;

  // Handle Resize for Responsive Radius
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setRadius(250);
      } else {
        setRadius(140);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize with the first item active or auto-rotate
  useEffect(() => {
    // If no active ID, slowly rotate? Or just set first one?
    // Let's standard auto-rotate, then snap when clicked.
    let animationFrame: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!activeId && !isHovering) {
        setRotation((prev) => (prev + 0.02 * delta) % 360);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [activeId, isHovering]);

  const handleNodeClick = (id: number, index: number) => {
    if (activeId === id) {
      setActiveId(null); // Deselect
      return;
    }

    setActiveId(id);

    // Calculate target rotation to bring this node to -90deg (12 o'clock)
    // Node angle at 0 rotation is: (index / total) * 360
    // Current positon: currentRotation + (index/total)*360
    // Target position: -90 (or 270)
    // We want: rotation + nodeAngle = -90
    // => rotation = -90 - nodeAngle

    const nodeAngle = (index / totalNodes) * 360;

    // Desktop: Rotate to -90 (Top)
    // Mobile: Rotate to 90 (Bottom) to show card below without overlap
    const targetBase = isMobile ? 90 : -90;
    const targetRotation = targetBase - nodeAngle;

    // Normalize target to be close to current rotation to avoid spinning wildy
    // This is a simple version, for perfect shortest-path spinning we'd do modulo math.
    // For now, simple set is fine.
    setRotation(targetRotation);
  };

  const getStatusStyles = (status: TimelineItem["status"]) => {
    // Return colors for the badge border/text
    switch (status) {
      case "completed":
        return "border-white text-white";
      case "active":
        return "border-white text-white";
      case "in-progress":
        return "border-blue-400 text-blue-400";
      default:
        return "border-neutral-500 text-neutral-400";
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[650px] md:h-[950px] flex items-start pt-24 md:pt-0 md:items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Orbit Circle */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          activeId ? "transition-all duration-1000 ease-in-out" : "",
        )}
        style={{
          width: radius * 2,
          height: radius * 2,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Ring Track */}
        <div className="absolute inset-0 rounded-full border border-white/10" />

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 md:w-32 md:h-32 relative opacity-20 hover:opacity-100 transition-opacity duration-500">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const isActive = activeId === item.id;
          const angle = (index / totalNodes) * 360;

          // Counter-rotate the nodes so they stay upright
          const counterRotation = -(rotation + angle);

          return (
            <div
              key={item.id}
              className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(${counterRotation}deg)`,
              }}
            >
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNodeClick(item.id, index);
                }}
              >
                {/* Glow effect for active */}
                <div
                  className={cn(
                    "absolute -inset-4 rounded-full bg-white/20 blur-xl transition-opacity duration-500",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-50",
                  )}
                />

                {/* Node Circle */}
                <div
                  className={cn(
                    "relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border transition-all duration-300 z-10",
                    isActive
                      ? "bg-white border-white scale-110 shadow-xl"
                      : "bg-black/80 border-white/20 hover:border-white/50",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 transition-colors duration-300",
                      isActive ? "text-black" : "text-white/70",
                    )}
                  />
                </div>

                {/* Label (Only show if NOT active to avoid cluttering the card area) */}
                {!isActive && (
                  <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-medium tracking-wider text-neutral-500 uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeId && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center transition-all duration-500"
            style={{
              // Mobile: push down below bottom node (radius + offset)
              // Desktop: pull up below top node (-radius + offset) for internal display
              marginTop: isMobile ? `${radius + 40}px` : `-${radius - 140}px`,
            }}
          >
            {/* Connector Line */}
            <div className="w-px h-8 md:h-12 bg-linear-to-b from-white to-white/20 -mb-px"></div>

            {/* Card */}
            <Card className="pointer-events-auto w-[260px] md:w-[320px] bg-black border border-white/20 text-white shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300 fill-mode-forwards">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge
                    className={cn(
                      "rounded-full px-3 py-1 border text-[10px] tracking-widest uppercase",
                      getStatusStyles(
                        timelineData.find((i) => i.id === activeId)?.status ||
                          "pending",
                      ),
                    )}
                  >
                    {timelineData.find((i) => i.id === activeId)?.status}
                  </Badge>
                  <span className="text-xs font-mono text-neutral-500">
                    {timelineData.find((i) => i.id === activeId)?.date}
                  </span>
                </div>
                <CardTitle className="text-lg md:text-xl mt-4">
                  {timelineData.find((i) => i.id === activeId)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs md:text-sm text-neutral-400 space-y-4 md:space-y-6">
                <p>{timelineData.find((i) => i.id === activeId)?.content}</p>

                {/* Energy Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-wider text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Expertise
                    </span>
                    <span>
                      {timelineData.find((i) => i.id === activeId)?.energy}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${timelineData.find((i) => i.id === activeId)?.energy}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Connections */}
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 mb-3">
                    <Link className="w-3 h-3" /> Verknüpfte Dienste
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {timelineData
                      .find((i) => i.id === activeId)
                      ?.relatedIds.map((relId) => {
                        const relItem = timelineData.find(
                          (i) => i.id === relId,
                        );
                        if (!relItem) return null;
                        return (
                          <button
                            key={relId}
                            onClick={() => {
                              const idx = timelineData.findIndex(
                                (x) => x.id === relId,
                              );
                              handleNodeClick(relId, idx);
                            }}
                            className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white transition-colors flex items-center gap-1"
                          >
                            {relItem.title}{" "}
                            <ArrowRight className="w-3 h-3 opacity-50" />
                          </button>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
