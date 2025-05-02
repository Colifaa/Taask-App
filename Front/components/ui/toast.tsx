// Front/components/ui/toast.tsx
import * as React from "react";

export type ToastProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export type ToastActionElement = React.ReactElement;

export const Toast: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  action,
  variant = "default",
}) => {
  // Aquí puedes poner tu UI real, esto es solo un ejemplo básico
  return open ? (
    <div className={`toast ${variant === "destructive" ? "toast-destructive" : ""}`}>
      {title && <div className="toast-title">{title}</div>}
      {description && <div className="toast-description">{description}</div>}
      {action && <div className="toast-action">{action}</div>}
      <button onClick={() => onOpenChange && onOpenChange(false)}>Cerrar</button>
    </div>
  ) : null;
};