import { useState, useEffect, useRef } from "react";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput, QuickReplies } from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Heart, Star, Calendar, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TravelChatbot = ({ isOpen, onClose }: TravelChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialSuggestions = [
    "🎭 Festivals in Japan",
    "🎄 Christmas markets in Europe", 
    "🌸 Spring events in Asia",
    "🏖️ Summer festivals worldwide",
    "🍂 Fall celebrations",
    "🎊 New Year traditions"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: '1',
          content: "Hey there, fellow wanderer! ✈️ I'm Luna, your friendly travel companion. I'm here to help you discover amazing festivals, holidays, and cultural events from around the globe! What kind of adventure are you looking for?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse: Message;
      const userLower = userMessage.toLowerCase();

      if (userLower.includes('japan') || userLower.includes('japanese')) {
        botResponse = {
          id: Date.now().toString(),
          content: "🌸 Japan has incredible festivals! Here are some amazing options:",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);

        // Add event card
        setTimeout(() => {
          const eventMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: "",
            sender: 'bot',
            timestamp: new Date(),
            type: 'event',
            eventData: {
              title: "Cherry Blossom Festival (Hanami)",
              location: "Tokyo, Japan",
              date: "March 20 - May 10, 2024",
            }
          };
          setMessages(prev => [...prev, eventMessage]);

          setTimeout(() => {
            const followUp: Message = {
              id: (Date.now() + 2).toString(),
              content: "The cherry blossoms are absolutely magical! Would you like me to find more festivals in Japan or explore events in other countries? 🌎",
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, followUp]);
            setIsTyping(false);
          }, 1000);
        }, 1500);
      } else if (userLower.includes('europe') || userLower.includes('christmas')) {
        botResponse = {
          id: Date.now().toString(),
          content: "🎄 European Christmas markets are pure magic! Let me show you some enchanting options:",
          sender: 'bot',
          timestamp: new Date(),
          type: 'event',
          eventData: {
            title: "Christmas Markets",
            location: "Vienna, Austria",
            date: "November 15 - December 24, 2024",
          }
        };
        setMessages(prev => [...prev, botResponse]);

        setTimeout(() => {
          const followUp: Message = {
            id: (Date.now() + 1).toString(),
            content: "Vienna's Christmas markets are like stepping into a fairytale! Warm mulled wine, handcrafted gifts, and twinkling lights everywhere. Would you like to see more European destinations or explore different types of events? ✨",
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, followUp]);
          setIsTyping(false);
        }, 2000);
      } else if (userLower.includes('summer')) {
        botResponse = {
          id: Date.now().toString(),
          content: "☀️ Summer is festival season worldwide! Here's a vibrant celebration:",
          sender: 'bot',
          timestamp: new Date(),
          type: 'event',
          eventData: {
            title: "Edinburgh Fringe Festival",
            location: "Edinburgh, Scotland",
            date: "August 2-26, 2024",
          }
        };
        setMessages(prev => [...prev, botResponse]);

        setTimeout(() => {
          const followUp: Message = {
            id: (Date.now() + 1).toString(),
            content: "The world's largest arts festival! Thousands of performances, street art, and incredible energy. Perfect for culture lovers! Want to discover more summer festivals or explore a different season? 🎭",
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, followUp]);
          setIsTyping(false);
        }, 2000);
      } else {
        const responses = [
          "That sounds amazing! Let me help you find the perfect events for your adventure. What type of experience are you looking for? 🌟",
          "I love your curiosity! Tell me more about what interests you - festivals, traditional holidays, local celebrations, or cultural events? 🎊",
          "Wonderful! Every destination has unique celebrations. Are you thinking of a specific region or season? I can suggest some incredible experiences! 🗺️"
        ];
        
        botResponse = {
          id: Date.now().toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }
    }, 1500);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(content);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <Card className="w-full h-full flex flex-col shadow-travel animate-slide-up rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Luna Travel Assistant</h3>
              <p className="text-xs opacity-90">Your global event discovery companion</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/30">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <ChatMessage
              message={{
                id: 'typing',
                content: 'Luna is thinking',
                sender: 'bot',
                timestamp: new Date(),
              }}
              isTyping={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <QuickReplies
            suggestions={initialSuggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
        )}

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          placeholder="Ask about festivals, holidays, or events..."
        />
      </Card>
    </div>
  );
};