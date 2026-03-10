import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

// Fix leaflet default icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ─── Inactivity timeout ─────────────────────────────────────────── */
const INACTIVITY_MS = 5 * 60 * 1000; // 5 minutes

/* ─── SVG Icons ──────────────────────────────────────────────────── */
const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="#7C3AED" />
    <rect x="14" y="3" width="7" height="7" rx="1" fill="#7C3AED" />
    <rect x="3" y="14" width="7" height="7" rx="1" fill="#7C3AED" />
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#7C3AED" />
  </svg>
);

const IconBus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="4"
      width="20"
      height="13"
      rx="2"
      stroke="#2563EB"
      strokeWidth="1.8"
    />
    <path d="M2 8h20" stroke="#2563EB" strokeWidth="1.8" />
    <path
      d="M8 4v4M16 4v4"
      stroke="#2563EB"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="7" cy="19" r="2" stroke="#2563EB" strokeWidth="1.8" />
    <circle cx="17" cy="19" r="2" stroke="#2563EB" strokeWidth="1.8" />
    <path d="M9 19h6" stroke="#2563EB" strokeWidth="1.8" />
  </svg>
);

const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4" height="9" rx="1" fill="#059669" />
    <rect x="10" y="7" width="4" height="14" rx="1" fill="#059669" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill="#059669" />
  </svg>
);

const IconRefresh = ({ spinning }: { spinning: boolean }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      transition: "transform 0.6s",
      transform: spinning ? "rotate(360deg)" : "none",
    }}
  >
    <path
      d="M23 4v6h-6"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 20v-6h6"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLocationOff = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="#94A3B8"
      strokeWidth="1.8"
    />
    <line
      x1="2"
      y1="2"
      x2="22"
      y2="22"
      stroke="#94A3B8"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const IconMyLocation = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#94A3B8" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="7" stroke="#94A3B8" strokeWidth="1.8" />
    <path
      d="M12 2v3M12 19v3M2 12h3M19 12h3"
      stroke="#94A3B8"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const IconFullscreen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
      stroke="#64748B"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="white"
      strokeWidth="1.8"
    />
    <path
      d="M16 2v4M8 2v4M3 10h18"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Status items ───────────────────────────────────────────────── */
const STATUS_ITEMS = [
  {
    label: "Server",
    dotCls: "dot-green",
    badgeCls: "badge-green",
    text: "Online",
  },
  {
    label: "Database",
    dotCls: "dot-green",
    badgeCls: "badge-green",
    text: "Healthy",
  },
  {
    label: "GPS Tracking",
    dotCls: "dot-green",
    badgeCls: "badge-green",
    text: "Active",
  },
  {
    label: "Payments",
    dotCls: "dot-amber",
    badgeCls: "badge-amber",
    text: "Partial",
  },
];

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  onViewSessions: () => void;
}

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════════ */
export const Dashboard = ({ onViewSessions }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);
  const [countdown, setCountdown] = useState(Math.floor(INACTIVITY_MS / 1000));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1400);
  };

  /*
   * startTimer — only manages timers/intervals, NO setState calls.
   * This makes it safe to call directly from useEffect without
   * triggering the "setState synchronously in effect" warning.
   */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Tick countdown every second
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    // Show overlay after INACTIVITY_MS
    timerRef.current = setTimeout(() => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      setCountdown(0);
      setShowTimeout(true);
    }, INACTIVITY_MS);
  }, []);

  /*
   * resetTimer — called by user activity events.
   * Resets both the display state AND restarts the timers.
   * Safe here because it's triggered by user events, not the effect.
   */
  const resetTimer = useCallback(() => {
    setShowTimeout((prev) => {
      if (!prev) {
        // Reset visual countdown and restart timers
        setCountdown(Math.floor(INACTIVITY_MS / 1000));
        startTimer();
      }
      return prev; // if overlay is showing, don't dismiss on activity
    });
  }, [startTimer]);

  /* ── Mount: start timer + attach activity listeners ── */
  useEffect(() => {
    startTimer(); // safe — no setState inside startTimer

    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((e) =>
      window.addEventListener(e, resetTimer, { passive: true }),
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [startTimer, resetTimer]);

  /* ── mm:ss display ── */
  const mmss = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

  return (
    <>
      {/* ══ INACTIVITY OVERLAY ══════════════════════════════════════ */}
      {showTimeout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,10,40,0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: "40px 44px",
              textAlign: "center",
              maxWidth: 400,
              width: "90vw",
              boxShadow: "0 24px 80px rgba(124,58,237,0.22)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: "#EDE9FE",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 2h4M12 10v4"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="14"
                  r="7"
                  stroke="#7C3AED"
                  strokeWidth="2"
                />
                <line
                  x1="3"
                  y1="3"
                  x2="21"
                  y2="21"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#1E293B",
                marginBottom: 10,
              }}
            >
              Session Timed Out
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#64748B",
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              You've been inactive for <strong>5 minutes</strong>.<br />
              Please refresh the page to continue.
            </div>
            <button
              className="btn btn-primary btn-full"
              style={{ fontSize: 14 }}
              onClick={() => window.location.reload()}
            >
              Refresh Now
            </button>
            <div
              style={{
                marginTop: 14,
                fontSize: 11,
                color: "#94A3B8",
                fontWeight: 600,
              }}
            >
              Any activity on the page resets the 5-minute timer
            </div>
          </div>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <IconDashboard />
            Dashboard
          </div>
          <div className="breadcrumb">
            Admin <span>/</span> Dashboard
          </div>
        </div>
        <div className="header-actions">
          <span className="badge badge-live">● System Operational</span>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div className="page-body">
        {/* Top stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
          }}
        >
          {/* Total Vehicles */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#DBEAFE" }}>
              <IconBus />
            </div>
            <div>
              <div className="stat-label">Total Vehicles</div>
              <div className="stat-value">0</div>
            </div>
          </div>

          {/* System Status */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#DCFCE7" }}>
              <IconChart />
            </div>
            <div>
              <div className="stat-label">System Status</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 2,
                }}
              >
                <div className="status-dot dot-green" />
                <span
                  style={{ fontSize: 16, fontWeight: 900, color: "#059669" }}
                >
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Refresh */}
          <div
            className="stat-card"
            style={{
              cursor: "pointer",
              justifyContent: "center",
              userSelect: "none",
            }}
            onClick={handleRefresh}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                width: "100%",
              }}
            >
              <IconRefresh spinning={refreshing} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                {refreshing ? "Refreshing..." : "REFRESH"}
              </span>
              {/* Countdown pill */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: countdown < 60 ? "#DC2626" : "#94A3B8",
                  background: countdown < 60 ? "#FEE2E2" : "#F1F5F9",
                  padding: "3px 10px",
                  borderRadius: 20,
                  letterSpacing: ".03em",
                  transition: "color .3s, background .3s",
                }}
              >
                ⏱ {mmss}
              </span>
            </div>
          </div>
        </div>

        {/* Map + Vehicle Select */}
        <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 460 }}>
          {/* Map */}
          <div className="map-container" style={{ flex: 1, minHeight: 460 }}>
            <MapContainer
              center={[15.8497, 74.4977]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%", minHeight: 460 }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>

            {/* Fullscreen button */}
            <div className="map-expand-btn">
              <IconFullscreen />
            </div>

            {/* No vehicles overlay */}
            <div className="map-overlay-content">
              <div
                style={{
                  background: "rgba(255,255,255,0.94)",
                  backdropFilter: "blur(6px)",
                  borderRadius: 16,
                  padding: "28px 36px",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  border: "1px solid var(--border)",
                  maxWidth: 320,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "#F1F5F9",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <IconLocationOff />
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    color: "var(--text)",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: ".04em",
                  }}
                >
                  NO VEHICLES ACTIVE
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  Your fleet seems to be offline or empty.
                  <br />
                  Connect a device to start tracking.
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Select Panel */}
          <div className="vehicle-select-panel">
            <div className="vehicle-select-icon">
              <IconMyLocation />
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "var(--text)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
              }}
            >
              SELECT A VEHICLE
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Click on a vehicle on the map to view real-time location and
              status details.
            </div>

            {/* System status list */}
            <div
              style={{
                marginTop: 20,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {STATUS_ITEMS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <div className={`status-dot ${s.dotCls}`} />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#475569",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <span className={`badge ${s.badgeCls}`}>{s.text}</span>
                </div>
              ))}

              {/* Storage bar */}
              <div style={{ marginTop: 4 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                    }}
                  >
                    Storage
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "var(--text)",
                    }}
                  >
                    650 GB / 1 TB
                  </span>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-full"
              style={{
                marginTop: 20,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
              onClick={onViewSessions}
            >
              <IconCalendar />
              View Sessions
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
