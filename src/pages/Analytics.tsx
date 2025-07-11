
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Users, MessageCircle, Clock, ThumbsUp, ThumbsDown, 
  Download, Calendar, Filter, BarChart3, PieChart, Activity 
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from "@/components/Header";

const Analytics = () => {
  // Sample data for charts
  const conversationData = [
    { date: 'Jan 1', conversations: 12, users: 8 },
    { date: 'Jan 2', conversations: 19, users: 12 },
    { date: 'Jan 3', conversations: 15, users: 11 },
    { date: 'Jan 4', conversations: 25, users: 18 },
    { date: 'Jan 5', conversations: 32, users: 22 },
    { date: 'Jan 6', conversations: 28, users: 19 },
    { date: 'Jan 7', conversations: 35, users: 24 },
  ];

  const topQuestions = [
    { question: "How do I overcome procrastination?", count: 47 },
    { question: "What's the best way to set goals?", count: 32 },
    { question: "How can I build better habits?", count: 28 },
    { question: "How do I stay motivated?", count: 24 },
    { question: "What's your morning routine advice?", count: 19 },
  ];

  const feedbackData = [
    { name: 'Positive', value: 89, color: '#79c2a0' },
    { name: 'Neutral', value: 8, color: '#e9be93' },
    { name: 'Negative', value: 3, color: '#e67c73' },
  ];

  const categoryData = [
    { category: 'Goal Setting', sessions: 85 },
    { category: 'Motivation', sessions: 67 },
    { category: 'Habits', sessions: 54 },
    { category: 'Career', sessions: 41 },
    { category: 'Relationships', sessions: 32 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">Clone Analytics</h1>
            <p className="text-muted-foreground">Track your digital clone's performance and impact</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                  <p className="text-3xl font-bold">1,247</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +23% from last month
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unique Users</p>
                  <p className="text-3xl font-bold">342</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +18% from last month
                  </p>
                </div>
                <div className="p-3 bg-accent/10 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Chat Duration</p>
                  <p className="text-3xl font-bold">8.5m</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 bg-success/10 rounded-full">
                  <Clock className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Positive Feedback</p>
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +5% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ThumbsUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Conversation Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Conversation Trends
                  </CardTitle>
                  <CardDescription>Daily conversations and unique users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={conversationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="conversations" stackId="1" stroke="#e9be93" fill="#e9be93" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="users" stackId="2" stroke="#5c7e9d" fill="#5c7e9d" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Feedback Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Feedback Distribution
                  </CardTitle>
                  <CardDescription>User satisfaction breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={feedbackData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {feedbackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Most Asked Questions</CardTitle>
                <CardDescription>What people are asking your clone most frequently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topQuestions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="min-w-[24px] h-6 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <span className="font-medium">{item.question}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.count} times</span>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(item.count / topQuestions[0].count) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-serif">Conversation Activity</CardTitle>
                  <CardDescription>Detailed view of daily conversation patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={conversationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="conversations" stroke="#e9be93" strokeWidth={3} />
                      <Line type="monotone" dataKey="users" stroke="#5c7e9d" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Peak Hours</CardTitle>
                  <CardDescription>When your clone is most active</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">9:00 AM - 11:00 AM</span>
                      <Badge>Peak</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">2:00 PM - 4:00 PM</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">7:00 PM - 9:00 PM</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">11:00 PM - 1:00 AM</span>
                      <Badge variant="outline">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Feedback Trends</CardTitle>
                  <CardDescription>How user satisfaction has changed over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ThumbsUp className="h-5 w-5 text-success" />
                        <span className="font-semibold">Positive Feedback</span>
                      </div>
                      <span className="text-2xl font-bold text-success">89%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-yellow-600" />
                        <span className="font-semibold">Neutral Feedback</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">8%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ThumbsDown className="h-5 w-5 text-destructive" />
                        <span className="font-semibold">Negative Feedback</span>
                      </div>
                      <span className="text-2xl font-bold text-destructive">3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Recent Feedback</CardTitle>
                  <CardDescription>Latest user reviews and suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">Anonymous User</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">"Really helpful advice on goal setting. Felt like talking to the real coach!"</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">Mike Johnson</span>
                        <span className="text-xs text-muted-foreground">5 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">"The motivation techniques shared were exactly what I needed. Thank you!"</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">Sarah K.</span>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">"Good advice, but could use more specific examples for my situation."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Popular Topics</CardTitle>
                <CardDescription>What subjects your clone discusses most</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#e9be93" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
