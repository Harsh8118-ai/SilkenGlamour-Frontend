// components/ui/textarea.jsx
import React from "react";

export const Textarea = ({ label, placeholder, value, onChange, rows = 4 }) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 text-sm resize-none"
      />
    </div>
  );
};
