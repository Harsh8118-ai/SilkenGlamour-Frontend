export function TextArea({ className, ...props }) {
    return (
      <textarea
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-600 ${className}`}
        {...props}
      />
    );
  }
  