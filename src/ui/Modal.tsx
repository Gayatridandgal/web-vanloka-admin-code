import React from "react";
import { Icon } from "./index";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "sm" | "md";
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  title,
  size = "md",
  footer,
  children,
}: ModalProps) => (
  <div
    className={`modal-backdrop ${open ? "open" : ""}`}
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className={size === "sm" ? "modal-box-sm" : "modal-box"}>
      <div className="modal-head">
        <div className="modal-title">{title}</div>
        <button className="modal-close" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <div className="modal-body">{children}</div>
      {footer && <div className="modal-footer">{footer}</div>}
    </div>
  </div>
);
