'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './ProgressiveHeadshot.module.css';

function getHeadshotPreviewSrc(src) {
    if (!src || !src.startsWith('/headshots/')) {
        return src;
    }

    return src.replace('/headshots/', '/headshots/low/');
}

function getFallbackSrc(name) {
    if (!name) {
        return '';
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1C332A&color=fff&size=200`;
}

function scheduleHighResUpgrade(callback) {
    if (typeof window === 'undefined') {
        return () => {};
    }

    let cancelled = false;
    let idleId = null;
    let timeoutId = null;

    const runUpgrade = () => {
        if (cancelled) {
            return;
        }

        if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(() => {
                if (!cancelled) {
                    callback();
                }
            }, { timeout: 2000 });
            return;
        }

        timeoutId = window.setTimeout(() => {
            if (!cancelled) {
                callback();
            }
        }, 250);
    };

    if (document.readyState === 'complete') {
        runUpgrade();
    } else {
        window.addEventListener('load', runUpgrade, { once: true });
    }

    return () => {
        cancelled = true;

        if (idleId !== null && 'cancelIdleCallback' in window) {
            window.cancelIdleCallback(idleId);
        }

        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
        }

        window.removeEventListener('load', runUpgrade);
    };
}

export default function ProgressiveHeadshot({
    src,
    alt,
    className,
    fallbackName,
    loading = 'lazy'
}) {
    const fallbackSrc = useMemo(() => getFallbackSrc(fallbackName), [fallbackName]);
    const previewSrc = useMemo(() => getHeadshotPreviewSrc(src), [src]);
    const hasPreviewVariant = previewSrc !== src;

    const [displaySrc, setDisplaySrc] = useState(src);
    const [usePreview, setUsePreview] = useState(hasPreviewVariant);
    const [shouldUpgrade, setShouldUpgrade] = useState(!hasPreviewVariant);
    const [highResVisible, setHighResVisible] = useState(!hasPreviewVariant);

    useEffect(() => {
        setDisplaySrc(src);
        setUsePreview(hasPreviewVariant);
        setShouldUpgrade(!hasPreviewVariant);
        setHighResVisible(!hasPreviewVariant);
    }, [src, hasPreviewVariant]);

    useEffect(() => {
        if (!hasPreviewVariant) {
            return undefined;
        }

        return scheduleHighResUpgrade(() => {
            setShouldUpgrade(true);
        });
    }, [hasPreviewVariant, src]);

    const lowResSource = usePreview ? previewSrc : displaySrc;

    const handleLowResError = () => {
        if (usePreview) {
            setUsePreview(false);
            setShouldUpgrade(true);
            return;
        }

        if (fallbackSrc && displaySrc !== fallbackSrc) {
            setDisplaySrc(fallbackSrc);
            setHighResVisible(true);
        }
    };

    const handleHighResError = () => {
        if (fallbackSrc && displaySrc !== fallbackSrc) {
            setDisplaySrc(fallbackSrc);
            setHighResVisible(true);
            setUsePreview(false);
            return;
        }

        setHighResVisible(true);
        setUsePreview(false);
    };

    return (
        <span className={styles.root}>
            <img
                src={lowResSource}
                alt={shouldUpgrade ? '' : alt}
                aria-hidden={shouldUpgrade ? 'true' : undefined}
                className={`${className} ${styles.layer} ${highResVisible ? styles.lowHidden : styles.lowVisible}`}
                loading={loading}
                decoding="async"
                onError={handleLowResError}
            />

            {shouldUpgrade && (
                <img
                    src={displaySrc}
                    alt={alt}
                    className={`${className} ${styles.layer} ${highResVisible ? styles.highVisible : styles.highHidden}`}
                    loading={loading}
                    decoding="async"
                    fetchPriority="low"
                    onLoad={() => setHighResVisible(true)}
                    onError={handleHighResError}
                />
            )}
        </span>
    );
}
