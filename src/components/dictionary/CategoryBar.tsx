import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, ChevronUp, SlidersHorizontal } from 'lucide-react';

export interface CategoryItem {
  id: string;
  labelVi: string;
}

interface CategoryBarProps {
  categories: CategoryItem[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, scrollLeft: 0, isDown: false });

  // Update arrow states based on scroll position
  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, categories]);

  // Smooth scroll helper
  const handleScroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = 240;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Mouse wheel horizontal scroll helper
  const handleWheel = (e: React.WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
      el.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    dragStartRef.current = {
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      isDown: true
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current.isDown) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartRef.current.startX) * 1.5;
    el.scrollLeft = dragStartRef.current.scrollLeft - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    dragStartRef.current.isDown = false;
    setIsDragging(false);
  };

  return (
    <div className="w-full space-y-2 select-none">
      {/* Bar Header with Title & Mode Switcher */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5 text-xs text-[#373F41] font-bold">
          <SlidersHorizontal size={14} className="text-[#1447A6]" />
          <span>Chủ đề ký hiệu ({categories.length} nhóm)</span>
        </div>

        {/* View mode toggle: Scroll bar vs Full grid view */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-[#1447A6] hover:text-[#003F86] font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#D6E5F9]/50 transition-colors cursor-pointer"
          title={isExpanded ? 'Chuyển sang thanh cuộn ngang' : 'Xem toàn bộ các chủ đề'}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={13} />
              <span>Thu gọn</span>
            </>
          ) : (
            <>
              <LayoutGrid size={13} />
              <span>Xem tất cả chủ đề</span>
            </>
          )}
        </button>
      </div>

      {/* Render Mode 1: Full Wrapped Grid View */}
      {isExpanded ? (
        <div className="p-3 bg-white rounded-2xl border border-black/10 shadow-xs flex flex-wrap gap-2 transition-all">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id];
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#1447A6] text-white shadow-sm shadow-[#1447A6]/30'
                    : 'bg-[#F5F6F8] text-[#4B4B4B] hover:bg-[#D6E5F9] hover:text-[#1447A6] border border-black/5'
                }`}
              >
                <span>{cat.labelVi}</span>
                {count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-black/5 text-[#939293]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Render Mode 2: Horizontal Scrollable Bar with Arrow Controls & Visible Scrollbar */
        <div className="relative group">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 text-[#1447A6] shadow-md border border-black/10 flex items-center justify-center hover:bg-[#D6E5F9] active:scale-90 transition-all cursor-pointer"
              title="Cuộn sang trái"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 text-[#1447A6] shadow-md border border-black/10 flex items-center justify-center hover:bg-[#D6E5F9] active:scale-90 transition-all cursor-pointer"
              title="Cuộn sang phải"
            >
              <ChevronRight size={16} />
            </button>
          )}

          {/* Scrollable Container with Drag Support and Styled Visible Scrollbar */}
          <div
            ref={containerRef}
            onScroll={checkScroll}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 px-1 visible-chip-scrollbar transition-all ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {categories.map((cat) => {
              const count = categoryCounts[cat.id];
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1447A6] text-white shadow-sm shadow-[#1447A6]/30'
                      : 'bg-white text-[#4B4B4B] border border-black/10 hover:bg-[#D6E5F9]/50 hover:text-[#1447A6]'
                  }`}
                >
                  <span>{cat.labelVi}</span>
                  {count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-black/5 text-[#939293]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
