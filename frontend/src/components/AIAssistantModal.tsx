import { useState, useRef, useEffect } from "react";
import { X, Send, Plane, Hotel, CloudSun, Calendar } from "lucide-react";
import { Festival } from "@/data/festivals";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
}

interface AIAssistantModalProps {
  festival: Festival;
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal = ({ festival, isOpen, onClose }: AIAssistantModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial AI greeting
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            text: `Hello 👋 I'm FestivAI travel assistant, excited to help you plan your trip to ${festival.name} in ${festival.country}! I can help you with flights, accommodations, and weather info. What would you like to know first?`,
            isAI: true,
            timestamp: new Date()
          }
        ]);
      }, 500);
    }
  }, [isOpen, festival, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const addMessage = (text: string, isAI: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAI,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue("");
    addMessage(userMessage, false);
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(async () => {
      let aiResponse = "";
      
      if (userMessage.toLowerCase().includes("flight") || userMessage.toLowerCase().includes("fly")) {
        try {
          let destination = `${festival.city}-${festival.country}`;
          if (festival.state) destination = `${festival.city}-${festival.state}`;
          const res = await fetch(`http://127.0.0.1:8080/api/get-flights-full-response/${destination}`);
          const data = await res.json();

          if (data.response) {
            aiResponse = data.response;
          } else {
            aiResponse = `Sorry, I couldn't find any flight details to ${festival.city}, ${festival.country} right now.`;
          }
        } catch (error) {
          aiResponse = "Oops! Something went wrong while fetching flight info.";
          console.error("Flight fetch error:", error);
        }
      } 
      else if (userMessage.toLowerCase().includes("weather") || userMessage.toLowerCase().includes("forecast")) {
        try {
          const res = await fetch(`http://127.0.0.1:8080/api/get-weather-full-response/${festival.city.toLowerCase()}`);
          const data = await res.json();

          if (data.response) {
            aiResponse = data.response;
          } else {
            aiResponse = `Sorry, I couldn't find any weather details to ${festival.city} right now.`;
          }
        } catch (error) {
          aiResponse = "Oops! Something went wrong while fetching weather info.";
          console.error("Flight fetch error:", error);
        }
      }
      else if (userMessage.toLowerCase().includes("hotel") || userMessage.toLowerCase().includes("accommodation")) {
        aiResponse = `Feature not available yet.`;
      } else if (userMessage.toLowerCase().includes("visa") || userMessage.toLowerCase().includes("requirement")) {
        aiResponse = `Feature not available yet.`;
      } else {
        aiResponse = `That's a great question about ${festival.name}! The festival is known for ${festival.highlights.join(", ").toLowerCase()} and offers an incredible cultural experience. Would you like me to provide more specific information about flights, accommodations, weather conditions, or help you create a detailed itinerary?`;
      }
      
      addMessage(aiResponse, true);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = async (action: string) => {
    setIsLoading(true);
    
    setTimeout(async () => {
      let response = "";
      
      switch (action) {
        case "flights":
          try {
            let destination = `${festival.city}-${festival.country}`;
            if (festival.state) destination = `${festival.city}-${festival.state}`;
            const res = await fetch(`http://127.0.0.1:8080/api/get-flights-full-response/${destination}`);
            const data = await res.json();

            if (data.response) {
              response = data.response;
            } else {
              response = `Sorry, I couldn't find any flight details to ${festival.city}, ${festival.country} right now.`;
            }
          } catch (error) {
            response = "Oops! Something went wrong while fetching flight info.";
            console.error("Flight fetch error:", error);
          }
          break;
          
        case "hotels":
          // Scale in the future
          break;
          
        case "weather":
          try {
            const res = await fetch(`http://127.0.0.1:8080/api/get-weather-full-response/${festival.city}`);
            const data = await res.json();

            if (data.response) {
              response = data.response;
            } else {
              response = `Sorry, I couldn't find any flight details to ${festival.city} right now.`;
            }
          } catch (error) {
            response = "Oops! Something went wrong while fetching flight info.";
            console.error("Flight fetch error:", error);
          }
          break;
          
        case "itinerary":
          // Scale in the future
          break;
      }
      
      addMessage(response, true);
      setIsLoading(false);
    }, 1200 + Math.random() * 800);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header - Fixed at Top */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Travel Assistant</h2>
              <p className="text-white/90">Planning your trip to {festival.name} in {festival.country}</p>
            </div>
          </div>
        </div>

        {/* Content Area - Horizontal Layout */}
        <div className="flex-1 flex gap-6 overflow-hidden p-6">
          {/* Left Side - Chat and Input */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Container - Scrollable Only */}
            <div className="flex-1 overflow-y-auto bg-muted/30 rounded-2xl p-4 mb-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={message.isAI ? 'ai-message' : 'user-message'}>
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="ai-message">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input - Fixed at Bottom */}
            <div className="border-t pt-4 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about your trip..."
                  className="flex-1 px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 py-3 rounded-2xl"
                >
                  <Send size={20} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Try asking: "What's the weather like?" or "Any visa requirements?" or "Best time to arrive?"
              </p>
            </div>
          </div>

          {/* Right Side - Quick Actions */}
          <div className="w-80 flex flex-col gap-3 flex-shrink-0">
            <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
            <Button
              variant="outline"
              className="justify-start h-auto p-4 text-left"
              onClick={() => handleQuickAction('flights')}
              disabled={isLoading}
            >
              <Plane className="mr-3 text-blue-500" size={20} />
              <div>
                <div className="font-medium">Find Flights</div>
                <div className="text-sm text-muted-foreground">Search and compare options</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="justify-start h-auto p-4 text-left"
              onClick={() => handleQuickAction('hotels')}
              disabled={isLoading}
            >
              <Hotel className="mr-3 text-green-500" size={20} />
              <div>
                <div className="font-medium">Book Hotels</div>
                <div className="text-sm text-muted-foreground">Accommodation near venue</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="justify-start h-auto p-4 text-left"
              onClick={() => handleQuickAction('weather')}
              disabled={isLoading}
            >
              <CloudSun className="mr-3 text-orange-500" size={20} />
              <div>
                <div className="font-medium">Weather Conditions</div>
                <div className="text-sm text-muted-foreground">Forecast and packing tips</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="justify-start h-auto p-4 text-left"
              onClick={() => handleQuickAction('itinerary')}
              disabled={isLoading}
            >
              <Calendar className="mr-3 text-purple-500" size={20} />
              <div>
                <div className="font-medium">Create Itinerary</div>
                <div className="text-sm text-muted-foreground">Complete trip planning assistance</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};