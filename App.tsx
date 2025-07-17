import React, {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import {
  Menu,
  Home,
  Briefcase,
  PieChart,
  TrendingUp,
  Heart,
  Wallet,
  Gift,
  Sprout,
  Users,
  User,
  History,
  HelpCircle,
  FileText,
  X,
  Search,
  Bell,
  Settings,
  MoreHorizontal,
  Building,
  Percent,
  ChevronRight,
} from "lucide-react";

// Import the custom pages
import AssetsPage from "./components/AssetsPage";
import FractionalAssetsPage from "./components/FractionalAssetsPage";
import PriceProjectionsPage from "./components/PriceProjectionsPage";
import WholesomePage from "./components/WholesomePage";
import MyWalletsPage from "./components/MyWalletsPage";
import RewardsPage from "./components/RewardsPage";
import FarmingPage from "./components/FarmingPage";
import ReferAndEarnPage from "./components/ReferAndEarnPage";
import ProfilePage from "./components/ProfilePage";
import PortfolioPage from "./components/PortfolioPage";
import TransactionHistoryPage from "./components/TransactionHistoryPage";
import SupportPage from "./components/SupportPage";
import DetailsPage from "./components/DetailsPage";
import MobileDashboardHome from "./components/MobileDashboardHome";

// Import all the authentic Figma components
import FigmaAuthenticatedDashboard from "./imports/Dashboard-1-33019";
import FigmaAssetsPage from "./imports/Dashboard-1-13304";
import FigmaMainDashboard from "./imports/Dashboard-1-349";
import FigmaFrame from "./imports/Frame1321316316";

// Navigation Context
const NavigationContext = createContext<{
  currentPage: string;
  navigate: (page: string) => void;
  isMobile: boolean;
  isTablet: boolean;
  canGoBack: boolean;
  goBack: () => void;
}>({
  currentPage: "home",
  navigate: () => {},
  isMobile: false,
  isTablet: false,
  canGoBack: false,
  goBack: () => {},
});

export const useNavigation = () =>
  useContext(NavigationContext);

// Enhanced Mobile Detection Hook
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDeviceType({
        isMobile,
        isTablet,
        isDesktop,
      });

      // Add classes to body for CSS targeting
      document.body.classList.toggle("mobile-app", isMobile);
      document.body.classList.toggle("tablet-app", isTablet);
      document.body.classList.toggle("desktop-app", isDesktop);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () =>
      window.removeEventListener("resize", checkDeviceType);
  }, []);

  return deviceType;
};

// Complete navigation items configuration - ALL PAGES INCLUDED
const navigationItems = [
  // PRIMARY NAVIGATION (Bottom Navigation on Mobile)
  {
    id: "home",
    label: "Home",
    icon: Home,
    primary: true,
    category: "main",
  },
  {
    id: "assets",
    label: "Assets",
    icon: Briefcase,
    primary: true,
    category: "main",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: PieChart,
    primary: true,
    category: "main",
  },
  {
    id: "wallets",
    label: "Wallets",
    icon: Wallet,
    primary: true,
    category: "main",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    primary: true,
    category: "main",
  },

  // SECONDARY NAVIGATION (Hamburger Menu on Mobile)
  {
    id: "fractional",
    label: "Fractional Assets",
    icon: Percent,
    primary: false,
    category: "invest",
  },
  {
    id: "wholesome",
    label: "Wholesome Assets",
    icon: Heart,
    primary: false,
    category: "invest",
  },
  {
    id: "price-projections",
    label: "Price Projections",
    icon: TrendingUp,
    primary: false,
    category: "analytics",
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: Gift,
    primary: false,
    category: "earn",
  },
  {
    id: "farming",
    label: "Farming",
    icon: Sprout,
    primary: false,
    category: "earn",
  },
  {
    id: "refer-and-earn",
    label: "Refer & Earn",
    icon: Users,
    primary: false,
    category: "earn",
  },
  {
    id: "transaction-history",
    label: "Transactions",
    icon: History,
    primary: false,
    category: "account",
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
    primary: false,
    category: "account",
  },
  {
    id: "details",
    label: "Details",
    icon: FileText,
    primary: false,
    category: "detail",
  },
];

// Enhanced Mobile Bottom Navigation with forced visibility
const MobileBottomNavigation = () => {
  const { currentPage, navigate } = useNavigation();
  const primaryItems = navigationItems.filter(
    (item) => item.primary,
  );

  const handleNavigation = (pageId: string) => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    navigate(pageId);
  };

  return (
    <div
      className="mobile-nav"
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "rgba(18, 19, 24, 0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid #3f4948",
        zIndex: "1000",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        display: "block",
        visibility: "visible",
        opacity: "1",
      }}
    >
      <div className="flex items-center justify-around py-2 px-2">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[64px] touch-target-lg ${
                isActive
                  ? "bg-auth-dashboard-accent text-accent-foreground scale-105"
                  : "text-auth-dashboard-text hover:text-auth-dashboard-accent hover:bg-auth-dashboard-card/50"
              }`}
              style={{
                minHeight: "56px",
                minWidth: "56px",
              }}
            >
              <Icon
                className={`w-5 h-5 mb-1 ${isActive ? "scale-110" : ""} transition-transform`}
              />
              <span
                className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-accent-foreground rounded-full mt-1 animate-bounce-in" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced Mobile Header with improved navigation menu
const MobileHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { currentPage, navigate, canGoBack, goBack } =
    useNavigation();

  const currentItem = navigationItems.find(
    (item) => item.id === currentPage,
  );
  const secondaryItems = navigationItems.filter(
    (item) => !item.primary,
  );

  // Group secondary items by category
  const groupedItems = secondaryItems.reduce(
    (acc, item) => {
      const category = item.category || "other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, typeof secondaryItems>,
  );

  const categoryLabels = {
    invest: "Investment Options",
    analytics: "Analytics & Research",
    earn: "Earn Rewards",
    account: "Account Management",
    detail: "Details & Information",
    other: "Other",
  };

  const categoryIcons = {
    invest: Building,
    analytics: TrendingUp,
    earn: Gift,
    account: Settings,
    detail: FileText,
    other: MoreHorizontal,
  };

  return (
    <div
      className="mobile-header"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        backgroundColor: "rgba(18, 19, 24, 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #3f4948",
        zIndex: "1000",
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        display: "block",
        visibility: "visible",
        opacity: "1",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-auth-dashboard-accent to-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-accent-foreground font-bold text-sm">
              RWA
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {currentItem?.label || "RWA Platform"}
            </h1>
            <p className="text-xs text-auth-dashboard-text-muted">
              Real World Assets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg text-auth-dashboard-text hover:text-auth-dashboard-accent hover:bg-auth-dashboard-card/50 transition-all interactive-button"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-lg text-auth-dashboard-text hover:text-auth-dashboard-accent hover:bg-auth-dashboard-card/50 transition-all interactive-button relative"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            <Bell className="w-5 h-5" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </button>

          <Sheet
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-auth-dashboard-card/50 p-2 rounded-lg interactive-button"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[90vw] max-w-[400px] bg-auth-dashboard-surface/98 backdrop-blur-xl border-auth-dashboard-border mobile-sidebar overflow-y-auto"
            >
              <SheetHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-foreground font-semibold text-lg">
                    Navigation Menu
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-auth-dashboard-text hover:text-foreground p-2 rounded-lg interactive-button"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <SheetDescription className="text-auth-dashboard-text-muted text-sm text-left">
                  Access all RWA platform features including
                  investment options, portfolio management, and
                  account settings.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mobile-content">
                {/* User Profile Section */}
                <div
                  className="flex items-center gap-3 p-4 bg-auth-dashboard-card/50 rounded-xl cursor-pointer hover:bg-auth-dashboard-card/70 transition-all"
                  onClick={() => {
                    navigate("profile");
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-auth-dashboard-accent to-primary rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      John Doe
                    </p>
                    <p className="text-sm text-auth-dashboard-text-muted">
                      Premium Member
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-auth-dashboard-text" />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      navigate("assets");
                      setMobileMenuOpen(false);
                    }}
                    className="flex flex-col items-center gap-2 p-4 bg-auth-dashboard-card/30 rounded-xl hover:bg-auth-dashboard-card/50 transition-all"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Browse Assets
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("portfolio");
                      setMobileMenuOpen(false);
                    }}
                    className="flex flex-col items-center gap-2 p-4 bg-auth-dashboard-card/30 rounded-xl hover:bg-auth-dashboard-card/50 transition-all"
                  >
                    <div className="w-10 h-10 bg-status-success-bg rounded-lg flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-status-success" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      My Portfolio
                    </span>
                  </button>
                </div>

                {/* Navigation Categories */}
                <div className="space-y-1">
                  {Object.entries(groupedItems).map(
                    ([category, items]) => {
                      const CategoryIcon =
                        categoryIcons[
                          category as keyof typeof categoryIcons
                        ] || Building;
                      return (
                        <div
                          key={category}
                          className="border border-auth-dashboard-border rounded-xl overflow-hidden"
                        >
                          {/* Category Header */}
                          <div className="bg-auth-dashboard-card/30 px-4 py-3 border-b border-auth-dashboard-border">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-auth-dashboard-accent/10 rounded-lg flex items-center justify-center">
                                <CategoryIcon className="w-4 h-4 text-auth-dashboard-accent" />
                              </div>
                              <h3 className="font-medium text-foreground">
                                {
                                  categoryLabels[
                                    category as keyof typeof categoryLabels
                                  ]
                                }
                              </h3>
                            </div>
                          </div>

                          {/* Category Items */}
                          <div className="bg-auth-dashboard-surface/50">
                            {items.map((item, index) => {
                              const Icon = item.icon;
                              const isActive =
                                currentPage === item.id;
                              const isLast =
                                index === items.length - 1;

                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    navigate(item.id);
                                    setMobileMenuOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-auth-dashboard-card/50 ${
                                    !isLast
                                      ? "border-b border-auth-dashboard-border/50"
                                      : ""
                                  } ${
                                    isActive
                                      ? "bg-auth-dashboard-accent/10 text-auth-dashboard-accent border-l-4 border-l-auth-dashboard-accent"
                                      : "text-auth-dashboard-text hover:text-auth-dashboard-accent"
                                  }`}
                                >
                                  <Icon className="w-5 h-5 flex-shrink-0" />
                                  <span className="font-medium flex-1">
                                    {item.label}
                                  </span>
                                  {isActive && (
                                    <div className="w-2 h-2 bg-auth-dashboard-accent rounded-full" />
                                  )}
                                  <ChevronRight className="w-4 h-4 opacity-50" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>

                {/* Settings Section */}
                <div className="border-t border-auth-dashboard-border pt-4">
                  <button
                    className="w-full flex items-center gap-3 p-4 rounded-xl text-auth-dashboard-text hover:text-auth-dashboard-accent hover:bg-auth-dashboard-card/50 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-auth-dashboard-surface rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <span className="font-medium flex-1">
                      Settings & Preferences
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                </div>

                {/* App Info */}
                <div className="text-center py-4 border-t border-auth-dashboard-border">
                  <p className="text-xs text-auth-dashboard-text-muted">
                    RWA Platform v1.0.0
                  </p>
                  <p className="text-xs text-auth-dashboard-text-muted">
                    Real World Asset Tokenization
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-4 pb-3 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-auth-dashboard-text" />
            <input
              type="text"
              placeholder="Search assets, portfolios, transactions..."
              className="w-full pl-10 pr-4 py-3 bg-auth-dashboard-card/50 border border-auth-dashboard-border rounded-lg text-foreground placeholder-auth-dashboard-text focus:outline-none focus:ring-2 focus:ring-auth-dashboard-accent focus:border-auth-dashboard-accent"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Desktop/Tablet Sidebar with all navigation items
const DesktopSidebar = () => {
  const { currentPage, navigate } = useNavigation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${collapsed ? "w-16" : "w-64"} bg-auth-dashboard-surface/95 backdrop-blur-lg border-r border-auth-dashboard-border min-h-screen p-4 hidden md:block transition-all duration-300 desktop-sidebar`}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-auth-dashboard-accent to-primary rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-accent-foreground font-bold">
            RWA
          </span>
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              RWA Platform
            </h1>
            <p className="text-xs text-auth-dashboard-text-muted">
              Real World Assets
            </p>
          </div>
        )}
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 interactive-button ${
                isActive
                  ? "bg-auth-dashboard-accent text-accent-foreground"
                  : "text-auth-dashboard-text hover:text-auth-dashboard-accent hover:bg-auth-dashboard-card/50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mt-8 pt-6 border-t border-auth-dashboard-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-auth-dashboard-text hover:text-auth-dashboard-accent hover:bg-auth-dashboard-card/50 transition-all interactive-button"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="font-medium">Collapse</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Enhanced page wrappers with consistent mobile layout
const createEnhancedPageWrapper = (
  FigmaComponent: React.ComponentType,
  pageName: string,
) => {
  return () => {
    const { navigate, isMobile } = useNavigation();

    const handleNavigate = (page: string) => {
      navigate(page);
    };

    return (
      <div
        className={`min-h-screen bg-auth-dashboard-bg animate-fade-in figma-import-wrapper ${
          isMobile ? "mobile-page-container" : ""
        }`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const text = target.textContent?.trim();

          // Enhanced navigation logic
          const navigationMap: Record<string, string> = {
            Assets: "assets",
            Home: "home",
            Portfolio: "portfolio",
            "Price Projections": "price-projections",
            Wholesome: "wholesome",
            Fractional: "fractional",
            "My Wallets": "wallets",
            Wallets: "wallets",
            Rewards: "rewards",
            Farming: "farming",
            "Refer & Earn": "refer-and-earn",
            "My Profile": "profile",
            Profile: "profile",
            "Transaction History": "transaction-history",
            Transactions: "transaction-history",
            Support: "support",
            "John Doe": "profile",
            View: "assets",
            "Buy Now": "assets",
            "Learn more": "assets",
            Buy: "assets",
            Explore: "details",
            "View Details": "details",
            "Fractional Assets": "fractional",
            "Wholesome Assets": "wholesome",
          };

          if (navigationMap[text || ""]) {
            handleNavigate(navigationMap[text || ""]);
          }
        }}
      >
        <div className="figma-main-content">
          <FigmaComponent />
        </div>
      </div>
    );
  };
};

// Create enhanced page components for Figma imports
const EnhancedAuthenticatedHomeDashboard =
  createEnhancedPageWrapper(
    FigmaAuthenticatedDashboard,
    "Home",
  );
const EnhancedMainDashboard = createEnhancedPageWrapper(
  FigmaMainDashboard,
  "Main Dashboard",
);
const EnhancedFrameComponent = createEnhancedPageWrapper(
  FigmaFrame,
  "Frame",
);

// Main App Component with Enhanced Mobile Features
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [navigationHistory, setNavigationHistory] = useState<
    string[]
  >(["home"]);
  const { isMobile, isTablet } = useDeviceType();

  const navigate = (page: string) => {
    setCurrentPage(page);
    setNavigationHistory((prev) => [...prev, page]);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  };

  const canGoBack = navigationHistory.length > 1;

  const contextValue = {
    currentPage,
    navigate,
    isMobile,
    isTablet,
    canGoBack,
    goBack,
  };

  // Complete page routing with all pages accessible
  const renderCurrentPage = () => {
    // Use mobile-optimized home page for mobile devices
    if (currentPage === "home" && isMobile) {
      return <MobileDashboardHome />;
    }

    // Complete page mapping - ALL PAGES INCLUDED
    const pageMap: Record<string, React.ComponentType> = {
      // PRIMARY PAGES
      home: isMobile
        ? MobileDashboardHome
        : EnhancedAuthenticatedHomeDashboard,
      assets: AssetsPage,
      portfolio: PortfolioPage,
      wallets: MyWalletsPage,
      profile: ProfilePage,

      // SECONDARY PAGES - INVESTMENT
      fractional: FractionalAssetsPage,
      wholesome: WholesomePage,

      // SECONDARY PAGES - ANALYTICS
      "price-projections": PriceProjectionsPage,

      // SECONDARY PAGES - EARN
      rewards: RewardsPage,
      farming: FarmingPage,
      "refer-and-earn": ReferAndEarnPage,

      // SECONDARY PAGES - ACCOUNT
      "transaction-history": TransactionHistoryPage,
      support: SupportPage,

      // DETAIL PAGES
      details: DetailsPage,

      // FIGMA IMPORTS
      frame: EnhancedFrameComponent,
      main: EnhancedMainDashboard,
    };

    const PageComponent =
      pageMap[currentPage] ||
      EnhancedAuthenticatedHomeDashboard;

    return (
      <div className="transition-all duration-300 ease-in-out">
        <PageComponent />
      </div>
    );
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      <div
        className={`min-h-screen dark bg-auth-dashboard-bg pwa-container ${isMobile ? "mobile-app-mode" : "desktop-app-mode"}`}
      >
        {/* Mobile Header - Always render on mobile with forced visibility */}
        {isMobile && <MobileHeader />}

        {/* Desktop/Tablet Sidebar */}
        {!isMobile && <DesktopSidebar />}

        {/* Main Content */}
        <main
          className={`${isMobile ? "mobile-main-content" : "ml-64"} transition-all duration-300`}
          style={
            isMobile
              ? {
                  paddingTop:
                    "calc(64px + env(safe-area-inset-top))",
                  paddingBottom:
                    "calc(80px + env(safe-area-inset-bottom))",
                  minHeight: "100vh",
                }
              : {}
          }
        >
          {renderCurrentPage()}
        </main>

        {/* Mobile Bottom Navigation - Always render on mobile with forced visibility */}
        {isMobile && <MobileBottomNavigation />}
      </div>
    </NavigationContext.Provider>
  );
}