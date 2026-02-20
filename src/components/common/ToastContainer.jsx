import { useToast } from "../../contexts/ToastContext";

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div style={containerStyle}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const config = getToastConfig(toast.type);

  return (
    <div style={{ ...toastStyle, ...config.style }}>
      <span style={iconStyle}>{config.icon}</span>
      <span style={messageStyle}>{toast.message}</span>
      <button onClick={onClose} style={closeButtonStyle}>
        ✕
      </button>
    </div>
  );
}

function getToastConfig(type) {
  switch (type) {
    case "success":
      return {
        icon: "✅",
        style: {
          backgroundColor: "#d4edda",
          color: "#155724",
          borderLeft: "4px solid #28a745",
        },
      };
    case "error":
      return {
        icon: "❌",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderLeft: "4px solid #dc3545",
        },
      };
    case "warning":
      return {
        icon: "⚠️",
        style: {
          backgroundColor: "#fff3cd",
          color: "#856404",
          borderLeft: "4px solid #ffc107",
        },
      };
    case "info":
    default:
      return {
        icon: "ℹ️",
        style: {
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
          borderLeft: "4px solid #17a2b8",
        },
      };
  }
}

const containerStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "400px",
};

const toastStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  animation: "slideIn 0.3s ease-out",
  minWidth: "300px",
};

const iconStyle = {
  fontSize: "20px",
  flexShrink: 0,
};

const messageStyle = {
  flex: 1,
  fontSize: "14px",
  fontWeight: "500",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  padding: "0",
  opacity: 0.6,
  transition: "opacity 0.2s",
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(styleSheet);

export default ToastContainer;
