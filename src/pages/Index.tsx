import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Scissors, Sparkles, Clock, Star, Calendar, User } from "lucide-react";
import heroImage from "@/assets/hero-barbershop.jpg";
import haircutImage from "@/assets/service-haircut.jpg";
import beardImage from "@/assets/service-beard.jpg";
import shaveImage from "@/assets/service-shave.jpg";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const services = [
    {
      title: "Premium Haircut",
      price: "Rp 150.000",
      image: haircutImage,
      description: "Precision cut styled to perfection",
    },
    {
      title: "Beard Grooming",
      price: "Rp 100.000",
      image: beardImage,
      description: "Expert beard shaping and styling",
    },
    {
      title: "Hot Towel Shave",
      price: "Rp 120.000",
      image: shaveImage,
      description: "Traditional luxury shave experience",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Elite Cuts
            </span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth">
              Home
            </Link>
            <Link to="/barbers" className="text-foreground hover:text-primary transition-smooth">
              Our Barbers
            </Link>
            <Link to="/ai-consultant" className="text-foreground hover:text-primary transition-smooth flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Style Assistant
            </Link>
            <Link to="/booking">
              <Button variant="hero" size="lg">
                <Calendar className="h-5 w-5" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Elite Cuts Barbershop"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where Style Meets
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience premium grooming with our expert barbers. Book your appointment today and discover the Elite Cuts difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  <Calendar className="h-6 w-6" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/ai-consultant">
                <Button variant="premium" size="lg" className="text-lg px-8 py-6">
                  <Sparkles className="h-6 w-6" />
                  Try AI Style Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary transition-smooth">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Schedule your appointment online in seconds. Choose your preferred time and barber.
              </p>
            </Card>
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary transition-smooth">
              <Star className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Barbers</h3>
              <p className="text-muted-foreground">
                Our skilled professionals deliver precision cuts and exceptional service every time.
              </p>
            </Card>
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary transition-smooth">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-Powered Style</h3>
              <p className="text-muted-foreground">
                Get personalized hairstyle recommendations using our advanced AI technology.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-xl text-muted-foreground">
              Choose from our range of professional grooming services
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="overflow-hidden bg-gradient-card border-primary/20 hover:border-primary hover:shadow-glow transition-smooth group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link to="/booking">
                    <Button variant="outline" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for a Fresh Look?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust Elite Cuts for their grooming needs
          </p>
          <Link to="/booking">
            <Button variant="hero" size="lg" className="text-xl px-12 py-8">
              <Calendar className="h-6 w-6" />
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Elite Cuts. Premium Barbershop Experience.</p>
        </div>
      </footer>

      <ChatBot page="home" />
    </div>
  );
};

export default Index;
