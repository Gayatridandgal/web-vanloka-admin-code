import { useState } from "react";
import { ProgBar, Toggle } from "../ui/index";

/* ══════════ SETTINGS ══════════ */
export const SettingsPage = () => {
  const [toggles, setToggles] = useState([true, true, true, false]);
  const toggle = (i: number) =>
    setToggles((t) => t.map((v, idx) => (idx === i ? !v : v)));
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">
            <span
              className="material-symbols-outlined ms"
              style={{ fontSize: 18 }}
            >
              settings
            </span>
            System Settings
          </div>
          <div className="breadcrumb">
            Admin <span>/</span> Settings
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <span className="material-symbols-outlined ms">undo</span>Discard
            Changes
          </button>
          <button className="btn btn-primary">
            <span className="material-symbols-outlined ms">save</span>Save
            Settings
          </button>
        </div>
      </div>
      <div className="page-body">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div className="white-card">
            <div className="card-title">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16, color: "var(--primary)" }}
              >
                business
              </span>
              Organization Profile
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="form-grid form-grid-2">
                <div>
                  <label className="form-label">Organization Name</label>
                  <input
                    className="form-input"
                    defaultValue="Logistics Solutions Inc."
                  />
                </div>
                <div>
                  <label className="form-label">Registered ID</label>
                  <input className="form-input" defaultValue="LS-99823-FLEET" />
                </div>
              </div>
              <div>
                <label className="form-label">Company Email</label>
                <input
                  className="form-input"
                  defaultValue="admin@logisticssolutions.com"
                />
              </div>
              <div>
                <label className="form-label">HQ Address</label>
                <input
                  className="form-input"
                  defaultValue="123 Logistics Way, Hindalga, Belagavi, KA 591108"
                />
              </div>
              <div className="form-grid form-grid-2">
                <div>
                  <label className="form-label">Timezone</label>
                  <select className="form-select">
                    <option>(GMT+05:30) Mumbai, New Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Currency Display</label>
                  <select className="form-select">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="white-card">
            <div className="card-title">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16, color: "var(--primary)" }}
              >
                tune
              </span>
              Operational Configuration
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  label: "Real-time GPS Tracking",
                  sub: "Update vehicle location every 15 seconds",
                },
                {
                  label: "Automatic Route Optimization",
                  sub: "Suggest fastest routes based on traffic",
                },
                {
                  label: "SMS Notifications",
                  sub: "Session reminders via SMS",
                },
                {
                  label: "Auto Invoice Generation",
                  sub: "Auto-generate on session complete",
                },
              ].map((item, i) => (
                <div key={item.label}>
                  {i > 0 && (
                    <div
                      style={{
                        height: 1,
                        background: "var(--border)",
                        marginBottom: 14,
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        {item.sub}
                      </div>
                    </div>
                    <Toggle checked={toggles[i]} onChange={() => toggle(i)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="white-card">
          <div className="card-title">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16, color: "var(--primary)" }}
            >
              storage
            </span>
            Storage Usage
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>
              Storage Used
            </span>
            <span style={{ fontSize: 12, fontWeight: 800 }}>650 GB / 1 TB</span>
          </div>
          <ProgBar pct={65} />
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
            350 GB available · Last backup: Today 3:00 AM ·{" "}
            <a
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Upgrade Storage
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
