// components/ui/dialog.jsx
import React from "react";
import { X } from "lucide-react";

// Main wrapper
export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => (
  <div className="pt-4">{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);
