import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cls = (...arr) => arr.filter(Boolean).join(' ');

function PageButton({ active, disabled, onClick, children, ariaLabel }) {
    return (
        <button
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={onClick}
            className={cls(
                'h-9 min-w-9 px-3 rounded-xl text-sm',
                disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                active
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-transparent text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600'
            )}
        >
            {children}
        </button>
    );
}

function getPageList(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set([1, total, current, current - 1, current + 1]);
    [...pages].forEach((p) => (p < 1 || p > total) && pages.delete(p));
    const sorted = [...pages].sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        const p = sorted[i];
        result.push(p);
        const next = sorted[i + 1];
        if (next && next - p > 1) result.push('...');
    }
    return result;
}

const Pagination = ({ page, setPage, totalPages, totalItems, start, end }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [page]);

    return (
        <div className="mt-8 flex flex-col items-center gap-3">
            <div className="text-sm text-slate-600 dark:text-slate-300">
                {start + 1}–{end} / {totalItems}
            </div>
            <div className="flex items-center gap-2">
                <PageButton
                    ariaLabel="Oldingi"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    <FaChevronLeft className="w-4 h-4" />
                </PageButton>

                {getPageList(page, totalPages).map((p, i) =>
                    p === '...' ? (
                        <span key={`dots-${i}`} className="px-2 text-slate-400">
                            …
                        </span>
                    ) : (
                        <PageButton
                            key={p}
                            ariaLabel={`Sahifa ${p}`}
                            active={p === page}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </PageButton>
                    )
                )}

                <PageButton
                    ariaLabel="Keyingi"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                    <FaChevronRight className="w-4 h-4" />
                </PageButton>
            </div>
        </div>
    );
};

export default Pagination;
