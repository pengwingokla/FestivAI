import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Ask me about festivals, holidays, or events anywhere..." 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white border-t border-border">
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10 rounded-full border-primary/20 focus-visible:ring-primary/30 focus-visible:border-primary"
        />
        <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        variant="travel"
        size="icon"
        className="rounded-full w-10 h-10 shrink-0"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

interface QuickReplyProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  className?: string;
}

export const QuickReplies = ({ suggestions, onSelectSuggestion, className }: QuickReplyProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2 p-4 pt-0", className)}>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelectSuggestion(suggestion)}
          className="rounded-full text-xs hover:bg-primary/10 hover:border-primary hover:text-primary transition-smooth"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};