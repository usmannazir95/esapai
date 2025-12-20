"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type {
  BackgroundRippleEffectProps,
  DivGridProps,
  CellStyle,
} from "@/types/props";

export const BackgroundRippleEffect = ({
  cellSize = 56,
  rows,
  cols,
  className,
  gridClassName,
  mask = true,
  interactive = true,
  auto = false,
  autoIntervalMs = 2200,
  triggerPoint = null,
  triggerKey,
}: BackgroundRippleEffectProps) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    update();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const effectiveCols = cols ?? Math.max(1, Math.ceil(containerSize.width / cellSize) + 2);
  const effectiveRows = rows ?? Math.max(1, Math.ceil(containerSize.height / cellSize) + 2);

  useEffect(() => {
    if (typeof triggerKey !== "number") return;
    if (!triggerPoint) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const localX = triggerPoint.x - rect.left;
    const localY = triggerPoint.y - rect.top;

    const gridWidth = effectiveCols * cellSize;
    const gridHeight = effectiveRows * cellSize;
    const gridLeft = (rect.width - gridWidth) / 2;
    const gridTop = (rect.height - gridHeight) / 2;

    const xInGrid = localX - gridLeft;
    const yInGrid = localY - gridTop;

    const col = Math.min(
      effectiveCols - 1,
      Math.max(0, Math.floor(xInGrid / cellSize)),
    );
    const row = Math.min(
      effectiveRows - 1,
      Math.max(0, Math.floor(yInGrid / cellSize)),
    );

    setClickedCell({ row, col });
    setRippleKey((k) => k + 1);
  }, [cellSize, effectiveCols, effectiveRows, triggerKey, triggerPoint]);

  useEffect(() => {
    if (!auto) return;
    if (effectiveRows <= 0 || effectiveCols <= 0) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion) return;

    const interval = Math.max(400, autoIntervalMs);
    const pickRandomCell = () => ({
      row: Math.floor(Math.random() * effectiveRows),
      col: Math.floor(Math.random() * effectiveCols),
    });

    const initialTimeout = window.setTimeout(() => {
      setClickedCell(pickRandomCell());
      setRippleKey((k) => k + 1);
    }, 150);

    const timer = window.setInterval(() => {
      setClickedCell(pickRandomCell());
      setRippleKey((k) => k + 1);
    }, interval);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(timer);
    };
  }, [auto, autoIntervalMs, effectiveCols, effectiveRows]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className={cn(
            mask ? "mask-radial-from-20% mask-radial-at-top opacity-60" : "opacity-80",
            gridClassName,
          )}
          rows={effectiveRows}
          cols={effectiveCols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive={interactive}
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
};


const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-55 transition-opacity duration-150 will-change-transform hover:opacity-90 motion-reduce:animate-none dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
