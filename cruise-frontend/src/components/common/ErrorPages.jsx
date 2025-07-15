import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Home,
  ArrowLeft,
  RefreshCw,
  Shield,
  Search,
  HelpCircle,
  Mail,
  Phone,
  Clock,
  Wifi,
  Server,
  AlertCircle,
} from "lucide-react";

// 404 Not Found Component
const NotFound = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  showSearchSuggestions = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions] = useState([
    {
      title: "Booking Form",
      path: "/booking",
      description: "Make a new reservation",
    },
    {
      title: "Admin Dashboard",
      path: "/admin",
      description: "Manage cruise operations",
    },
    {
      title: "Staff Dashboard",
      path: "/staff",
      description: "View tasks and assignments",
    },
    {
      title: "Guest Services",
      path: "/services",
      description: "Explore available services",
    },
    {
      title: "Help Center",
      path: "/help",
      description: "Get assistance and support",
    },
  ]);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6">
            <Search className="h-16 w-16 text-pink-600" />
          </div>
          <div className="text-6xl font-bold text-pink-600 mb-2">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </button>
        </div>

        {/* Search Suggestions */}
        {showSearchSuggestions && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Looking for something specific?
            </h3>

            <div className="relative mb-4">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => (window.location.href = suggestion.path)}
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {suggestion.description}
                    </p>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
                </div>
              ))}
              {filteredSuggestions.length === 0 && searchTerm && (
                <p className="text-gray-500 text-center py-4">
                  No suggestions found for "{searchTerm}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Still need help?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@cruiseship.com"
              className="flex items-center justify-center space-x-2 text-pink-600 hover:text-pink-800"
            >
              <Mail className="h-4 w-4" />
              <span>support@cruiseship.com</span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center space-x-2 text-pink-600 hover:text-pink-800"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// 403 Unauthorized Component
const Unauthorized = ({
  title = "Access Denied",
  message = "You don't have permission to access this resource.",
  showLoginButton = true,
}) => {
  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleContactSupport = () => {
    window.location.href = "/support";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-red-600" />
          </div>
          <div className="text-6xl font-bold text-red-600 mb-2">403</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{message}</p>
        </div>

        {/* Possible Reasons */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            This might be because:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
              <span>You're not logged in with the required permissions</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
              <span>Your session has expired</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
              <span>This area is restricted to specific user roles</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
              <span>Maintenance mode is currently active</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {showLoginButton && (
            <button
              onClick={handleLogin}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Shield className="h-5 w-5" />
              <span>Login</span>
            </button>
          )}
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </button>
          <button
            onClick={handleContactSupport}
            className="flex items-center justify-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Contact Support</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-pink-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you believe you should have access to this resource, please
            contact your administrator or our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:admin@cruiseship.com"
              className="flex items-center justify-center space-x-2 text-pink-600 hover:text-pink-800"
            >
              <Mail className="h-4 w-4" />
              <span>admin@cruiseship.com</span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center space-x-2 text-pink-600 hover:text-pink-800"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const Loading = ({
  message = "Loading...",
  subMessage = "Please wait while we prepare your content",
  showProgress = false,
  progress = 0,
  variant = "default", // default, fullscreen, inline
}) => {
  const [dots, setDots] = useState("");
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= progress) return progress;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [progress, showProgress]);

  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-pink-600 mx-auto mb-2" />
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 animate-spin text-pink-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {message}
              {dots}
            </h2>
            <p className="text-gray-600">{subMessage}</p>
          </div>

          {showProgress && (
            <div className="w-64 mx-auto">
              <div className="bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {currentProgress}% Complete
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6">
            <RefreshCw className="h-12 w-12 animate-spin text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {message}
            {dots}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{subMessage}</p>
        </div>

        {showProgress && (
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-pink-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{currentProgress}% Complete</p>
          </div>
        )}

        {/* Loading Animation */}
        <div className="flex justify-center space-x-1 mb-8">
          <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  Database Connection
                </span>
              </div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">API Services</span>
              </div>
              <span className="text-sm font-medium text-green-600">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-pink-500" />
                <span className="text-sm text-gray-600">
                  Processing Request
                </span>
              </div>
              <span className="text-sm font-medium text-pink-600">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      setHasError(true);
      setError(error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  const handleRetry = () => {
    setHasError(false);
    setError(null);
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're sorry, but something unexpected happened. Please try again.
            </p>
          </div>

          {error && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error Details
              </h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded font-mono">
                {error.message || "Unknown error occurred"}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Go Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

// Demo Component to showcase all error pages
const ErrorPagesDemo = () => {
  const [currentPage, setCurrentPage] = useState("demo");
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (currentPage === "loading-progress") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "404":
        return <NotFound />;
      case "403":
        return <Unauthorized />;
      case "loading":
        return (
          <Loading
            message="Loading Dashboard"
            subMessage="Preparing your cruise management interface"
          />
        );
      case "loading-progress":
        return (
          <Loading
            message="Setting up your workspace"
            subMessage="Loading cruise management system"
            showProgress={true}
            progress={loadingProgress}
          />
        );
      case "loading-fullscreen":
        return (
          <Loading
            message="System Update"
            subMessage="Installing new features"
            variant="fullscreen"
          />
        );
      case "loading-inline":
        return (
          <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Dashboard
              </h1>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Loading message="Loading content" variant="inline" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Error Pages Demo
              </h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <button
                  onClick={() => setCurrentPage("404")}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Search className="h-6 w-6 text-pink-600" />
                    <h3 className="text-lg font-semibold">404 Not Found</h3>
                  </div>
                  <p className="text-gray-600">
                    Page not found with search suggestions
                  </p>
                </button>

                <button
                  onClick={() => setCurrentPage("403")}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold">403 Unauthorized</h3>
                  </div>
                  <p className="text-gray-600">
                    Access denied with helpful information
                  </p>
                </button>

                <button
                  onClick={() => setCurrentPage("loading")}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <RefreshCw className="h-6 w-6 text-pink-600" />
                    <h3 className="text-lg font-semibold">Loading (Default)</h3>
                  </div>
                  <p className="text-gray-600">Standard loading page</p>
                </button>

                <button
                  onClick={() => {
                    setLoadingProgress(0);
                    setCurrentPage("loading-progress");
                  }}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold">
                      Loading with Progress
                    </h3>
                  </div>
                  <p className="text-gray-600">Loading with progress bar</p>
                </button>

                <button
                  onClick={() => setCurrentPage("loading-fullscreen")}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Server className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-semibold">
                      Fullscreen Loading
                    </h3>
                  </div>
                  <p className="text-gray-600">Fullscreen loading overlay</p>
                </button>

                <button
                  onClick={() => setCurrentPage("loading-inline")}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Wifi className="h-6 w-6 text-orange-600" />
                    <h3 className="text-lg font-semibold">Inline Loading</h3>
                  </div>
                  <p className="text-gray-600">Inline loading component</p>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return <ErrorBoundary>{renderCurrentPage()}</ErrorBoundary>;
};

export default ErrorPagesDemo;
export { NotFound, Unauthorized, Loading, ErrorBoundary };
