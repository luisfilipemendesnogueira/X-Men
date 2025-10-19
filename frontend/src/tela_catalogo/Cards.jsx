import React, { useState, useEffect, useRef } from 'react';

export default function Cards({ items, renderItem, itemsPerView: defaultItemsPerView = 3 }) {
    const slideRef = useRef(null);
    const wrapperRef = useRef(null);
    const [itemsPerView, setItemsPerView] = useState(defaultItemsPerView);

    const updateItemsPerView = () => {
        if (wrapperRef.current && wrapperRef.current.dataset.itemsPerView) {
            const fixed = parseInt(wrapperRef.current.dataset.itemsPerView, 10);
            if (!isNaN(fixed) && fixed > 0) {
                setItemsPerView(fixed);
                return;
            }
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
    };

    useEffect(() => {
        applyItemWidths();
        window.addEventListener('resize', applyItemWidths);
        return () => window.removeEventListener('resize', applyItemWidths);
    }, [itemsPerView, items.length]);

    return (
        <div className="cards-wrapper" ref={wrapperRef}>
            <div className="cards-container">
                <div className="cards-slide" ref={slideRef}>
                    {items.map((item, index) => (
                        <div className="cards-item" key={index}>
                            {renderItem(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
