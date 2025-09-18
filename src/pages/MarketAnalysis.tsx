import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  BarChart3,
  AlertCircle
} from "lucide-react";

interface MarketData {
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  arrival: number;
  date: string;
  trend: "up" | "down" | "stable";
}

const MarketAnalysis = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("local");
  const [selectedCommodity, setSelectedCommodity] = useState("");

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  // Mock market data - in real app, this would come from API
  const marketData: MarketData[] = [
    {
      district: userProfile?.district || "Nashik",
      market: "Nashik APMC",
      commodity: "Bajra",
      variety: "Local",
      grade: "FAQ",
      minPrice: 2150,
      maxPrice: 2250,
      modalPrice: 2200,
      arrival: 850,
      date: "2024-08-23",
      trend: "up"
    },
    {
      district: userProfile?.district || "Nashik", 
      market: "Malegaon APMC",
      commodity: "Wheat",
      variety: "Lokvan",
      grade: "FAQ",
      minPrice: 2800,
      maxPrice: 2950,
      modalPrice: 2875,
      arrival: 1200,
      date: "2024-08-23",
      trend: "down"
    },
    {
      district: userProfile?.district || "Nashik",
      market: "Sinnar APMC", 
      commodity: "Onion",
      variety: "Local Red",
      grade: "Medium",
      minPrice: 1500,
      maxPrice: 1800,
      modalPrice: 1650,
      arrival: 2500,
      date: "2024-08-23",
      trend: "stable"
    }
  ];

  const filteredData = marketData.filter(item => 
    item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <Header title="Market Analysis" showLogo={false} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Location & Date */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {userProfile?.district}, {userProfile?.state}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Today: 23 Aug 2024</span>
          </div>
        </div>

        {/* Market Level Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { key: "local", label: "Local Mandi", active: selectedLevel === "local" },
            { key: "district", label: "District", active: selectedLevel === "district" },
            { key: "state", label: "State", active: selectedLevel === "state" },
            { key: "international", label: "International", active: selectedLevel === "international" }
          ].map((level) => (
            <Button
              key={level.key}
              variant={level.active ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedLevel(level.key)}
              className="text-xs"
            >
              {level.label}
            </Button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search commodity or market..."
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

        {/* Market Advisory Alert */}
        <Card className="shadow-card mb-6 border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-success mt-1" />
              <div>
                <h3 className="font-semibold text-success-foreground mb-1">
                  Market Advisory
                </h3>
                <p className="text-sm text-foreground">
                  Your mandi's average Bajra price is ₹2,200/quintal, which is 5% higher than district average. 
                  <span className="font-medium text-success"> Suggested: Sell now for optimal profit.</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Data Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Live Market Prices - {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Min Price</TableHead>
                    <TableHead>Max Price</TableHead>
                    <TableHead>Modal Price</TableHead>
                    <TableHead>Arrival (Qtl)</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.market}</TableCell>
                      <TableCell>{item.commodity}</TableCell>
                      <TableCell>{item.variety}</TableCell>
                      <TableCell>{item.grade}</TableCell>
                      <TableCell>₹{item.minPrice}</TableCell>
                      <TableCell>₹{item.maxPrice}</TableCell>
                      <TableCell className="font-semibold">₹{item.modalPrice}</TableCell>
                      <TableCell>{item.arrival}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(item.trend)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Price Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Today's Average</span>
                  <span className="font-semibold">₹2,242/Qtl</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Weekly High</span>
                  <span className="font-semibold text-success">₹2,350/Qtl</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Weekly Low</span>
                  <span className="font-semibold text-destructive">₹2,150/Qtl</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Market Trend</span>
                  <span className="font-semibold text-success">Bullish ↗</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Supply & Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Arrival</span>
                  <span className="font-semibold">4,550 Qtl</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Demand Level</span>
                  <span className="font-semibold text-success">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Export Potential</span>
                  <span className="font-semibold text-primary">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Recommendation</span>
                  <span className="font-semibold text-success">Sell Now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketAnalysis;