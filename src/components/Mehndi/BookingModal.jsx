import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    serviceType: "",
    location: "",
    message: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, phone: value });
    if (value.length === 10) {
      validatePhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validatePhone(formData.phone)) {
        return;
      }
      console.log("[v0] Analytics: booking_initiated", formData);
      setStep(2);
    } else if (step === 2 && selectedSlot) {
      console.log("[v0] Analytics: booking_slot_selected", { ...formData, slot: selectedSlot });
      setIsConfirmed(true);
      console.log("[v0] Analytics: booking_completed", { ...formData, slot: selectedSlot });
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedSlot("");
    setIsConfirmed(false);
    setFormData({
      name: "",
      phone: "",
      date: "",
      serviceType: "",
      location: "",
      message: "",
    });
    setPhoneError("");
    onClose();
  };

  const handleAddToCalendar = () => {
    console.log("[v0] Analytics: add_to_calendar_clicked");
    // Calendar integration would go here
  };

  const handleWhatsAppShare = () => {
    const message = `🎉 *Booking Received!* 🎉

📋 *Booking Summary*
────────────────────
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📅 *Date:* ${formData.date}
⏰ *Time:* ${selectedSlot}
💅 *Service:* ${formData.serviceType}
📍 *Location:* ${formData.location}

Thank you for booking with *SilkenGlamour!*`;

    const whatsappURL = `https://wa.me/919266037001?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#FFF6E6] rounded-2xl shadow-2xl max-h-[70vh] overflow-y-auto scrollbar-hidden scollbar-hide">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#3E2B2A]/10 transition-colors z-10"
          aria-label="Close booking modal"
        >
          <svg
            className="w-5 h-5 text-[#3E2B2A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {!isConfirmed ? (
            <>
              <div className="mb-6">
                <h2 className="font-serif text-[32px] font-semibold text-[#3E2B2A] mb-2">
                  {step === 1 ? "Book Mehndi Slot" : "Select Your Slot"}
                </h2>
                <p className="text-base text-[#6b6560]">
                  {step === 1
                    ? "Fill in your details and we'll confirm within 1 hour"
                    : "Choose your preferred time slot"}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-[#6C0A12]" : "bg-[#e9e2da]"}`} />
                <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-[#6C0A12]" : "bg-[#e9e2da]"}`} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-[#3E2B2A]">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-md border border-[#e9e2da] bg-white text-[#3E2B2A]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-[#3E2B2A]">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full p-3 rounded-md border ${phoneError ? "border-[#E07A5F]" : "border-[#e9e2da]"
                          } bg-white text-[#3E2B2A]`}
                      />
                      {phoneError && <p className="text-sm text-[#E07A5F]">{phoneError}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium text-[#3E2B2A]">
                        Preferred Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-3 rounded-md border border-[#e9e2da] bg-white text-[#3E2B2A]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType" className="text-sm font-medium text-[#3E2B2A]">
                        Service Type *
                      </Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                        required
                      >
                        <SelectTrigger className="w-full p-3 rounded-md border border-[#e9e2da] bg-white text-[#3E2B2A]">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single Hand Mehndi">Single Hand Mehndi</SelectItem>
                          <SelectItem value="Both Hands Mehndi">Both Hands Mehndi</SelectItem>
                          <SelectItem value="Simple Mehndi">Simple Mehndi</SelectItem>
                          <SelectItem value="Bridal Mehndi">Bridal Mehndi</SelectItem>

                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium text-[#3E2B2A]">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-3 rounded-md border border-[#e9e2da] bg-white text-[#3E2B2A]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-[#3E2B2A]">
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 rounded-md border border-[#e9e2da] bg-white text-[#3E2B2A]"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM", "5:00 PM - 7:00 PM", "8:00 PM - 10:00 PM", "10:00 PM - 12:00 AM"].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${selectedSlot === slot
                          ? "border-[#6C0A12] bg-[#6C0A12]/5"
                          : "border-[#e9e2da] hover:border-[#6C0A12] hover:bg-[#6C0A12]/5"
                          }`}
                      >
                        <div className="font-semibold text-[#3E2B2A]">{slot}</div>
                        <div className="text-sm text-[#0B8A63]">Available</div>
                      </button>
                    ))}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={step === 2 && !selectedSlot}
                  className="w-full py-6 text-base font-semibold rounded-xl shadow-lg hover:scale-105 bg-gradient-to-r from-[#C69C3A] to-[#6C0A12] text-white border-0 disabled:opalocation-50"
                >
                  {step === 1 ? "Continue to Slot Selection" : "Confirm Booking"}
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-[#6b6560]">
                Change your slot up to 48 hours before without fees
              </p>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#0B8A63] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-serif text-[32px] font-semibold text-[#3E2B2A] mb-2">
                  Booking Received!
                </h2>
                <p className="text-base text-[#6b6560]">
                  Your request is received — we'll confirm in 1 hour via SMS & WhatsApp.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-6 shadow-md text-left space-y-3">
                <h3 className="font-semibold text-[#3E2B2A] mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b6560]">Name:</span>
                    <span className="font-medium text-[#3E2B2A]">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6560]">Phone:</span>
                    <span className="font-medium text-[#3E2B2A]">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6560]">Date:</span>
                    <span className="font-medium text-[#3E2B2A]">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6560]">Time:</span>
                    <span className="font-medium text-[#3E2B2A]">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6560]">Service:</span>
                    <span className="font-medium text-[#3E2B2A] capitalize">
                      {formData.serviceType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6560]">Location:</span>
                    <span className="font-medium text-[#3E2B2A]">{formData.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* <button
                  onClick={handleAddToCalendar}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm border-2 border-[#6C0A12] text-[#6C0A12] hover:bg-[#6C0A12] hover:text-white transition-all"
                >
                  Add to Calendar
                </button> */}
                <button
                  onClick={handleWhatsAppShare}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Share to WhatsApp
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-[#6b6560] hover:text-[#3E2B2A] transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
