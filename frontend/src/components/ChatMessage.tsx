import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plane, User } from "lucide-react";

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'event' | 'suggestion';
  eventData?: {
    title: string;
    location: string;
    date: string;
    image?: string;
  };
}

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isTyping }: ChatMessageProps) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-fade-in",
      !isBot && "flex-row-reverse"
    )}>
      <Avatar className={cn(
        "w-8 h-8 shrink-0",
        isBot ? "bg-gradient-primary" : "bg-gradient-sunset"
      )}>
        <AvatarFallback className="text-white">
          {isBot ? <Plane className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-chat",
        isBot 
          ? "bg-white text-foreground rounded-tl-sm" 
          : "bg-gradient-primary text-primary-foreground rounded-tr-sm"
      )}>
        {message.type === 'event' && message.eventData ? (
          <EventCard event={message.eventData} />
        ) : (
          <div className="relative">
            {isTyping ? (
              <div className="flex items-center gap-2">
                <span>{message.content}</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{message.content}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Message['eventData'] }) => {
  if (!event) return null;

  return (
    <div className="bg-gradient-to-br from-primary-glow/10 to-accent/10 rounded-lg p-3 border border-primary/20">
      <h4 className="font-semibold text-primary mb-1">{event.title}</h4>
      <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
      <p className="text-xs text-accent font-medium">{event.date}</p>
    </div>
  );
};