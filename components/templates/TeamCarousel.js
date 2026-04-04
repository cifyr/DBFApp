'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Templates.module.css';

export default function TeamCarousel({ carousel }) {
    const items = carousel?.items ?? [];
    const heading = carousel?.heading || 'Subteam Highlights';
    const maxHeight = carousel?.maxHeight || '50vh';
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoAdvanceDirection, setAutoAdvanceDirection] = useState(1);
    const [viewportHeight, setViewportHeight] = useState(null);
    const [viewportWidth, setViewportWidth] = useState(null);
    const [stageHeight, setStageHeight] = useState(null);
    const [constrainedSizes, setConstrainedSizes] = useState(() => items.map(() => null));
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [autoAdvanceNonce, setAutoAdvanceNonce] = useState(0);
    const [imageSizes, setImageSizes] = useState(() => items.map(() => null));
    const stageRef = useRef(null);
    const viewportRef = useRef(null);
    const imageRefs = useRef([]);
    const dragStateRef = useRef({
        pointerId: null,
        startX: 0,
        dragging: false,
    });
    const hasMultipleItems = items.length > 1;

    const restartAutoAdvance = useCallback(() => {
        setAutoAdvanceNonce((currentValue) => currentValue + 1);
    }, []);

    const goToSlide = useCallback((index, { manual = false, direction = 0 } = {}) => {
        const nextIndex = (index + items.length) % items.length;

        if (manual && direction !== 0) {
            setAutoAdvanceDirection(direction);
        }

        if (manual) {
            restartAutoAdvance();
        }

        dragStateRef.current = {
            pointerId: null,
            startX: 0,
            dragging: false,
        };
        setActiveIndex(nextIndex);
        setDragOffset(0);
        setIsDragging(false);
    }, [items.length, restartAutoAdvance]);

    const getMaxHeightInPixels = useCallback(() => {
        if (typeof window === 'undefined') {
            return 0;
        }

        if (typeof maxHeight === 'number') {
            return maxHeight;
        }

        if (typeof maxHeight === 'string' && maxHeight.endsWith('vh')) {
            return (window.innerHeight * parseFloat(maxHeight)) / 100;
        }

        if (typeof maxHeight === 'string' && maxHeight.endsWith('px')) {
            return parseFloat(maxHeight);
        }

        return window.innerHeight * 0.5;
    }, [maxHeight]);

    const getConstrainedSize = useCallback((size, availableWidth, availableHeight) => {
        if (!size || !availableWidth || !availableHeight) {
            return null;
        }

        const scale = Math.min(
            1,
            availableWidth / size.width,
            availableHeight / size.height
        );

        return {
            width: Math.round(size.width * scale),
            height: Math.round(size.height * scale),
        };
    }, []);

    const captureLoadedImageSizes = useCallback(() => {
        setImageSizes((currentSizes) => {
            const nextSizes = items.map((_, index) => {
                const image = imageRefs.current[index];

                if (!image?.complete || !image.naturalWidth || !image.naturalHeight) {
                    return currentSizes[index] ?? null;
                }

                return {
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                };
            });

            const hasChanged = nextSizes.some((size, index) => (
                size?.width !== currentSizes[index]?.width
                || size?.height !== currentSizes[index]?.height
            ));

            return hasChanged ? nextSizes : currentSizes;
        });
    }, [items]);

    const measureSlides = useCallback(() => {
        const availableWidth = stageRef.current?.clientWidth || 0;
        const availableHeight = getMaxHeightInPixels();

        if (!availableWidth || !availableHeight) {
            return;
        }

        const constrainedSizes = imageSizes.map((size) => (
            getConstrainedSize(size, availableWidth, availableHeight)
        ));
        const activeSize = constrainedSizes[activeIndex];
        const tallestSlide = constrainedSizes.reduce(
            (maxValue, size) => Math.max(maxValue, size?.height || 0),
            0
        );

        setConstrainedSizes((currentSizes) => {
            const hasChanged = constrainedSizes.some((size, index) => (
                size?.width !== currentSizes[index]?.width
                || size?.height !== currentSizes[index]?.height
            )) || currentSizes.length !== constrainedSizes.length;

            return hasChanged ? constrainedSizes : currentSizes;
        });

        setStageHeight((currentHeight) => (
            tallestSlide > 0 && currentHeight !== tallestSlide ? tallestSlide : currentHeight
        ));
        setViewportHeight((currentHeight) => (
            activeSize?.height
                ? currentHeight !== activeSize.height ? activeSize.height : currentHeight
                : currentHeight !== null ? null : currentHeight
        ));
        setViewportWidth((currentWidth) => (
            activeSize?.width
                ? currentWidth !== activeSize.width ? activeSize.width : currentWidth
                : currentWidth !== null ? null : currentWidth
        ));
    }, [activeIndex, getConstrainedSize, getMaxHeightInPixels, imageSizes]);

    useEffect(() => {
        if (items.length === 0) {
            return undefined;
        }

        const scheduleMeasure = () => {
            window.requestAnimationFrame(() => {
                captureLoadedImageSizes();
                measureSlides();
            });
        };

        scheduleMeasure();
        window.addEventListener('resize', scheduleMeasure);

        let observer = null;

        if (typeof ResizeObserver !== 'undefined' && stageRef.current) {
            observer = new ResizeObserver(scheduleMeasure);
            observer.observe(stageRef.current);
        }

        return () => {
            window.removeEventListener('resize', scheduleMeasure);
            observer?.disconnect();
        };
    }, [captureLoadedImageSizes, items.length, measureSlides]);

    useEffect(() => {
        if (!hasMultipleItems) {
            return undefined;
        }

        const autoAdvance = window.setTimeout(() => {
            setActiveIndex((currentIndex) => (
                (currentIndex + autoAdvanceDirection + items.length) % items.length
            ));
        }, 3000);

        return () => {
            window.clearTimeout(autoAdvance);
        };
    }, [activeIndex, autoAdvanceDirection, autoAdvanceNonce, hasMultipleItems, items.length]);

    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setActiveIndex((currentIndex) => Math.min(currentIndex, items.length - 1));
    }, [items.length]);

    useEffect(() => {
        setImageSizes(items.map(() => null));
        setConstrainedSizes(items.map(() => null));
    }, [items]);

    const resetDragState = useCallback(() => {
        dragStateRef.current = {
            pointerId: null,
            startX: 0,
            dragging: false,
        };
        setDragOffset(0);
        setIsDragging(false);
    }, []);

    const handlePointerDown = useCallback((event) => {
        if (!hasMultipleItems) {
            return;
        }

        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            dragging: true,
        };

        setIsDragging(true);
        setDragOffset(0);
        event.currentTarget.setPointerCapture?.(event.pointerId);
    }, [hasMultipleItems]);

    const handlePointerMove = useCallback((event) => {
        const dragState = dragStateRef.current;

        if (!dragState.dragging || dragState.pointerId !== event.pointerId) {
            return;
        }

        setDragOffset(event.clientX - dragState.startX);
    }, []);

    const completeDrag = useCallback((event) => {
        const dragState = dragStateRef.current;

        if (!dragState.dragging || dragState.pointerId !== event.pointerId) {
            return;
        }

        const swipeDistance = event.clientX - dragState.startX;
        const slideWidth = viewportRef.current?.clientWidth ?? 0;
        const swipeThreshold = Math.min(120, Math.max(45, slideWidth * 0.12));

        event.currentTarget.releasePointerCapture?.(event.pointerId);

        if (swipeDistance <= -swipeThreshold) {
            goToSlide(activeIndex + 1, { manual: true, direction: 1 });
            return;
        }

        if (swipeDistance >= swipeThreshold) {
            goToSlide(activeIndex - 1, { manual: true, direction: -1 });
            return;
        }

        restartAutoAdvance();
        resetDragState();
    }, [activeIndex, goToSlide, resetDragState, restartAutoAdvance]);

    const cancelDrag = useCallback((event) => {
        const dragState = dragStateRef.current;

        if (dragState.pointerId !== event.pointerId) {
            return;
        }

        event.currentTarget.releasePointerCapture?.(event.pointerId);
        resetDragState();
    }, [resetDragState]);

    const handleImageLoad = useCallback((index, event) => {
        const nextSize = {
            width: event.currentTarget.naturalWidth,
            height: event.currentTarget.naturalHeight,
        };

        setImageSizes((currentSizes) => {
            const currentSize = currentSizes[index];

            if (
                currentSize?.width === nextSize.width
                && currentSize?.height === nextSize.height
            ) {
                return currentSizes;
            }

            const nextSizes = [...currentSizes];
            nextSizes[index] = nextSize;
            return nextSizes;
        });
    }, []);

    if (items.length === 0) {
        return null;
    }

    const trackOffset = constrainedSizes
        .slice(0, activeIndex)
        .reduce((totalWidth, size) => totalWidth + (size?.width || 0), 0);

    return (
        <section className={styles.carouselSection} aria-label={heading}>
            <div className={styles.carouselHeader}>
                <h3 className={styles.carouselHeading}>{heading}</h3>

                {hasMultipleItems && (
                    <div className={styles.carouselControls}>
                        <button
                            type="button"
                            className={styles.carouselButton}
                            onClick={() => goToSlide(activeIndex - 1, { manual: true, direction: -1 })}
                            aria-label="Previous slide"
                        >
                            ←
                        </button>

                        <span className={styles.carouselCounter}>
                            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                        </span>

                        <button
                            type="button"
                            className={styles.carouselButton}
                            onClick={() => goToSlide(activeIndex + 1, { manual: true, direction: 1 })}
                            aria-label="Next slide"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>

            <div
                ref={stageRef}
                className={styles.carouselStage}
                style={{
                    '--carousel-max-height': maxHeight,
                    ...(stageHeight ? { minHeight: `${stageHeight}px` } : {}),
                }}
            >
                <div
                    ref={viewportRef}
                    className={`${styles.carouselViewport} ${hasMultipleItems ? styles.carouselViewportInteractive : ''} ${isDragging ? styles.carouselViewportDragging : ''}`}
                    style={{
                        ...(viewportHeight ? { height: `${viewportHeight}px` } : {}),
                        ...(viewportWidth ? { width: `${viewportWidth}px` } : {}),
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={completeDrag}
                    onPointerCancel={cancelDrag}
                >
                    <div
                        className={`${styles.carouselTrack} ${isDragging ? styles.carouselTrackDragging : ''}`}
                        style={{ transform: `translateX(${-trackOffset + dragOffset}px)` }}
                    >
                        {items.map((item, index) => (
                            <figure
                                key={`${item.src}-${index}`}
                                className={styles.carouselSlide}
                                style={constrainedSizes[index]?.width ? {
                                    width: `${constrainedSizes[index].width}px`,
                                    minWidth: `${constrainedSizes[index].width}px`,
                                } : undefined}
                            >
                                <img
                                    src={item.displaySrc || item.src}
                                    alt={item.alt || `${heading} ${index + 1}`}
                                    className={styles.carouselImage}
                                    ref={(element) => {
                                        imageRefs.current[index] = element;
                                    }}
                                    onLoad={(event) => handleImageLoad(index, event)}
                                />
                            </figure>
                        ))}
                    </div>
                </div>
            </div>

            {items[activeIndex]?.caption && (
                <p className={styles.carouselCaption}>{items[activeIndex].caption}</p>
            )}

            {hasMultipleItems && (
                <div className={styles.carouselDots} role="tablist" aria-label={`${heading} slides`}>
                    {items.map((item, index) => (
                        <button
                            key={`${item.src}-dot-${index}`}
                            type="button"
                            className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ''}`}
                            onClick={() => goToSlide(index, {
                                manual: true,
                                direction: index === activeIndex ? 0 : index > activeIndex ? 1 : -1,
                            })}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-pressed={index === activeIndex}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
