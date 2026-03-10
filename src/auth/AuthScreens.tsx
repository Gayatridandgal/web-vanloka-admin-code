import React from "react";

const CardWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="auth-wrap">
    <div
      style={{
        background: "white",
        borderRadius: 22,
        width: 420,
        padding: 44,
        boxShadow:
          "0 24px 80px rgba(124,58,237,0.12),0 8px 32px rgba(0,0,0,0.07)",
      }}
    >
      {children}
    </div>
  </div>
);

/* ── Forgot Password ── */
export const ForgotScreen = ({
  onSend,
  onBack,
}: {
  onSend: () => void;
  onBack: () => void;
}) => (
  <CardWrap>
    <div
      style={{
        width: 56,
        height: 56,
        background: "var(--primary-light)",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <span
        className="material-symbols-outlined ms"
        style={{ color: "var(--primary)", fontSize: 26 }}
      >
        key
      </span>
    </div>
    <h2
      style={{
        fontSize: 21,
        fontWeight: 900,
        color: "var(--text)",
        marginBottom: 8,
      }}
    >
      Reset password
    </h2>
    <p
      style={{
        fontSize: 13,
        color: "var(--muted)",
        lineHeight: 1.6,
        marginBottom: 26,
      }}
    >
      Enter your registered email address and we'll send you a secure link to
      reset your password.
    </p>
    <div className="form-group">
      <label className="form-label">Email Address</label>
      <div className="form-input-icon">
        <span className="material-symbols-outlined ms">mail</span>
        <input
          className="form-input"
          type="email"
          placeholder="admin@organization.com"
        />
      </div>
    </div>
    <button
      className="btn btn-primary btn-full"
      style={{ marginBottom: 14 }}
      onClick={onSend}
    >
      <span className="material-symbols-outlined ms">send</span>Send Reset Link
    </button>
    <button className="btn btn-secondary btn-full" onClick={onBack}>
      <span className="material-symbols-outlined ms">arrow_back</span>Back to
      Login
    </button>
    <div
      style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>
        Having trouble? <a className="auth-link">Contact Support</a>
      </span>
    </div>
    <div className="auth-copyright">
      © 2024 FleetAdmin Organization • Secure Infrastructure
    </div>
  </CardWrap>
);

/* ── Reset Password ── */
export const ResetScreen = ({
  onUpdate,
  onBack,
}: {
  onUpdate: () => void;
  onBack: () => void;
}) => (
  <CardWrap>
    <div
      style={{
        width: 56,
        height: 56,
        background: "var(--primary-light)",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <span
        className="material-symbols-outlined ms"
        style={{ color: "var(--primary)", fontSize: 26 }}
      >
        lock_reset
      </span>
    </div>
    <h2
      style={{
        fontSize: 21,
        fontWeight: 900,
        color: "var(--text)",
        marginBottom: 8,
      }}
    >
      Set new password
    </h2>
    <p
      style={{
        fontSize: 13,
        color: "var(--muted)",
        lineHeight: 1.6,
        marginBottom: 26,
      }}
    >
      Your new password must be different from previously used passwords.
    </p>
    <div className="form-group">
      <label className="form-label">New Password</label>
      <div className="form-input-icon">
        <span className="material-symbols-outlined ms">lock</span>
        <input className="form-input" type="password" placeholder="••••••••" />
      </div>
    </div>
    <div className="form-group">
      <label className="form-label">Confirm New Password</label>
      <div className="form-input-icon">
        <span className="material-symbols-outlined ms">lock</span>
        <input className="form-input" type="password" placeholder="••••••••" />
      </div>
    </div>
    <div className="pw-req">
      <div className="pw-req-title">Password Requirements</div>
      <div className="pw-req-item met">
        <span className="material-symbols-outlined ms">check_circle</span>At
        least 8 characters long
      </div>
      <div className="pw-req-item">
        <span className="material-symbols-outlined ms">
          radio_button_unchecked
        </span>
        One special character (e.g. @, #, $)
      </div>
      <div className="pw-req-item">
        <span className="material-symbols-outlined ms">
          radio_button_unchecked
        </span>
        At least one number
      </div>
    </div>
    <button
      className="btn btn-primary btn-full"
      style={{ margin: "16px 0 10px" }}
      onClick={onUpdate}
    >
      <span className="material-symbols-outlined ms">check</span>Update Password
    </button>
    <button className="btn btn-secondary btn-full" onClick={onBack}>
      <span className="material-symbols-outlined ms">arrow_back</span>Back to
      Login
    </button>
    <div
      style={{
        marginTop: 16,
        textAlign: "center",
        fontSize: 11,
        color: "var(--muted)",
        fontWeight: 600,
      }}
    >
      Having trouble? <a className="auth-link">Contact Support</a>
    </div>
    <div className="auth-copyright">
      © 2024 FleetAdmin Organization • Secure Infrastructure
    </div>
  </CardWrap>
);

/* ── Password Success ── */
export const PasswordSuccessScreen = ({ onBack }: { onBack: () => void }) => (
  <CardWrap>
    <div style={{ textAlign: "center" }}>
      <div className="success-icon">
        <span className="material-symbols-outlined ms">check</span>
      </div>
      <h2
        style={{
          fontSize: 21,
          fontWeight: 900,
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        Password Updated!
      </h2>
      <p
        style={{
          fontSize: 13,
          color: "var(--muted)",
          lineHeight: 1.7,
          marginBottom: 28,
        }}
      >
        Your password has been changed successfully. You can now log in with
        your new credentials.
      </p>
      <button className="btn btn-primary btn-full" onClick={onBack}>
        <span className="material-symbols-outlined ms">login</span>Back to Login
      </button>
      <div className="auth-copyright">
        © 2024 FleetAdmin Organization • Secure Infrastructure
      </div>
    </div>
  </CardWrap>
);
