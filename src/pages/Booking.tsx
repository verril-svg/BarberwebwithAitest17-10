import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { Scissors, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import ChatBot from "@/components/ChatBot";

const barbers = [
  { id: 1, name: "Marcus Chen", specialty: "Classic & Modern Cuts", avatar: "👨‍🦱" },
  { id: 2, name: "David Rodriguez", specialty: "Beard Specialist", avatar: "👨‍🦲" },
  { id: 3, name: "Alex Thompson", specialty: "Fade Expert", avatar: "👨‍🦰" },
];

const services = [
  { id: 1, name: "Premium Haircut", duration: "45 min", price: "Rp 150.000" },
  { id: 2, name: "Beard Grooming", duration: "30 min", price: "Rp 100.000" },
  { id: 3, name: "Hot Towel Shave", duration: "40 min", price: "Rp 120.000" },
  { id: 4, name: "Haircut + Beard", duration: "60 min", price: "Rp 220.000" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBooking = () => {
    if (!selectedBarber || !selectedService || !selectedTime || !date) {
      toast.error("Please complete all booking details");
      return;
    }
    
    const barber = barbers.find(b => b.id === selectedBarber);
    const service = services.find(s => s.id === selectedService);
    
    toast.success(
      `Booking confirmed with ${barber?.name} for ${service?.name} at ${selectedTime}`,
      { duration: 5000 }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Elite Cuts
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">Book Your Appointment</h1>
          <p className="text-muted-foreground text-center mb-12">
            Choose your preferred service, barber, and time
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Service Selection */}
              <Card className="p-6 bg-gradient-card border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Select Service</h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-smooth ${
                        selectedService === service.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{service.price}</p>
                          {selectedService === service.id && (
                            <Check className="h-5 w-5 text-primary ml-auto" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Barber Selection */}
              <Card className="p-6 bg-gradient-card border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Choose Your Barber</h2>
                <div className="space-y-3">
                  {barbers.map((barber) => (
                    <button
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-smooth ${
                        selectedBarber === barber.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{barber.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-bold">{barber.name}</h3>
                          <p className="text-sm text-muted-foreground">{barber.specialty}</p>
                        </div>
                        {selectedBarber === barber.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Date Selection */}
              <Card className="p-6 bg-gradient-card border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border border-border"
                />
              </Card>

              {/* Time Selection */}
              <Card className="p-6 bg-gradient-card border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Available Times</h2>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 font-medium transition-smooth ${
                        selectedTime === time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Confirm Button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full text-lg py-6"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ChatBot page="booking" />
    </div>
  );
};

export default Booking;
