
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, Send, ThumbsUp, ThumbsDown, Share2, 
  Mic, MicOff, Video, VideoOff, Volume2, VolumeX 
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'clone';
  timestamp: Date;
  feedback?: 'positive' | 'negative' | null;
}

const CloneChat = () => {
  const { cloneId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm Sarah's digital clone. I'm here to help with life coaching, motivation, and personal development. What would you like to talk about today?",
      sender: 'clone',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock clone data - in real app, fetch based on cloneId
  const cloneData = {
    name: "Sarah Chen",
    title: "Life Coach & Motivational Speaker",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    bio: "Helping thousands transform their lives through proven coaching methodologies",
    totalConversations: "10K+",
    rating: 4.9,
    specialties: ["Goal Setting", "Motivation", "Habit Building", "Career Growth"]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on my experience helping others, I'd suggest starting with small, manageable steps. What specific area would you like to focus on first?",
        "I understand how challenging that can feel. Many of my clients have faced similar situations. Here's what I've found works best...",
        "Absolutely! This is something I'm passionate about helping people with. Let me share a strategy that has worked for thousands of my clients.",
        "I can definitely help you with that. The key is to approach this systematically. First, let's identify what's been holding you back so far.",
        "That's such an important realization! Self-awareness is the first step toward meaningful change. Here's how we can build on that..."
      ];

      const cloneResponse: Message = {
        id: messages.length + 2,
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'clone',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, cloneResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFeedback = (messageId: number, feedback: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: msg.feedback === feedback ? null : feedback }
          : msg
      )
    );
    
    toast({
      title: "Feedback recorded",
      description: "Thank you for helping improve the clone's responses!",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this clone with others.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/discover">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={cloneData.avatar} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold">{cloneData.name}</h1>
                  <p className="text-sm text-muted-foreground">{cloneData.title}</p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  ⭐ {cloneData.rating}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={isVoiceMode ? "bg-primary text-primary-foreground" : ""}
              >
                {isVoiceMode ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsVideoMode(!isVideoMode)}
                className={isVideoMode ? "bg-primary text-primary-foreground" : ""}
              >
                {isVideoMode ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Clone Info */}
      <div className="border-b bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              {cloneData.bio} • {cloneData.totalConversations} conversations
            </p>
            <div className="flex flex-wrap gap-2">
              {cloneData.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4 py-6 h-full">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-sm lg:max-w-md ${
                    message.sender === 'user' 
                      ? 'chat-bubble-user' 
                      : 'chat-bubble-clone'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.sender === 'clone' && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-current/10">
                        <span className="text-xs opacity-70">Was this helpful?</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className={`p-1 h-auto ${
                            message.feedback === 'positive' ? 'bg-success/20' : ''
                          }`}
                          onClick={() => handleFeedback(message.id, 'positive')}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className={`p-1 h-auto ${
                            message.feedback === 'negative' ? 'bg-destructive/20' : ''
                          }`}
                          onClick={() => handleFeedback(message.id, 'negative')}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="chat-bubble-clone">
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm opacity-70 ml-2">typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything about life coaching, motivation, goals..."
                  className="flex-1 min-h-[44px]"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-primary hover:bg-secondary text-primary-foreground px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                <span>Powered by DigiClone AI</span>
                <span>•</span>
                <span>Response time: ~2s</span>
                <span>•</span>
                <button className="hover:text-primary transition-colors">
                  Report issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video/Voice Mode Placeholder */}
      {(isVideoMode || isVoiceMode) && (
        <Card className="fixed bottom-20 right-4 w-80 shadow-lg">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                {isVideoMode ? <Video className="h-8 w-8 text-primary" /> : <Mic className="h-8 w-8 text-primary" />}
              </div>
              <div>
                <h4 className="font-semibold">
                  {isVideoMode ? 'Video Mode' : 'Voice Mode'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Coming soon! This feature will allow {isVideoMode ? 'video' : 'voice'} conversations with your clone.
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setIsVideoMode(false);
                  setIsVoiceMode(false);
                }}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CloneChat;
