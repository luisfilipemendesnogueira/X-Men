import React, { useState, useEffect, useRef } from 'react';
import arrowBack from '../assets/icons/left-arrow-backup-2-svgrepo-com.svg';
import arrowNext from '../assets/icons/right-arrow-backup-2-svgrepo-com.svg';

export default function Carousel({ items, renderItem, itemsPerView: defaultItemsPerView = 3 }) {
  const slideRef = useRef(null);
  const wrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(defaultItemsPerView);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const updateItemsPerView = () => {
    if (wrapperRef.current && wrapperRef.current.dataset.itemsPerView) {
      const fixed = parseInt(wrapperRef.current.dataset.itemsPerView, 10);
      if (!isNaN(fixed) && fixed > 0) {
        setItemsPerView(fixed);
        return;
      }
    }

    if (defaultItemsPerView !== 3) {
      setItemsPerView(defaultItemsPerView);
      return;
    }

    const width = window.innerWidth;
    if (width <= 800) setItemsPerView(1);
    else if (width <= 1080) setItemsPerView(2);
    else setItemsPerView(defaultItemsPerView);
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [defaultItemsPerView]);

  const applyItemWidths = () => {
    if (!slideRef.current) return;

    const slide = slideRef.current;
    const children = Array.from(slide.children);

    if (children.length === 0) return;

    const gap = parseFloat(getComputedStyle(slide).gap) || 0;
    const visibleCount = Math.max(1, itemsPerView);
    const containerWidth = slide.parentElement.offsetWidth;
    const totalGap = gap * (visibleCount - 1);
    const itemWidth = (containerWidth - totalGap) / visibleCount;

    children.forEach((child) => {
      child.style.flex = `0 0 ${itemWidth}px`;
      child.style.maxWidth = `${itemWidth}px`;
    });

    const offset = -currentIndex * (itemWidth + gap);
    slide.style.transform = `translateX(${offset}px)`;
    setPrevTranslate(offset);
  };

  useEffect(() => {
    applyItemWidths();
    const onResize = () => applyItemWidths();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [itemsPerView, items.length, currentIndex]);

  const moveToIndex = (index) => {
    const lastIndex = Math.max(0, items.length - itemsPerView);
    const newIndex = Math.max(0, Math.min(index, lastIndex));
    setCurrentIndex(newIndex);

    if (slideRef.current && slideRef.current.children.length > 0) {
      const itemWidth = slideRef.current.children[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(slideRef.current).gap) || 0;
      const offset = -newIndex * (itemWidth + gap);
      slideRef.current.style.transition = 'transform 0.3s ease out';
      slideRef.current.style.transform = `translateX(${offset}px)`;
      setPrevTranslate(offset);
    }
  };

  const handlePrev = () => {
    const lastPageStart = Math.max(0, items.length - itemsPerView);
    const newIndex = currentIndex <= 0 ? lastPageStart : currentIndex - itemsPerView;
    moveToIndex(newIndex);
  };

  const handleNext = () => {
    const lastPageStart = Math.max(0, items.length - itemsPerView);
    const newIndex = currentIndex >= lastPageStart ? 0 : currentIndex + itemsPerView;
    moveToIndex(newIndex);
  };

  const dragStart = (event) => {
    if (items.length <= itemsPerView) return;
    setIsDragging(true);
    setIsMoved(false);
    const x = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    const y = event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
    setStartX(x);
    setStartY(y);
    if (slideRef.current) slideRef.current.style.transition = 'none';
  };

  const drag = (event) => {
    if (!isDragging || items.length <= itemsPerView) return;

    const isTouch = event.type.includes('touch');
    const x = isTouch ? event.touches[0].clientX : event.pageX;
    const y = isTouch ? event.touches[0].clientY : event.pageY;

    const dx = x - startX;
    const dy = y - startY;

    if (!isMoved) {
      const threshold = 5;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        setIsMoved(true);
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
        dragEnd();
        return;
      } else {
        return;
      }
    }

    const translate = prevTranslate + dx;
    setCurrentTranslate(translate);
    if (slideRef.current) slideRef.current.style.transform = `translateX(${translate}px)`;
  };

  const dragEnd = () => {
    if (!isDragging || items.length <= itemsPerView) return;
    setIsDragging(false);

    if (slideRef.current)
      slideRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';

    if (!isMoved) return;

    const preventClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      slideRef.current.removeEventListener('click', preventClick, true);
    };

    slideRef.current.addEventListener('click', preventClick, true);

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 10;

    if (movedBy < -threshold) moveToIndex(currentIndex + itemsPerView);
    else if (movedBy > threshold) moveToIndex(currentIndex - itemsPerView);
    else moveToIndex(currentIndex);
  };

  const handleClickItem = (event) => {
    if (isMoved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    moveToIndex(0);
  }, [itemsPerView]);

  return (
    <div className="carousel-wrapper" ref={wrapperRef}>
      {items.length > itemsPerView && (
        <div className="botao carousel-prev" onClick={handlePrev}>
          <img src={arrowBack} alt="Seta para a esquerda" />
        </div>
      )}

      <div className="carousel-container">
        <div
          className="carousel-slide"
          ref={slideRef}
          onMouseDown={dragStart}
          onMouseMove={drag}
          onMouseUp={dragEnd}
          onMouseLeave={dragEnd}
          onTouchStart={dragStart}
          onTouchMove={drag}
          onTouchEnd={dragEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          {items.map((item, index) => (
            <div className="carousel-item" key={index} onClick={handleClickItem}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        <div className="carousel-line">
          <div className="carousel-indicators">
            {Array.from({
              length: Math.ceil(items.length / Math.max(1, itemsPerView)),
            }).map((_, idx) => (
              <div
                key={idx}
                className={`carousel-indicator ${idx === Math.floor(currentIndex / Math.max(1, itemsPerView))
                  ? 'carousel-indicator-active'
                  : ''
                  }`}
                onClick={() => moveToIndex(idx * itemsPerView)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {items.length > itemsPerView && (
        <div className="botao carousel-next" onClick={handleNext}>
          <img src={arrowNext} alt="Seta para a direita" />
        </div>
      )}
    </div>
  );
}
