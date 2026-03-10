import React from 'react';

/* ── Icon ── */
export const Icon = ({ name, className = '' }: { name: string; className?: string }) => (
    <span className={`material-symbols-outlined ms ${className}`}>{name}</span>
);

/* ── Badge ── */
type BadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'slate' | 'orange' | 'live';
export const Badge = ({
    variant,
    children,
    style,
}: {
    variant: BadgeVariant;
    children: React.ReactNode;
    style?: React.CSSProperties;
}) => (
    <span className={`badge badge-${variant}`} style={style}>
        {children}
    </span>
);

/* ── Avatar ── */
export const Avatar = ({
    initials,
    bg,
    color,
    size = 32,
}: {
    initials: string;
    bg: string;
    color: string;
    size?: number;
}) => (
    <div
        className="avatar"
        style={{
            background: bg,
            color,
            width: size,
            height: size,
            fontSize: size * 0.34,
        }}
    >
        {initials}
    </div>
);

/* ── Stars ── */
export const Stars = ({ rating }: { rating: number }) => (
    <div className="stars">
        {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={i <= rating ? 'star-on' : 'star-off'}>
                ★
            </span>
        ))}
    </div>
);

/* ── Toggle ── */
export const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <label className="toggle">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
    </label>
);

/* ── Progress Bar ── */
export const ProgBar = ({ pct }: { pct: number }) => (
    <div className="prog-bar">
        <div className="prog-fill" style={{ width: `${pct}%` }} />
    </div>
);

/* ── Pagination ── */
export const Pagination = ({
    info,
    pages,
    current,
}: {
    info: string;
    pages: (string | number)[];
    current: number;
}) => (
    <div className="table-footer">
        <span className="pag-info">{info}</span>
        <div className="pag-btns">
            {pages.map((p, i) => (
                <button
                    key={i}
                    className={`pag-btn ${p === current ? 'active' : ''} ${typeof p === 'string' ? 'pag-btn-wide' : ''}`}
                >
                    {p}
                </button>
            ))}
        </div>
    </div>
);
