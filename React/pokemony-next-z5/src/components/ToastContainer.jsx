import { useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function ToastContainer({ toasts, removeToast }) {
  return createPortal(
    <>
      <div className="fixed right-4 bottom-22 z-50 flex flex-col gap-3 items-end">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </>,
    document.getElementById("toast-root")
  );
}
