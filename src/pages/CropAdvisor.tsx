import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";  
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useLocation } from "@/contexts/LocationContext";
import { 
  Sprout, 
  MapPin, 
  Droplets, 
  Thermometer,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Leaf
} from "lucide-react";

interface CropRecommendation {
  name: string;
  suitability: number;
  profitability: number;
  yield: string;
  investment: string;
  profit: string;
  riskLevel: 'low' | 'medium' | 'high';
  breakEvenTime: string;
  seasonality: string;
  soilSuitability: number;
  waterRequirement: number;
  weatherTolerance: number;
  marketDemand: number;
  advantages: string[];
  considerations: string[];
  marketPrices: {
    market: string;
    price: string;
  }[];
}

interface UserProfile {
  name: string;
  state: string;
  district: string;
  village: string;
  farmSize: string;
  soilType: string;
}

const CropAdvisor = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedSeason, setSelectedSeason] = useState("current");
  const { userLocation } = useLocation();

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  // Dynamic crop recommendations based on location
  const getLocationBasedCrops = (): CropRecommendation[] => {
    const locationKey = userLocation ? `${userLocation.district}, ${userLocation.state}` : "Akola, Maharashtra";
    
    // Maharashtra crops (Akola, Amravati, etc.)
    if (userLocation?.state === "Maharashtra") {
      return [
        {
          name: "Cotton",
          suitability: 85,
          profitability: 78,
          yield: "12-15 quintals/acre",
          investment: "₹25,000",
          profit: "₹45,000",
          riskLevel: 'low',
          breakEvenTime: "6 months",
          seasonality: "Kharif Season",
          soilSuitability: 88,
          waterRequirement: 75,
          weatherTolerance: 82,
          marketDemand: 85,
          advantages: [
            "Strong mandi demand",
            "Suitable for black cotton soil",
            "Good fiber quality",
            "Export potential"
          ],
          considerations: [
            "Water requirement moderate",
            "Pest management essential",
            "Market price fluctuations"
          ],
          marketPrices: [
            { market: "Akola", price: "₹6,850" },
            { market: "Amravati", price: "₹7,025" },
            { market: "Nagpur", price: "₹6,900" }
          ]
        },
        {
          name: "Tur (Pigeon Pea)",
          suitability: 72,
          profitability: 82,
          yield: "8-12 quintals/acre",
          investment: "₹18,000",
          profit: "₹35,000",
          riskLevel: 'low',
          breakEvenTime: "5 months",
          seasonality: "Kharif Season",
          soilSuitability: 85,
          waterRequirement: 60,
          weatherTolerance: 80,
          marketDemand: 88,
          advantages: [
            "High modal prices",
            "Low water requirement",
            "Nitrogen fixation benefit",
            "Stable market demand"
          ],
          considerations: [
            "Susceptible to pod borer",
            "Requires proper spacing",
            "Storage management needed"
          ],
          marketPrices: [
            { market: "Akola", price: "₹4,030" },
            { market: "Latur", price: "₹5,500" },
            { market: "Solapur", price: "₹4,800" }
          ]
        },
        {
          name: "Wheat",
          suitability: 68,
          profitability: 65,
          yield: "18-25 quintals/acre",
          investment: "₹22,000",
          profit: "₹28,000",
          riskLevel: 'low',
          breakEvenTime: "4 months",
          seasonality: "Rabi Season",
          soilSuitability: 75,
          waterRequirement: 85,
          weatherTolerance: 70,
          marketDemand: 80,
          advantages: [
            "Stable demand",
            "Government procurement",
            "Good storage life",
            "Multiple varieties available"
          ],
          considerations: [
            "Higher water requirement",
            "Temperature sensitive",
            "Timely harvesting essential"
          ],
          marketPrices: [
            { market: "Akola", price: "₹2,400" },
            { market: "Pune", price: "₹2,700" },
            { market: "Nashik", price: "₹2,550" }
          ]
        },
        {
          name: "Soybean",
          suitability: 55,
          profitability: 60,
          yield: "10-15 quintals/acre",
          investment: "₹20,000",
          profit: "₹25,000",
          riskLevel: 'medium',
          breakEvenTime: "4 months",
          seasonality: "Kharif Season",
          soilSuitability: 65,
          waterRequirement: 70,
          weatherTolerance: 60,
          marketDemand: 65,
          advantages: [
            "Oil extraction potential",
            "Protein rich crop",
            "Industrial demand",
            "Export opportunities"
          ],
          considerations: [
            "Limited current market data",
            "Weather dependent",
            "Pest management required",
            "Storage challenges"
          ],
          marketPrices: [
            { market: "Akola", price: "₹3,800" },
            { market: "Indore", price: "₹4,200" },
            { market: "Bhopal", price: "₹3,950" }
          ]
        },
        {
          name: "Jowar (Sorghum)",
          suitability: 45,
          profitability: 45,
          yield: "12-18 quintals/acre",
          investment: "₹15,000",
          profit: "₹20,000",
          riskLevel: 'medium',
          breakEvenTime: "4 months",
          seasonality: "Kharif/Rabi Season",
          soilSuitability: 70,
          waterRequirement: 50,
          weatherTolerance: 85,
          marketDemand: 40,
          advantages: [
            "Drought tolerant",
            "Low input cost",
            "Fodder value",
            "Grown locally"
          ],
          considerations: [
            "Limited market data available",
            "Lower profitability",
            "Processing required",
            "Recommend with caution"
          ],
          marketPrices: [
            { market: "Akola", price: "₹2,200" },
            { market: "Solapur", price: "₹2,400" }
          ]
        }
      ];
    }
    
    // Telangana crops (Warangal, etc.)
    if (userLocation?.state === "Telangana") {
      return [
        {
          name: "Rice",
          suitability: 92,
          profitability: 88,
          yield: "22-28 quintals/acre",
          investment: "₹30,000",
          profit: "₹55,000",
          riskLevel: 'low',
          breakEvenTime: "4 months",
          seasonality: "Kharif Season",
          soilSuitability: 95,
          waterRequirement: 90,
          weatherTolerance: 85,
          marketDemand: 95,
          advantages: [
            "Excellent water availability",
            "High yield potential",
            "Strong government support",
            "Multiple varieties"
          ],
          considerations: [
            "High water requirement",
            "Labour intensive",
            "Storage management"
          ],
          marketPrices: [
            { market: "Warangal", price: "₹2,100" },
            { market: "Karimnagar", price: "₹2,200" },
            { market: "Hyderabad", price: "₹2,150" }
          ]
        },
        {
          name: "Cotton",
          suitability: 78,
          profitability: 75,
          yield: "10-14 quintals/acre",
          investment: "₹28,000",
          profit: "₹42,000",
          riskLevel: 'medium',
          breakEvenTime: "6 months",
          seasonality: "Kharif Season",
          soilSuitability: 80,
          waterRequirement: 75,
          weatherTolerance: 78,
          marketDemand: 82,
          advantages: [
            "Good market demand",
            "Suitable soil conditions",
            "Export opportunities",
            "Government MSP"
          ],
          considerations: [
            "Pest management critical",
            "Weather dependency",
            "Input cost management"
          ],
          marketPrices: [
            { market: "Warangal", price: "₹6,750" },
            { market: "Adilabad", price: "₹6,900" },
            { market: "Nizamabad", price: "₹6,825" }
          ]
        },
        {
          name: "Maize",
          suitability: 85,
          profitability: 72,
          yield: "20-25 quintals/acre",
          investment: "₹25,000",
          profit: "₹38,000",
          riskLevel: 'low',
          breakEvenTime: "3.5 months",
          seasonality: "Kharif/Rabi Season",
          soilSuitability: 88,
          waterRequirement: 65,
          weatherTolerance: 82,
          marketDemand: 78,
          advantages: [
            "Short duration crop",
            "Multiple uses",
            "Good adaptability",
            "Poultry feed demand"
          ],
          considerations: [
            "Storage challenges",
            "Price volatility",
            "Pest management"
          ],
          marketPrices: [
            { market: "Warangal", price: "₹1,850" },
            { market: "Khammam", price: "₹1,900" },
            { market: "Nalgonda", price: "₹1,875" }
          ]
        },
        {
          name: "Turmeric",
          suitability: 88,
          profitability: 95,
          yield: "15-20 quintals/acre",
          investment: "₹45,000",
          profit: "₹85,000",
          riskLevel: 'medium',
          breakEvenTime: "10 months",
          seasonality: "June-March",
          soilSuitability: 90,
          waterRequirement: 80,
          weatherTolerance: 85,
          marketDemand: 92,
          advantages: [
            "Very high profitability",
            "Premium quality production",
            "Export demand",
            "Medicinal value"
          ],
          considerations: [
            "Long duration crop",
            "High initial investment",
            "Curing & processing required"
          ],
          marketPrices: [
            { market: "Warangal", price: "₹8,500" },
            { market: "Nizamabad", price: "₹8,750" },
            { market: "Erode", price: "₹8,900" }
          ]
        },
        {
          name: "Red Gram (Tur)",
          suitability: 68,
          profitability: 70,
          yield: "6-10 quintals/acre",
          investment: "₹20,000",
          profit: "₹32,000",
          riskLevel: 'medium',
          breakEvenTime: "6 months",
          seasonality: "Kharif Season",
          soilSuitability: 75,
          waterRequirement: 55,
          weatherTolerance: 78,
          marketDemand: 85,
          advantages: [
            "Nitrogen fixation",
            "Drought tolerant",
            "Stable market",
            "Intercropping potential"
          ],
          considerations: [
            "Pod borer attacks",
            "Long duration",
            "Market timing important"
          ],
          marketPrices: [
            { market: "Warangal", price: "₹6,200" },
            { market: "Mahbubnagar", price: "₹6,400" },
            { market: "Rangareddy", price: "₹6,300" }
          ]
        }
      ];
    }
    
    // Madhya Pradesh crops (Indore, etc.)
    if (userLocation?.state === "Madhya Pradesh") {
      return [
        {
          name: "Soybean",
          suitability: 95,
          profitability: 85,
          yield: "12-18 quintals/acre",
          investment: "₹22,000",
          profit: "₹48,000",
          riskLevel: 'low',
          breakEvenTime: "4 months",
          seasonality: "Kharif Season",
          soilSuitability: 92,
          waterRequirement: 70,
          weatherTolerance: 88,
          marketDemand: 90,
          advantages: [
            "Ideal climate conditions",
            "High oil content",
            "Strong industrial demand",
            "Export opportunities"
          ],
          considerations: [
            "Weather sensitivity",
            "Quality maintenance",
            "Market price fluctuations"
          ],
          marketPrices: [
            { market: "Indore", price: "₹4,200" },
            { market: "Dewas", price: "₹4,150" },
            { market: "Ujjain", price: "₹4,180" }
          ]
        },
        {
          name: "Wheat",
          suitability: 88,
          profitability: 78,
          yield: "25-35 quintals/acre",
          investment: "₹28,000",
          profit: "₹52,000",
          riskLevel: 'low',
          breakEvenTime: "4.5 months",
          seasonality: "Rabi Season",
          soilSuitability: 85,
          waterRequirement: 85,
          weatherTolerance: 82,
          marketDemand: 88,
          advantages: [
            "High productivity zone",
            "Government procurement",
            "Good irrigation facilities",
            "Premium varieties"
          ],
          considerations: [
            "Water management critical",
            "Timely sowing important",
            "Disease management"
          ],
          marketPrices: [
            { market: "Indore", price: "₹2,350" },
            { market: "Mandsaur", price: "₹2,400" },
            { market: "Neemuch", price: "₹2,380" }
          ]
        },
        {
          name: "Maize",
          suitability: 82,
          profitability: 75,
          yield: "22-28 quintals/acre",
          investment: "₹26,000",
          profit: "₹42,000",
          riskLevel: 'low',
          breakEvenTime: "3.5 months",
          seasonality: "Kharif/Rabi Season",
          soilSuitability: 88,
          waterRequirement: 70,
          weatherTolerance: 85,
          marketDemand: 82,
          advantages: [
            "Short duration",
            "Multiple seasons",
            "Industrial demand",
            "Animal feed market"
          ],
          considerations: [
            "Storage management",
            "Pest control needed",
            "Market timing"
          ],
          marketPrices: [
            { market: "Indore", price: "₹1,900" },
            { market: "Ratlam", price: "₹1,950" },
            { market: "Shajapur", price: "₹1,925" }
          ]
        },
        {
          name: "Gram (Chana)",
          suitability: 78,
          profitability: 72,
          yield: "10-15 quintals/acre",
          investment: "₹20,000",
          profit: "₹35,000",
          riskLevel: 'low',
          breakEvenTime: "4 months",
          seasonality: "Rabi Season",
          soilSuitability: 82,
          waterRequirement: 45,
          weatherTolerance: 88,
          marketDemand: 85,
          advantages: [
            "Low water requirement",
            "Nitrogen fixation",
            "High protein content",
            "Good market demand"
          ],
          considerations: [
            "Pest management needed",
            "Quality maintenance",
            "Harvesting timing"
          ],
          marketPrices: [
            { market: "Indore", price: "₹5,200" },
            { market: "Mandsaur", price: "₹5,350" },
            { market: "Ratlam", price: "₹5,280" }
          ]
        },
        {
          name: "Cotton",
          suitability: 65,
          profitability: 68,
          yield: "8-12 quintals/acre",
          investment: "₹30,000",
          profit: "₹38,000",
          riskLevel: 'medium',
          breakEvenTime: "6 months",
          seasonality: "Kharif Season",
          soilSuitability: 70,
          waterRequirement: 80,
          weatherTolerance: 72,
          marketDemand: 75,
          advantages: [
            "Textile industry demand",
            "Government support",
            "Export potential",
            "Long staple variety"
          ],
          considerations: [
            "High input costs",
            "Pest management critical",
            "Weather dependency",
            "Market price volatility"
          ],
          marketPrices: [
            { market: "Indore", price: "₹6,600" },
            { market: "Khargone", price: "₹6,750" },
            { market: "Khandwa", price: "₹6,700" }
          ]
        }
      ];
    }
    
    // Default to Maharashtra crops if location not specified
    return getLocationBasedCrops();
  };

  const cropRecommendations = getLocationBasedCrops();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low': return <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case 'high': return <Badge variant="secondary" className="bg-red-100 text-red-800">High Risk</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <Header title="Crop Advisor" showLogo={false} />
      
      <main className="container mx-auto px-4 py-6">
        {/* User Profile Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {userLocation ? `${userLocation.district}, ${userLocation.state}` : (userProfile ? `${userProfile.village}, ${userProfile.district}, ${userProfile.state}` : 'Location not set')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Soil Type</p>
                    <p className="font-semibold capitalize">{userProfile.soilType.replace('_', ' ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Sprout className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Farm Size</p>
                    <p className="font-semibold">{userProfile.farmSize} acres</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Season</p>
                    <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                      <SelectTrigger className="w-auto border-none p-0 h-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Season</SelectItem>
                        <SelectItem value="next">Next Season</SelectItem>
                        <SelectItem value="year">Year Round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Recommendations Header */}
        <Card className="shadow-card mb-8 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span>Smart Recommendations</span>
            </CardTitle>
            <CardDescription>
              Based on {userLocation ? `${userLocation.district}, ${userLocation.state}` : 'your location'} - soil type, weather forecast, and market demand analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Top 5</div>
                <div className="text-sm text-muted-foreground">Crop Recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userLocation?.state || 'Maharashtra'}</div>
                <div className="text-sm text-muted-foreground">Region Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userLocation?.state === 'Telangana' ? '92%' : 
                   userLocation?.state === 'Madhya Pradesh' ? '88%' : '85%'}
                </div>
                <div className="text-sm text-muted-foreground">Climate Match</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Recommendations */}
        <div className="space-y-6">
          {cropRecommendations.map((crop, index) => (
            <Card key={crop.name} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <CardDescription>{crop.seasonality}</CardDescription>
                    </div>
                  </div>
                  {getRiskBadge(crop.riskLevel)}
                </div>
                
                {/* Suitability Score */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Suitability</span>
                    <span className={`text-lg font-bold ${getScoreColor(crop.suitability)}`}>
                      {crop.suitability}%
                    </span>
                  </div>
                  <Progress value={crop.suitability} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-background rounded-lg border">
                    <TrendingUp className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm text-muted-foreground">Expected Yield</div>
                    <div className="font-semibold">{crop.yield}</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg border">
                    <DollarSign className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm text-muted-foreground">Investment</div>
                    <div className="font-semibold">{crop.investment}</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg border">
                    <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <div className="text-sm text-muted-foreground">Est. Profit</div>
                    <div className="font-semibold text-green-600">{crop.profit}</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg border">
                    <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm text-muted-foreground">Break-even</div>
                    <div className="font-semibold">{crop.breakEvenTime}</div>
                  </div>
                </div>

                {/* Suitability Factors */}
                <div>
                  <h4 className="font-semibold mb-3">Suitability Factors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Soil</span>
                        <span className={`text-sm font-medium ${getScoreColor(crop.soilSuitability)}`}>
                          {crop.soilSuitability}%
                        </span>
                      </div>
                      <Progress value={crop.soilSuitability} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Water</span>
                        <span className={`text-sm font-medium ${getScoreColor(crop.waterRequirement)}`}>
                          {crop.waterRequirement}%
                        </span>
                      </div>
                      <Progress value={crop.waterRequirement} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Weather</span>
                        <span className={`text-sm font-medium ${getScoreColor(crop.weatherTolerance)}`}>
                          {crop.weatherTolerance}%
                        </span>
                      </div>
                      <Progress value={crop.weatherTolerance} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Market</span>
                        <span className={`text-sm font-medium ${getScoreColor(crop.marketDemand)}`}>
                          {crop.marketDemand}%
                        </span>
                      </div>
                      <Progress value={crop.marketDemand} className="h-1" />
                    </div>
                  </div>
                </div>

                {/* Market Prices */}
                <div>
                  <h4 className="font-semibold mb-3">Current Market Prices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {crop.marketPrices.map((market, idx) => (
                      <div key={idx} className="p-3 bg-background rounded-lg border">
                        <div className="text-sm text-muted-foreground">{market.market}</div>
                        <div className="font-semibold text-green-600">{market.price}/quintal</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advantages & Considerations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Advantages</span>
                    </h4>
                    <ul className="space-y-2">
                      {crop.advantages.map((advantage, idx) => (
                        <li key={idx} className="text-sm flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Considerations</span>
                    </h4>
                    <ul className="space-y-2">
                      {crop.considerations.map((consideration, idx) => (
                        <li key={idx} className="text-sm flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                          <span>{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropAdvisor;