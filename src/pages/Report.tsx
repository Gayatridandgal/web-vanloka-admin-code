import { Badge, ProgBar } from "../ui/index";

/* ══════════ REPORTS ══════════ */
export const ReportsPage = () => (
  <>
    <div className="page-header">
      <div>
        <div className="page-title">
          <span
            className="material-symbols-outlined ms"
            style={{ fontSize: 18 }}
          >
            bar_chart
          </span>
          Fleet Performance Reports
        </div>
        <div className="breadcrumb">
          Admin <span>/</span> Reports
        </div>
      </div>
      <div className="header-actions">
        <button className="btn btn-secondary">
          <span className="material-symbols-outlined ms">table_chart</span>Excel
        </button>
        <button className="btn btn-primary">
          <span className="material-symbols-outlined ms">picture_as_pdf</span>
          PDF Export
        </button>
      </div>
    </div>
    <div className="page-body">
      <div className="stat-grid stat-grid-4">
        {[
          {
            bg: "#DBEAFE",
            ic: "#2563EB",
            icon: "directions_car",
            label: "Active Fleet",
            val: "124",
            trend: "↑ 4% from last month",
            tc: "trend-up",
          },
          {
            bg: "#DCFCE7",
            ic: "#059669",
            icon: "payments",
            label: "Total Revenue",
            val: "$42,850",
            trend: "↑ 12.5% from last month",
            tc: "trend-up",
          },
          {
            bg: "#FEF3C7",
            ic: "#D97706",
            icon: "local_gas_station",
            label: "Avg Fuel Efficiency",
            val: "18.4 mpg",
            trend: "↓ 2.1%",
            tc: "trend-down",
          },
          {
            bg: "#EDE9FE",
            ic: "#7C3AED",
            icon: "timer",
            label: "On-Time Rate",
            val: "98.2%",
            trend: "Stable",
            tc: "trend-neutral",
          },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <span
                className="material-symbols-outlined ms"
                style={{ color: s.ic }}
              >
                {s.icon}
              </span>
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.val}</div>
              <div className={`stat-trend ${s.tc}`}>{s.trend}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="white-card">
          <div className="card-title">Revenue vs Fleet Costs</div>
          <div className="chart-bars">
            {[65, 80, 58, 90, 72, 85].map((h, i) => (
              <div
                key={i}
                className="chart-bar"
                style={{
                  height: `${h}%`,
                  background:
                    h === 58
                      ? "#E9D5FF"
                      : "linear-gradient(180deg,var(--primary),#A78BFA)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 6,
            }}
          >
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
              <span
                key={m}
                style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="white-card">
          <div className="card-title">Fuel Consumption by Vehicle Type</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Heavy Trucks", val: "4,200L (45%)", pct: 45 },
              { label: "Delivery Vans", val: "3,120L (32%)", pct: 32 },
              { label: "Commercial Sedans", val: "1,450L (18%)", pct: 18 },
              { label: "Others", val: "460L (5%)", pct: 5 },
            ].map((f) => (
              <div key={f.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}
                  >
                    {f.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "var(--primary)",
                    }}
                  >
                    {f.val}
                  </span>
                </div>
                <ProgBar pct={f.pct} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="table-card">
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid var(--border)",
            fontSize: 13,
            fontWeight: 800,
            color: "var(--text)",
          }}
        >
          Vehicle Usage Efficiency
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Distance</th>
              <th>Fuel Cost</th>
              <th>Revenue Generated</th>
              <th>Idle Time</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "#TR-8821",
                dist: "2,450 km",
                fuel: "$612.50",
                rev: "$2,100.00",
                idle: "4.2 hrs",
                sc: "green" as const,
                scL: "High Efficiency",
              },
              {
                id: "#VN-4122",
                dist: "1,890 km",
                fuel: "$425.20",
                rev: "$1,550.00",
                idle: "12.5 hrs",
                sc: "amber" as const,
                scL: "Moderate",
              },
              {
                id: "#TR-9901",
                dist: "3,120 km",
                fuel: "$780.00",
                rev: "$2,840.00",
                idle: "2.1 hrs",
                sc: "green" as const,
                scL: "Excellent",
              },
              {
                id: "#VN-2234",
                dist: "840 km",
                fuel: "$210.00",
                rev: "$540.00",
                idle: "32.8 hrs",
                sc: "red" as const,
                scL: "Low Utilization",
              },
            ].map((r) => (
              <tr key={r.id}>
                <td>
                  <b style={{ color: "var(--primary)" }}>{r.id}</b>
                </td>
                <td>{r.dist}</td>
                <td>{r.fuel}</td>
                <td>{r.rev}</td>
                <td>{r.idle}</td>
                <td>
                  <Badge variant={r.sc}>{r.scL}</Badge>
                </td>
                <td>
                  <div className="actions-col">
                    <button className="act-btn act-view">
                      <span className="material-symbols-outlined ms">
                        visibility
                      </span>
                    </button>
                    <button className="act-btn act-edit">
                      <span className="material-symbols-outlined ms">edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
