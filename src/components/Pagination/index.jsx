import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cls = (...arr) => arr.filter(Boolean).join(' ');

function PageButton({ active, disabled, onClick, children, ariaLabel }) {
    return (
        <button
            aria-label={ariaLabel}
            aria-current={active ? 'page' : undefined}
            disabled={disabled}
            onClick={onClick}
            className={cls(
                'h-9 min-w-9 px-3 rounded-xl text-sm select-none transition-colors outline-none',
                // cursor holatlari
                disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : active
                    ? 'cursor-default'
                    : 'cursor-pointer',
                // focus ring (brand)
                'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2464AE]/50 ' +
                    'focus-visible:ring-offset-transparent dark:focus-visible:ring-offset-slate-900',
                // rang va hover
                active
                    ? 'bg-[#2464AE] text-white border border-transparent hover:bg-[#1f59a0]'
                    : 'bg-transparent text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 ' +
                          'hover:bg-[#2464AE]/10 hover:text-[#2464AE] hover:border-[#2464AE]/30'
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
