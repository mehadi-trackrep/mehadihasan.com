'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type ExpandableTextProps = {
  children: ReactNode;
  /** Height (px) of the visible preview while collapsed. */
  collapsedHeight: number;
  /** Extra px the content must exceed `collapsedHeight` by before clamping kicks in. */
  threshold?: number;
  /** Classes for the button row, e.g. to centre or left-align the toggle. */
  toggleClassName?: string;
  className?: string;
};

/**
 * Clamps its children to `collapsedHeight` with a soft fade and a
 * "View more / View less" toggle that animates the height in place.
 * Content that already fits is rendered untouched, without a toggle.
 */
function ExpandableText({
  children,
  collapsedHeight,
  threshold = 48,
  toggleClassName = 'justify-start',
  className = '',
}: ExpandableTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const regionId = useId();

  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState<number | null>(null);

  // Track the natural height of the content (it changes with viewport width).
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setFullHeight(el.scrollHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Until measured, assume it overflows so SSR/first paint renders clamped
  // (no flash of the full text).
  const overflowing =
    fullHeight === null || fullHeight > collapsedHeight + threshold;

  const maxHeight = !overflowing
    ? 'none'
    : expanded && fullHeight !== null
      ? fullHeight
      : collapsedHeight;

  const toggle = useCallback(() => {
    setExpanded((prev) => {
      if (prev) {
        // Collapsing a long block can leave the top off-screen; bring it back.
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect && rect.top < 0) {
          rootRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
      return !prev;
    });
  }, []);

  return (
    <div ref={rootRef} className={className}>
      <div
        id={regionId}
        style={{ maxHeight }}
        className={`overflow-hidden transition-[max-height,--fade] duration-500 ease-in-out motion-reduce:transition-none ${
          overflowing && !expanded ? 'expandable-fade' : 'expandable-fade-off'
        }`}
      >
        <div ref={contentRef}>{children}</div>
      </div>

      {overflowing && (
        <div className={`mt-3 flex ${toggleClassName}`}>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={regionId}
            className="group inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/5 px-4 py-1.5 text-sm font-medium text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-white dark:focus-visible:ring-offset-transparent"
          >
            {expanded ? 'View less' : 'View more'}
            <FaChevronDown
              aria-hidden="true"
              className={`h-3 w-3 transition-transform duration-500 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpandableText;
