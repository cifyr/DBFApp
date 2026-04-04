'use client';

import { usePageTransition } from './PageTransition';
import { useRouter, usePathname } from 'next/navigation';

export default function TransitionLink({ href, children, className, onClick, ...props }) {
    const { transitionTo } = usePageTransition();
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e) => {
        // Call the user's onClick if provided (e.g., closing mobile menu)
        if (onClick) onClick(e);

        // Allow default behavior for modifier keys (new tab, etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        // Check if it's an external link
        if (href.startsWith('http') || href.startsWith('mailto:')) {
            return; // Default <a> behavior
        }

        e.preventDefault();

        // Check for hash links on the same page
        const isHash = href.startsWith('#');
        const targetPath = href.split('#')[0];
        const isSamePage = targetPath === '' || targetPath === pathname;

        if (isHash || isSamePage) {
            // Just push to router (or let Lenis handle scroll via hash change)
            router.push(href);
            return;
        }

        // Use custom transition for actual page changes
        transitionTo(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
}
