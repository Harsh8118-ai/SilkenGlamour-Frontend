// src/components/ui/card.jsx
import React from "react"

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-200 shadow p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-2 font-semibold text-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h2 className={`text-lg font-bold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
}
