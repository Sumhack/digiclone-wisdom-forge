
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Brain, Upload, FileText, Video, Link as LinkIcon, Trash2, 
  Settings, MessageCircle, TrendingUp, Users, Clock, 
  ThumbsUp, ThumbsDown, Edit, Play, Pause 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Dashboard = () => {
  const [cloneStatus, setCloneStatus] = useState<'training' | 'live' | 'draft'>('training');
  const [trainingProgress, setTrainingProgress] = useState(75);
  const [uploadedSources, setUploadedSources] = useState([
    { id: 1, name: "My Coaching Philosophy.pdf", type: "PDF", date: "2024-01-15" },
    { id: 2, name: "Leadership Masterclass Video", type: "YouTube", date: "2024-01-14" },
    { id: 3, name: "Success Principles Blog", type: "URL", date: "2024-01-13" },
  ]);
  
  const { toast } = useToast();

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.txt,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newSource = {
          id: uploadedSources.length + 1,
          name: file.name,
          type: "PDF",
          date: new Date().toISOString().split('T')[0]
        };
        setUploadedSources([...uploadedSources, newSource]);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been added to your knowledge base.`,
        });
      }
    };
    input.click();
  };

  const handleDeleteSource = (id: number) => {
    setUploadedSources(uploadedSources.filter(source => source.id !== id));
    toast({
      title: "Source removed",
      description: "The source has been removed from your knowledge base.",
    });
  };

  const statusColors = {
    training: "bg-yellow-500",
    live: "bg-green-500",
    draft: "bg-gray-500"
  };

  const statusTexts = {
    training: "Training in Progress",
    live: "Live & Active",
    draft: "Draft Mode"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-serif font-bold">Welcome back, Sarah!</h1>
                <p className="text-muted-foreground">Life Coach & Motivational Speaker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge 
                className={`${statusColors[cloneStatus]} text-white px-3 py-1`}
              >
                {statusTexts[cloneStatus]}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-muted-foreground">Total Conversations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">342</p>
                    <p className="text-sm text-muted-foreground">Unique Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-2xl font-bold">8.5m</p>
                    <p className="text-sm text-muted-foreground">Avg. Chat Duration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-muted-foreground">Positive Feedback</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="knowledge" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="personality">Clone Personality</TabsTrigger>
            <TabsTrigger value="training">Training Status</TabsTrigger>
            <TabsTrigger value="preview">Preview & Test</TabsTrigger>
          </TabsList>

          {/* Knowledge Upload Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Knowledge Sources</CardTitle>
                <CardDescription>
                  Upload documents, add URLs, or paste content to train your clone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Options */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors" onClick={handleFileUpload}>
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Upload Documents</h4>
                      <p className="text-sm text-muted-foreground">PDF, TXT, DOC files</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                      <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">YouTube Videos</h4>
                      <p className="text-sm text-muted-foreground">Paste video URLs</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                      <LinkIcon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Website Content</h4>
                      <p className="text-sm text-muted-foreground">Blogs, articles, pages</p>
                    </CardContent>
                  </Card>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <Label>Add URL</Label>
                  <div className="flex gap-2">
                    <Input placeholder="https://example.com/your-content" />
                    <Button>Add URL</Button>
                  </div>
                </div>

                {/* Uploaded Sources Table */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Uploaded Sources ({uploadedSources.length})</h4>
                  <div className="space-y-2">
                    {uploadedSources.map((source) => (
                      <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{source.name}</p>
                            <p className="text-sm text-muted-foreground">{source.type} • {source.date}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteSource(source.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personality Setup Tab */}
          <TabsContent value="personality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Clone Personality</CardTitle>
                <CardDescription>
                  Define how your clone should communicate and behave
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Communication Tone</Label>
                      <Select defaultValue="empathetic">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empathetic">Empathetic & Caring</SelectItem>
                          <SelectItem value="confident">Confident & Direct</SelectItem>
                          <SelectItem value="friendly">Friendly & Casual</SelectItem>
                          <SelectItem value="professional">Professional & Formal</SelectItem>
                          <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Use Humor?</Label>
                      <Select defaultValue="moderate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, frequently</SelectItem>
                          <SelectItem value="moderate">Occasionally</SelectItem>
                          <SelectItem value="no">Rarely/Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>What should your clone never say?</Label>
                      <Textarea 
                        placeholder="e.g., Never give medical advice, avoid controversial topics..."
                        className="h-24"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Response Style</Label>
                  <Textarea 
                    placeholder="Describe how you want your clone to respond. Include specific phrases, approaches, or methods you typically use..."
                    className="h-32"
                  />
                </div>

                <Button className="bg-primary hover:bg-secondary text-primary-foreground">
                  Save Personality Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Status Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Training Progress
                </CardTitle>
                <CardDescription>
                  Your clone is learning from your knowledge sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{trainingProgress}% complete</span>
                  </div>
                  <Progress value={trainingProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Estimated time remaining: 2-3 hours
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Content Processing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">✓ Complete</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Personality Training</span>
                    </div>
                    <p className="text-sm text-muted-foreground">⟳ In Progress</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="font-medium">Quality Testing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">⧖ Pending</p>
                  </div>
                </div>

                {cloneStatus === 'live' && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="h-5 w-5 text-success" />
                      <span className="font-semibold text-success">Your clone is live!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your digital clone is ready to help others. Share your clone link to start conversations.
                    </p>
                    <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                      Share Clone Link
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview & Test Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Test Your Clone</CardTitle>
                <CardDescription>
                  Chat with your clone to see how it responds and provide feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 h-96 flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="chat-bubble-clone">
                      Hi! I'm Sarah's digital clone. I'm here to help with life coaching, motivation, and personal development. What would you like to talk about?
                    </div>
                    
                    <div className="chat-bubble-user">
                      How can I overcome procrastination?
                    </div>
                    
                    <div className="chat-bubble-clone">
                      Procrastination often stems from fear of failure or perfectionism. Here's my approach: Start with the "2-minute rule" - if something takes less than 2 minutes, do it now. For bigger tasks, break them into tiny steps and celebrate small wins. What specific task are you avoiding right now?
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="ghost" className="p-1">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Suggest Correction
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Test your clone with a question..." />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
