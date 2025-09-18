import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useLocation } from "@/contexts/LocationContext";
import { 
  Bell, 
  Cloud, 
  Droplets, 
  Thermometer, 
  Wind,
  AlertTriangle,
  CheckCircle,
  Info,
  MapPin,
  Phone,
  MessageSquare,
  Settings
} from "lucide-react";

interface AlertNotification {
  id: string;
  type: 'weather' | 'irrigation' | 'pest' | 'market' | 'general';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  actionRequired: boolean;
  isRead: boolean;
}

interface AlertSettings {
  weather: boolean;
  irrigation: boolean;
  pest: boolean;
  market: boolean;
  sms: boolean;
  email: boolean;
  phoneNumber: string;
}

const NotificationAlerts = () => {
  const { userLocation } = useLocation();
  const [activeTab, setActiveTab] = useState<'alerts' | 'settings'>('alerts');
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    weather: true,
    irrigation: true,
    pest: true,
    market: false,
    sms: true,
    email: false,
    phoneNumber: ""
  });

  const notifications: AlertNotification[] = [
    {
      id: '1',
      type: 'weather',
      priority: 'high',
      title: '⚠️ Heavy rain expected tomorrow',
      message: 'Avoid pesticide spraying today. Heavy rainfall (25-30mm) expected tomorrow morning. Ensure proper drainage in fields.',
      timestamp: '2 hours ago',
      actionRequired: true,
      isRead: false
    },
    {
      id: '2',
      type: 'irrigation',
      priority: 'medium',
      title: '💧 Increase irrigation frequency',
      message: 'High heat forecast for next 5 days (32-35°C). Increase irrigation frequency for cotton crops to prevent water stress.',
      timestamp: '6 hours ago',
      actionRequired: true,
      isRead: false
    },
    {
      id: '3',
      type: 'pest',
      priority: 'high',
      title: '🐛 Pink bollworm alert',
      message: 'High humidity levels detected. Increased risk of pink bollworm in cotton. Monitor crops closely and consider preventive measures.',
      timestamp: '1 day ago',
      actionRequired: true,
      isRead: true
    },
    {
      id: '4',
      type: 'market',
      priority: 'low',
      title: '📈 Cotton prices rising',
      message: 'Cotton prices have increased by 8% in local mandis. Current rate: ₹6,850-7,025 per quintal. Good time to sell.',
      timestamp: '2 days ago',
      actionRequired: false,
      isRead: true
    },
    {
      id: '5',
      type: 'weather',
      priority: 'medium',
      title: '☀️ Sunny weather ahead',
      message: 'Clear skies for next 3 days. Perfect conditions for harvesting. Temperature: 28-30°C, low humidity.',
      timestamp: '3 days ago',
      actionRequired: false,
      isRead: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return <Cloud className="h-4 w-4" />;
      case 'irrigation': return <Droplets className="h-4 w-4" />;
      case 'pest': return <AlertTriangle className="h-4 w-4" />;
      case 'market': return <Bell className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low': return <Badge variant="secondary" className="bg-green-100 text-green-800">Low</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.isRead).length;

  const handleSettingChange = (key: keyof AlertSettings, value: boolean | string) => {
    setAlertSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <Header title="Notification Alerts" showLogo={false} />
      
      <main className="container mx-auto px-4 py-6">
        {userLocation && (
          <div className="flex items-center space-x-2 text-muted-foreground mb-6">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {userLocation.district}, {userLocation.state}
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <Button 
            variant={activeTab === 'alerts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('alerts')}
            className="flex items-center space-x-2"
          >
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
          <Button 
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('settings')}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>

        {activeTab === 'alerts' && (
          <>
            {/* Alert Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{actionRequiredCount}</p>
                      <p className="text-sm text-muted-foreground">Action Required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                      <p className="text-sm text-muted-foreground">Unread Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{notifications.length}</p>
                      <p className="text-sm text-muted-foreground">Total Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert List */}
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`shadow-card border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'ring-2 ring-blue-200' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(notification.type)}
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">
                              {notification.title}
                            </h3>
                            {getPriorityBadge(notification.priority)}
                            {notification.actionRequired && (
                              <Badge variant="outline" className="border-orange-300 text-orange-600">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      
                      {notification.actionRequired && !notification.isRead && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Alert Types */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Alert Categories</CardTitle>
                <CardDescription>
                  Choose which types of alerts you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Cloud className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Weather Alerts</p>
                      <p className="text-sm text-muted-foreground">Rain, temperature, humidity warnings</p>
                    </div>
                  </div>
                  <Switch 
                    checked={alertSettings.weather}
                    onCheckedChange={(checked) => handleSettingChange('weather', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Irrigation Alerts</p>
                      <p className="text-sm text-muted-foreground">Water management and irrigation reminders</p>
                    </div>
                  </div>
                  <Switch 
                    checked={alertSettings.irrigation}
                    onCheckedChange={(checked) => handleSettingChange('irrigation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Pest & Disease Alerts</p>
                      <p className="text-sm text-muted-foreground">Crop health and protection warnings</p>
                    </div>
                  </div>
                  <Switch 
                    checked={alertSettings.pest}
                    onCheckedChange={(checked) => handleSettingChange('pest', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Market Alerts</p>
                      <p className="text-sm text-muted-foreground">Price changes and market opportunities</p>
                    </div>
                  </div>
                  <Switch 
                    checked={alertSettings.market}
                    onCheckedChange={(checked) => handleSettingChange('market', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Methods */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Delivery Methods</CardTitle>
                <CardDescription>
                  How would you like to receive alerts?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts via text message</p>
                    </div>
                  </div>
                  <Switch 
                    checked={alertSettings.sms}
                    onCheckedChange={(checked) => handleSettingChange('sms', checked)}
                  />
                </div>

                {alertSettings.sms && (
                  <div className="ml-8 space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={alertSettings.phoneNumber}
                      onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive detailed reports via email</p>
                    </div>
                  </div>
                  <Switch 
                    checked={alertSettings.email}
                    onCheckedChange={(checked) => handleSettingChange('email', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <Button className="w-full" size="lg">
                  Save Alert Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default NotificationAlerts;