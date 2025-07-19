import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TravelChatbot } from "@/components/TravelChatbot";
import { Globe, MessageCircle, Star, Calendar, MapPin, Sparkles } from "lucide-react";
import travelHero from "@/assets/travel-hero.jpg";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Events",
      description: "Discover festivals and celebrations from every corner of the world"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Year-Round Discovery",
      description: "Find amazing events happening in any season, any time of year"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Local Insights",
      description: "Get authentic, culturally-rich recommendations from our AI travel companion"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Personalized",
      description: "Tailored suggestions based on your travel style and interests"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${travelHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-accent/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-secondary animate-bounce" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Discover the World
              </h1>
              <Sparkles className="w-8 h-8 text-secondary animate-bounce [animation-delay:0.5s]" />
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Your AI-powered companion for finding festivals, holidays, and cultural events across the globe
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setIsChatOpen(true)}
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6 animate-bounce-in"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Discovering Events
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
              >
                <Globe className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <Button
          onClick={() => setIsChatOpen(true)}
          variant="travel"
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-travel animate-bounce-in z-20"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat with Luna
        </Button>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Travel Discovery Platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the world through Luna, your intelligent travel companion who knows every celebration worth attending
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-travel transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-6 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let Luna guide you to unforgettable experiences around the world
          </p>
          <Button
            onClick={() => setIsChatOpen(true)}
            variant="secondary"
            size="lg"
            className="text-lg px-8 py-6"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Talk to Luna Now
          </Button>
        </div>
      </div>

      {/* Travel Chatbot */}
      <TravelChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default Index;
