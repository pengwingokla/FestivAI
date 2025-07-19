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
            text: `Hi there! 👋 I'm your AI travel assistant, excited to help you plan your trip to ${festival.name} in ${festival.location}! I can help you with flights, accommodations, weather info, and creating the perfect itinerary. What would you like to know first?`,
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
      if (e.key === 'Escape' && isOpen) {
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
    setTimeout(() => {
      let aiResponse = "";
      
      if (userMessage.toLowerCase().includes("flight") || userMessage.toLowerCase().includes("fly")) {
        aiResponse = `Great! I found several flight options to ${festival.location}:
✈️ **Option 1:** Direct flight - $850 (8h 30m)
✈️ **Option 2:** 1 stop - $650 (12h 15m)
✈️ **Option 3:** Budget option - $450 (18h 45m)

Would you like me to check availability and help you book any of these options?`;
      } else if (userMessage.toLowerCase().includes("weather")) {
        aiResponse = `Here's the weather forecast for ${festival.name} in ${festival.location}:
🌤️ **Expected Temperature:** 18-24°C (64-75°F)
☀️ **Conditions:** Partly cloudy with occasional sunshine
🌧️ **Precipitation:** 20% chance of light rain
💨 **Wind:** Light breeze, 10-15 km/h
👕 **What to Pack:** Light layers, comfortable shoes, light rain jacket

Perfect weather for outdoor festival activities!`;
      } else if (userMessage.toLowerCase().includes("hotel") || userMessage.toLowerCase().includes("accommodation")) {
        aiResponse = `I've found some great accommodation options near ${festival.name}:
🏨 **Luxury Option:** Grand Festival Hotel - $200/night (0.5km from venue)
🏨 **Mid-range:** City Center Inn - $120/night (1.2km from venue)
🏨 **Budget:** Backpacker's Lodge - $45/night (2km from venue)

All options include breakfast and are highly rated by festival-goers!`;
      } else if (userMessage.toLowerCase().includes("visa") || userMessage.toLowerCase().includes("requirement")) {
        aiResponse = `For traveling to ${festival.location}, here are the entry requirements:
📋 **Visa Requirements:** Tourist visa required (can be obtained online)
📄 **Documents:** Valid passport (6+ months remaining)
💉 **Health:** No special vaccinations required
💰 **Duration:** Up to 30 days tourist stay
⏰ **Processing:** 3-5 business days for e-visa

I can help you with the application process if needed!`;
      } else {
        aiResponse = `That's a great question about ${festival.name}! Let me help you with that. The festival is known for ${festival.highlights.join(", ").toLowerCase()} and offers an incredible cultural experience. 

Would you like me to provide more specific information about flights, accommodations, weather conditions, or help you create a detailed itinerary?`;
      }
      
      addMessage(aiResponse, true);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = async (action: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let response = "";
      
      switch (action) {
        case "flights":
          response = `🛫 **Flight Search Results for ${festival.location}:**

✈️ **Direct flights:** $850-1,200 (8-10 hours)
✈️ **1-stop flights:** $650-950 (12-16 hours)  
✈️ **Budget options:** $450-650 (18-24 hours)

**Best deals departing:** 3 days before festival
**Return flights:** Up to 40% cheaper midweek
**Airlines:** Major carriers with good reviews

Would you like me to check specific dates or help with booking?`;
          break;
          
        case "hotels":
          response = `🏨 **Accommodation Recommendations near ${festival.name}:**

🌟 **Premium (0-1km):** $180-300/night
- Festival View Hotel ⭐⭐⭐⭐⭐
- Cultural Heritage Inn ⭐⭐⭐⭐⭐

🏙️ **Mid-range (1-3km):** $80-150/night  
- City Plaza Hotel ⭐⭐⭐⭐
- Modern Comfort Suites ⭐⭐⭐⭐

💰 **Budget (3-5km):** $25-60/night
- Traveler's Hostel ⭐⭐⭐
- Local Guest House ⭐⭐⭐

All include free WiFi and breakfast! Which price range interests you?`;
          break;
          
        case "weather":
          response = `🌤️ **Weather Forecast for ${festival.name}:**

📅 **Festival Dates:** ${festival.date}
🌡️ **Temperature:** 18-24°C (64-75°F)
☀️ **Conditions:** Partly cloudy with sunshine
🌧️ **Rain Chance:** 20% (brief showers possible)
💨 **Wind:** Light breeze, perfect for outdoor events

👕 **Packing Recommendations:**
- Light layers (t-shirt + light jacket)
- Comfortable walking shoes
- Light rain jacket/umbrella
- Sun hat and sunscreen
- Camera for amazing photos!

Perfect festival weather! 🎉`;
          break;
          
        case "itinerary":
          response = `📅 **Your ${festival.name} Itinerary:**

🛫 **Day 1 - Arrival:**
- Land in ${festival.location}
- Check into hotel
- Explore local neighborhood
- Early dinner and rest

🎉 **Day 2-3 - Festival Days:**
- ${festival.highlights[0]}
- ${festival.highlights[1]} 
- ${festival.highlights[2]}
- Evening cultural shows

✈️ **Day 4 - Departure:**
- Morning souvenir shopping
- Local cuisine experience
- Departure

Would you like me to add specific times, restaurant recommendations, or extend your stay?`;
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
              <p className="text-white/90">Planning your trip to {festival.name} in {festival.location}</p>
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