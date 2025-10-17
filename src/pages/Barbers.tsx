import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Scissors, ArrowLeft, Star, Calendar } from "lucide-react";
import ChatBot from "@/components/ChatBot";

const barbers = [
  {
    id: 1,
    name: "Marcus Chen",
    specialty: "Classic & Modern Cuts",
    experience: "8 years",
    avatar: "👨‍🦱",
    rating: 4.9,
    reviews: 234,
    bio: "Specialized in contemporary and traditional styles. Marcus brings precision and artistry to every cut.",
  },
  {
    id: 2,
    name: "David Rodriguez",
    specialty: "Beard Specialist",
    experience: "6 years",
    avatar: "👨‍🦲",
    rating: 4.8,
    reviews: 189,
    bio: "Master of beard grooming and shaping. David creates perfectly sculpted looks for every face shape.",
  },
  {
    id: 3,
    name: "Alex Thompson",
    specialty: "Fade Expert",
    experience: "10 years",
    avatar: "👨‍🦰",
    rating: 5.0,
    reviews: 312,
    bio: "Award-winning fade specialist. Alex delivers flawless transitions and clean lines every time.",
  },
];

const Barbers = () => {
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Meet Our Expert Barbers</h1>
            <p className="text-xl text-muted-foreground">
              Experienced professionals dedicated to your style
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {barbers.map((barber) => (
              <Card
                key={barber.id}
                className="p-6 bg-gradient-card border-primary/20 hover:border-primary hover:shadow-glow transition-smooth"
              >
                <div className="text-center mb-4">
                  <div className="text-7xl mb-4">{barber.avatar}</div>
                  <h2 className="text-2xl font-bold mb-1">{barber.name}</h2>
                  <p className="text-primary font-medium">{barber.specialty}</p>
                  <p className="text-sm text-muted-foreground">{barber.experience} experience</p>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(barber.rating)
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {barber.rating} ({barber.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-6 text-center">
                  {barber.bio}
                </p>

                <Link to="/booking">
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4" />
                    Book with {barber.name.split(" ")[0]}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ChatBot page="barbers" />
    </div>
  );
};

export default Barbers;
