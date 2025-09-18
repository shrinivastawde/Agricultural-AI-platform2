import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { 
  Building2, 
  Search, 
  Filter,
  MapPin,
  IndianRupee,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Users,
  Tractor,
  Sprout,
  Droplets
} from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  category: "subsidy" | "loan" | "insurance" | "msp" | "welfare";
  description: string;
  benefit: string;
  eligibility: string[];
  documents: string[];
  applicationDeadline: string;
  status: "active" | "upcoming" | "expired";
  state: string;
  department: string;
  maxAmount: string;
  processingTime: string;
  icon: any;
}

const GovernmentSchemes = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTab, setSelectedTab] = useState("subsidies");

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const schemes: Scheme[] = [
    {
      id: "PM-KISAN",
      name: "PM-KISAN Samman Nidhi",
      category: "welfare",
      description: "Financial assistance of ₹6,000 per year to small and marginal farmers",
      benefit: "₹2,000 every 4 months (3 installments per year)",
      eligibility: ["Small & marginal farmers", "Land holding up to 2 hectares", "Cultivator with ownership"],
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Mobile Number"],
      applicationDeadline: "Ongoing",
      status: "active",
      state: "All States",
      department: "Ministry of Agriculture",
      maxAmount: "₹6,000/year",
      processingTime: "30-45 days",
      icon: IndianRupee
    },
    {
      id: "SOIL-HEALTH",
      name: "Soil Health Card Scheme",
      category: "subsidy",
      description: "Free soil testing and health cards to improve soil fertility",
      benefit: "Free soil analysis and recommendations for fertilizer use",
      eligibility: ["All farmers", "Own or lease land", "Valid land documents"],
      documents: ["Land Records", "Aadhaar Card", "Application Form"],
      applicationDeadline: "31st March 2025",
      status: "active", 
      state: userProfile?.state || "Maharashtra",
      department: "Department of Agriculture",
      maxAmount: "Free Service",
      processingTime: "15-20 days",
      icon: Sprout
    },
    {
      id: "CROP-INSURANCE",
      name: "Pradhan Mantri Fasal Bima Yojana",
      category: "insurance",
      description: "Comprehensive crop insurance against natural calamities",
      benefit: "Coverage for crop loss due to natural disasters, pests, diseases",
      eligibility: ["All farmers", "Cultivator & sharecroppers", "Notified crops only"],
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
      applicationDeadline: "Within cutoff dates for each season",
      status: "active",
      state: "All States",
      department: "Ministry of Agriculture",
      maxAmount: "Full crop value",
      processingTime: "Claim: 60-90 days",
      icon: FileText
    },
    {
      id: "TRACTOR-SUBSIDY",
      name: "Tractor Subsidy Scheme",
      category: "subsidy",
      description: "Financial assistance for purchasing tractors and farm equipment",
      benefit: "25-50% subsidy on tractor purchase (up to ₹2.5 lakhs)",
      eligibility: ["Small & marginal farmers", "First-time tractor buyer", "Valid land documents"],
      documents: ["Aadhaar Card", "Income Certificate", "Land Records", "Bank Account"],
      applicationDeadline: "15th February 2025",
      status: "active",
      state: userProfile?.state || "Maharashtra", 
      department: "Department of Agriculture",
      maxAmount: "₹2,50,000",
      processingTime: "45-60 days",
      icon: Tractor
    },
    {
      id: "DRIP-IRRIGATION",
      name: "Micro Irrigation Scheme",
      category: "subsidy",
      description: "Subsidy for drip and sprinkler irrigation systems",
      benefit: "55% subsidy for small farmers, 45% for others",
      eligibility: ["All categories of farmers", "Minimum 0.5 acre land", "Water source available"],
      documents: ["Land Records", "Water Source Certificate", "Bank Account", "Quotation"],
      applicationDeadline: "30th April 2025",
      status: "active",
      state: userProfile?.state || "Maharashtra",
      department: "Department of Agriculture",
      maxAmount: "₹1,00,000 per hectare",
      processingTime: "30-45 days", 
      icon: Droplets
    },
    {
      id: "KCC-LOAN",
      name: "Kisan Credit Card",
      category: "loan",
      description: "Credit facility for farmers to meet crop production needs",
      benefit: "Low interest agriculture loans (4% interest with subsidy)",
      eligibility: ["All farmers", "Cultivator & tenant farmers", "Age 18-75 years"],
      documents: ["Aadhaar Card", "Land Records", "Income Proof", "Passport Photo"],
      applicationDeadline: "Ongoing",
      status: "active",
      state: "All States",
      department: "Ministry of Agriculture & Banks",
      maxAmount: "Based on crop & land",
      processingTime: "7-15 days",
      icon: Building2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "upcoming": return "bg-warning/10 text-warning border-warning/20"; 
      case "expired": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "subsidy": return <IndianRupee className="h-4 w-4" />;
      case "loan": return <Building2 className="h-4 w-4" />;
      case "insurance": return <FileText className="h-4 w-4" />;
      case "welfare": return <Users className="h-4 w-4" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const filterSchemes = (category: string) => {
    let filtered = schemes;
    
    if (category !== "all") {
      filtered = filtered.filter(scheme => {
        switch (category) {
          case "subsidies": return scheme.category === "subsidy";
          case "loans": return scheme.category === "loan";
          case "insurance": return scheme.category === "insurance";
          case "welfare": return scheme.category === "welfare" || scheme.category === "msp";
          default: return true;
        }
      });
    }
    
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const checkEligibility = (scheme: Scheme) => {
    // Simple eligibility check based on user profile
    if (!userProfile) return "unknown";
    
    const farmSize = parseFloat(userProfile.farmSize) || 0;
    const isSmallFarmer = farmSize <= 2;
    
    if (scheme.id === "PM-KISAN" && isSmallFarmer) return "eligible";
    if (scheme.id === "TRACTOR-SUBSIDY" && isSmallFarmer) return "eligible";
    if (scheme.eligibility.some(criteria => criteria.toLowerCase().includes("all farmers"))) return "eligible";
    
    return "check-required";
  };

  const getEligibilityBadge = (eligibility: string) => {
    switch (eligibility) {
      case "eligible": return <Badge className="bg-success/10 text-success border-success/20" variant="outline">ELIGIBLE</Badge>;
      case "not-eligible": return <Badge className="bg-destructive/10 text-destructive border-destructive/20" variant="outline">NOT ELIGIBLE</Badge>;
      case "check-required": return <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">CHECK ELIGIBILITY</Badge>;
      default: return <Badge variant="outline">UNKNOWN</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <Header title="Government Schemes" showLogo={false} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Location Info */}
        <div className="flex items-center space-x-2 text-muted-foreground mb-6">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">
            Showing schemes for: {userProfile?.district}, {userProfile?.state}
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="secondary" size="sm" className="px-4">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Scheme Categories */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subsidies">Subsidies</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="welfare">Welfare</TabsTrigger>
          </TabsList>

          <TabsContent value="subsidies" className="mt-6">
            <div className="space-y-6">
              {filterSchemes("subsidies").map((scheme) => (
                <Card key={scheme.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <scheme.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-lg">{scheme.name}</span>
                          <div className="text-sm text-muted-foreground font-normal">
                            {scheme.department}
                          </div>
                        </div>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getEligibilityBadge(checkEligibility(scheme))}
                        <Badge className={`${getStatusColor(scheme.status)} border`} variant="outline">
                          {scheme.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{scheme.description}</p>
                    
                    {/* Key Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Benefit</div>
                        <div className="font-semibold text-success">{scheme.benefit}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Max Amount</div>
                        <div className="font-semibold">{scheme.maxAmount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Processing Time</div>
                        <div className="font-semibold">{scheme.processingTime}</div>
                      </div>
                    </div>

                    {/* Eligibility & Documents */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Eligibility Criteria:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.eligibility.map((criteria, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Required Documents:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.documents.map((doc, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <FileText className="h-3 w-3 text-primary" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Application Deadline */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Application Deadline: <span className="font-semibold">{scheme.applicationDeadline}</span>
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="secondary">
                          Check Eligibility
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="loans" className="mt-6">
            <div className="space-y-6">
              {filterSchemes("loans").map((scheme) => (
                <Card key={scheme.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <scheme.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-lg">{scheme.name}</span>
                          <div className="text-sm text-muted-foreground font-normal">
                            {scheme.department}
                          </div>
                        </div>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getEligibilityBadge(checkEligibility(scheme))}
                        <Badge className={`${getStatusColor(scheme.status)} border`} variant="outline">
                          {scheme.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{scheme.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Benefit</div>
                        <div className="font-semibold text-success">{scheme.benefit}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Credit Limit</div>
                        <div className="font-semibold">{scheme.maxAmount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Processing Time</div>
                        <div className="font-semibold">{scheme.processingTime}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Eligibility Criteria:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.eligibility.map((criteria, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Required Documents:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.documents.map((doc, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <FileText className="h-3 w-3 text-primary" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Application: <span className="font-semibold">{scheme.applicationDeadline}</span>
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="secondary">
                          Calculate EMI
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="mt-6">
            <div className="space-y-6">
              {filterSchemes("insurance").map((scheme) => (
                <Card key={scheme.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <scheme.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-lg">{scheme.name}</span>
                          <div className="text-sm text-muted-foreground font-normal">
                            {scheme.department}
                          </div>
                        </div>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getEligibilityBadge(checkEligibility(scheme))}
                        <Badge className={`${getStatusColor(scheme.status)} border`} variant="outline">
                          {scheme.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{scheme.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                        <div className="font-semibold text-success">{scheme.benefit}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Max Coverage</div>
                        <div className="font-semibold">{scheme.maxAmount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Claim Processing</div>
                        <div className="font-semibold">{scheme.processingTime}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Eligibility Criteria:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.eligibility.map((criteria, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Required Documents:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.documents.map((doc, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <FileText className="h-3 w-3 text-primary" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Enrollment: <span className="font-semibold">{scheme.applicationDeadline}</span>
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="secondary">
                          Calculate Premium
                        </Button>
                        <Button size="sm">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="welfare" className="mt-6">
            <div className="space-y-6">
              {filterSchemes("welfare").map((scheme) => (
                <Card key={scheme.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <scheme.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-lg">{scheme.name}</span>
                          <div className="text-sm text-muted-foreground font-normal">
                            {scheme.department}
                          </div>
                        </div>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getEligibilityBadge(checkEligibility(scheme))}
                        <Badge className={`${getStatusColor(scheme.status)} border`} variant="outline">
                          {scheme.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{scheme.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Annual Benefit</div>
                        <div className="font-semibold text-success">{scheme.benefit}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Total Amount</div>
                        <div className="font-semibold">{scheme.maxAmount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Processing Time</div>
                        <div className="font-semibold">{scheme.processingTime}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Eligibility Criteria:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.eligibility.map((criteria, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Required Documents:</h4>
                        <ul className="text-xs space-y-1">
                          {scheme.documents.map((doc, i) => (
                            <li key={i} className="text-muted-foreground flex items-center space-x-1">
                              <FileText className="h-3 w-3 text-primary" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Application: <span className="font-semibold">{scheme.applicationDeadline}</span>
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="secondary">
                          Check Status
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default GovernmentSchemes;