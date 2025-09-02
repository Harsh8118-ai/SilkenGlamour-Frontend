;

export function PopularServicesChart() {
  const services = [
    { name: "Facial", bookings: 45, color: "bg-amber-500" },
    { name: "Waxing", bookings: 38, color: "bg-orange-500" },
    { name: "Makeup", bookings: 32, color: "bg-yellow-500" },
    { name: "Hair Care", bookings: 28, color: "bg-red-500" },
    { name: "Massage", bookings: 22, color: "bg-pink-500" },
  ];

  const maxBookings = Math.max(...services.map((s) => s.bookings));

  return (
    <div className="space-y-3">
      {services.map((service, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-20 text-sm font-medium text-amber-900">{service.name}</div>
          <div className="flex-1 bg-amber-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${service.color} transition-all duration-500 ease-out`}
              style={{ width: `${(service.bookings / maxBookings) * 100}%` }}
            />
          </div>
          <div className="w-8 text-sm text-amber-700">{service.bookings}</div>
        </div>
      ))}
    </div>
  );
}
