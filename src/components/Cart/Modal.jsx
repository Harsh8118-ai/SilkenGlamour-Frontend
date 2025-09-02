import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X } from 'lucide-react'; // or use ❌ if no icon library

const Modal = ({
  isOpen,
  title,
  onConfirm,
  onClose,
  appointmentDate,
  setAppointmentDate,
  appointmentSlot,
  setAppointmentSlot
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
      <div className="bg-LightBGColor p-4 rounded-lg shadow-lg w-full max-w-md relative">

        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X className="w-5 h-5 text-red-600  hover:text-red-500" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold text-center text-[#6B3F1D] mb-4">
          {title}
        </h2>

        {/* Appointment Form */}
        <div className="space-y-4 text-sm text-BGColorYellow font-medium">

          {/* Date Picker */}
          {/* Date Picker Section */}
          <div className="mb-4">
            <label className="block text-sm text-BGColorYellow font-medium mb-2">Select Date</label>
            <div className="border border-[#F4C98D] rounded-md p-2 bg-LightBGColor">
              <DatePicker
                selected={appointmentDate}
                onChange={(date) => setAppointmentDate(date)}
                minDate={new Date()}
                inline
                calendarClassName="custom-datepicker"
              />
            </div>
          </div>

          {/* Time Slot Dropdown */}
          <div className="mb-4">
            <label className="block text-sm text-BGColorYellow font-medium mb-2">Select Time</label>
            <select
              value={appointmentSlot}
              onChange={e => setAppointmentSlot(e.target.value)}
              className="w-full border-2 border-BGColorYellow rounded-md px-3 py-2 text-sm bg-white focus:outline-none"
            >
              <option value="">Choose time slot</option>
              {[
                '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM',
                '02:00 PM', '03:00 PM', '05:00 PM', '06:00 PM',
              ].map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-6"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default Modal;
