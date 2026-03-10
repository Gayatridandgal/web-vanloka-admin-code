import { Badge } from "../ui/index";

/* ══════════ BULK COMMUNICATION ══════════ */
export const BulkPage = () => (
  <>
    <div className="page-header">
      <div>
        <div className="page-title">
          <span
            className="material-symbols-outlined ms"
            style={{ fontSize: 18 }}
          >
            campaign
          </span>
          Bulk Communication
        </div>
        <div className="breadcrumb">
          Admin <span>/</span> Bulk Communication
        </div>
      </div>
    </div>
    <div className="page-body">
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}
      >
        <div className="white-card">
          <div className="card-title">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16, color: "var(--primary)" }}
            >
              edit_note
            </span>
            Compose New Message
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 20 }}>
            Broadcast an announcement to specific user groups or the entire
            organization.
          </p>
          <div className="form-group">
            <label className="form-label">Recipients</label>
            <select className="form-select">
              <option>Everyone</option>
              <option>All Instructors</option>
              <option>All Trainees</option>
              <option>All Staff</option>
              <option>Vendors</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              className="form-input"
              placeholder="Enter message subject line"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-input"
              rows={5}
              placeholder="Type your announcement here…"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 4,
              alignItems: "center",
            }}
          >
            <button className="btn btn-secondary" style={{ fontSize: 12 }}>
              <span className="material-symbols-outlined ms">attach_file</span>
              Add Attachment
            </button>
            <button className="btn btn-secondary" style={{ fontSize: 12 }}>
              <span className="material-symbols-outlined ms">
                schedule_send
              </span>
              Schedule
            </button>
            <button className="btn btn-primary" style={{ marginLeft: "auto" }}>
              <span className="material-symbols-outlined ms">send</span>Send
              Message
            </button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="white-card">
            <div className="card-title" style={{ fontSize: 12 }}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 15, color: "var(--primary)" }}
              >
                history
              </span>
              Last Broadcast
            </div>
            <div style={{ fontSize: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 4 }}>
                Safety Policy Update
              </div>
              <div style={{ color: "var(--muted)" }}>
                All Instructors · Just Now
              </div>
              <div style={{ marginTop: 6 }}>
                <Badge variant="green">Delivered</Badge>
              </div>
            </div>
          </div>
          <div className="white-card">
            <div className="card-title" style={{ fontSize: 12 }}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 15, color: "var(--primary)" }}
              >
                schedule
              </span>
              Scheduled
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              None Pending
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
              Last broadcast: 24 Oct
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
