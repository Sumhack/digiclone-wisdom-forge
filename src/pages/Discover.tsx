
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, Star, MessageCircle, Users, TrendingUp,
  Heart, Briefcase, Dumbbell, BookOpen, Brain, Palette,
  Code, Music, Camera, Plane
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Clones", icon: Brain, count: 156 },
    { id: "coaching", name: "Coaching & Personal Development", icon: Heart, count: 45 },
    { id: "business", name: "Business & Leadership", icon: Briefcase, count: 38 },
    { id: "fitness", name: "Fitness & Wellness", icon: Dumbbell, count: 29 },
    { id: "education", name: "Education & Learning", icon: BookOpen, count: 24 },
    { id: "creative", name: "Art & Creativity", icon: Palette, count: 20 },
  ];

  const featuredClones = [
    {
      id: "sarah-chen",
      name: "Sarah Chen",
      title: "Life Coach & Motivational Speaker",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      bio: "Helping people unlock their potential and achieve their dreams through proven coaching methods.",
      specialties: ["Goal Setting", "Motivation", "Habit Building"],
      rating: 4.9,
      conversations: "10.2K",
      category: "coaching",
      featured: true
    },
    {
      id: "michael-kumar",
      name: "Dr. Michael Kumar",
      title: "Business Strategy Consultant",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "25+ years helping startups and Fortune 500 companies scale and optimize their operations.",
      specialties: ["Strategy", "Leadership", "Scaling"],
      rating: 4.8,
      conversations: "8.7K",
      category: "business",
      featured: true
    },
    {
      id: "emma-rodriguez",
      name: "Emma Rodriguez",
      title: "Certified Fitness Trainer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      bio: "Specialized in sustainable fitness routines and nutrition planning for busy professionals.",
      specialties: ["Workout Plans", "Nutrition", "Motivation"],
      rating: 4.9,
      conversations: "6.3K",
      category: "fitness",
      featured: true
    },
    {
      id: "david-kim",
      name: "David Kim",
      title: "Software Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "Leading engineering teams at top tech companies. Expert in system design and career growth.",
      specialties: ["Coding", "System Design", "Career Growth"],
      rating: 4.7,
      conversations: "5.9K",
      category: "education",
      featured: false
    },
    {
      id: "lisa-zhang",
      name: "Lisa Zhang",
      title: "Creative Director & Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c18c?w=100&h=100&fit=crop&crop=face",
      bio: "Award-winning designer with 15+ years creating brands and digital experiences.",
      specialties: ["Design", "Branding", "Creativity"],
      rating: 4.8,
      conversations: "4.2K",
      category: "creative",
      featured: false
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      title: "Investment Banking VP",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      bio: "Wall Street veteran sharing insights on finance, investing, and career progression.",
      specialties: ["Finance", "Investing", "Career"],
      rating: 4.6,
      conversations: "3.8K",
      category: "business",
      featured: false
    },
  ];

  const filteredClones = featuredClones.filter(clone => {
    const matchesSearch = clone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clone.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || clone.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredClonesFiltered = filteredClones.filter(clone => clone.featured);
  const allClonesFiltered = filteredClones;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Discover AI Clones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Chat with digital clones of experts, coaches, and thought leaders. 
            Get personalized advice and insights anytime, anywhere.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, expertise, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
            />
          </div>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>156 Expert Clones</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>50K+ Conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>4.8 Avg Rating</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="featured" className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <TabsList className="grid w-full lg:w-auto grid-cols-2">
              <TabsTrigger value="featured">Featured Clones</TabsTrigger>
              <TabsTrigger value="all">All Clones</TabsTrigger>
            </TabsList>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredClonesFiltered.map((clone) => (
                <Card key={clone.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={clone.avatar} />
                        <AvatarFallback>{clone.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg font-serif truncate">{clone.name}</CardTitle>
                          {clone.featured && (
                            <Badge className="bg-primary text-primary-foreground">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm font-medium text-primary">
                          {clone.title}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {clone.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {clone.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{clone.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{clone.conversations}</span>
                        </div>
                      </div>
                      
                      <Link to={`/chat/${clone.id}`}>
                        <Button size="sm" className="bg-primary hover:bg-secondary text-primary-foreground">
                          Chat Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {featuredClonesFiltered.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No clones found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allClonesFiltered.map((clone) => (
                <Card key={clone.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={clone.avatar} />
                        <AvatarFallback>{clone.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg font-serif truncate">{clone.name}</CardTitle>
                          {clone.featured && (
                            <Badge className="bg-primary text-primary-foreground">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm font-medium text-primary">
                          {clone.title}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {clone.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {clone.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{clone.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{clone.conversations}</span>
                        </div>
                      </div>
                      
                      <Link to={`/chat/${clone.id}`}>
                        <Button size="sm" className="bg-primary hover:bg-secondary text-primary-foreground">
                          Chat Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {allClonesFiltered.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No clones found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Want to create your own clone?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of experts who are scaling their impact and helping thousands of people worldwide.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8">
              Create Your Clone
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Discover;
