import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { 
  Utensils, BookOpen, Film, Home, Scissors, Dumbbell, 
  GlassWater, ShoppingCart, ClipboardList, LogOut, User as UserIcon
} from "lucide-react";

const VoyagerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("catering");
  
  // Data lists
  const [cateringItems, setCateringItems] = useState([]);
  const [stationeryItems, setStationeryItems] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  
  // Cart state
  const [cart, setCart] = useState([]);

  // Booking form states
  const [movieForm, setMovieForm] = useState({ movieName: "", date: "", seats: "1" });
  const [resortView, setResortView] = useState("Ocean View");
  const [salonForm, setSalonForm] = useState({ service: "Haircut", date: "", time: "" });
  const [fitnessForm, setFitnessForm] = useState({ equipment: "Treadmill", date: "", time: "" });
  const [partyHallType, setPartyHallType] = useState("Birthday");

  // Fetch Items
  const fetchData = async () => {
    try {
      const catRes = await axios.get("/api/catering");
      setCateringItems(catRes.data);
    } catch (err) {
      console.error("Error fetching catering items");
    }

    try {
      const statRes = await axios.get("/api/stationery");
      setStationeryItems(statRes.data);
    } catch (err) {
      console.error("Error fetching stationery items");
    }

    try {
      const ordersRes = await axios.get("/api/orders/my-orders");
      setMyOrders(ordersRes.data);
    } catch (err) {
      console.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (item, type) => {
    setCart((prev) => [...prev, { ...item, cartType: type, cartId: Date.now() + Math.random() }]);
    toast.success(`Added ${item.name || item.type} to cart!`);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    toast.success("Removed from cart");
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      for (const item of cart) {
        let details = {};
        if (item.cartType === "catering" || item.cartType === "stationery") {
          details = { name: item.name, price: item.price, description: item.description };
        } else {
          details = item.details;
        }

        await axios.post("/api/orders", {
          type: item.cartType,
          details: details
        });
      }

      toast.success("Orders placed successfully!");
      setCart([]);
      setActiveTab("myorders");
      // refresh orders
      const ordersRes = await axios.get("/api/orders/my-orders");
      setMyOrders(ordersRes.data);
    } catch (err) {
      toast.error("Failed to place orders");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shadow-lg">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <span className="text-2xl font-bold tracking-wider text-blue-400">🚢 CRUISE CO.</span>
          </div>

          {/* User Info */}
          <div className="p-4 mx-4 my-3 bg-slate-800 rounded-lg flex items-center gap-3">
            <UserIcon className="text-blue-400 w-5 h-5" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.username}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-2 space-y-1">
            <button
              onClick={() => setActiveTab("catering")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "catering" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Utensils className="w-5 h-5" /> Catering
            </button>

            <button
              onClick={() => setActiveTab("stationery")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "stationery" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <BookOpen className="w-5 h-5" /> Stationery
            </button>

            <button
              onClick={() => setActiveTab("movie")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "movie" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Film className="w-5 h-5" /> Movie Booking
            </button>

            <button
              onClick={() => setActiveTab("resort")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "resort" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Home className="w-5 h-5" /> Resort Booking
            </button>

            <button
              onClick={() => setActiveTab("salon")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "salon" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Scissors className="w-5 h-5" /> Salon Booking
            </button>

            <button
              onClick={() => setActiveTab("fitness")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "fitness" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Dumbbell className="w-5 h-5" /> Fitness Booking
            </button>

            <button
              onClick={() => setActiveTab("party")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "party" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <GlassWater className="w-5 h-5" /> Party Hall Booking
            </button>

            <button
              onClick={() => setActiveTab("cart")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "cart" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" /> Cart
              </span>
              {cart.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("myorders");
                fetchData();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "myorders" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <ClipboardList className="w-5 h-5" /> My Orders
            </button>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {/* Tab contents */}
        
        {/* Catering Tab */}
        {activeTab === "catering" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Utensils className="w-7 h-7 text-blue-600" /> Dining & Catering Services
            </h1>
            {cateringItems.length === 0 ? (
              <div className="bg-white p-10 rounded-xl shadow-sm border text-center">
                <p className="text-gray-500 text-lg">No catering items currently available on the ship. 🚢</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cateringItems.map((item) => (
                  <div key={item._id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400"} 
                      alt={item.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xl font-semibold text-slate-900">${item.price}</span>
                        <button
                          onClick={() => addToCart(item, "catering")}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stationery Tab */}
        {activeTab === "stationery" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-blue-600" /> Books & Stationery Store
            </h1>
            {stationeryItems.length === 0 ? (
              <div className="bg-white p-10 rounded-xl shadow-sm border text-center">
                <p className="text-gray-500 text-lg">No stationery items currently available. 🚢</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stationeryItems.map((item) => (
                  <div key={item._id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400"} 
                      alt={item.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xl font-semibold text-slate-900">${item.price}</span>
                        <button
                          onClick={() => addToCart(item, "stationery")}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Movie Booking Tab */}
        {activeTab === "movie" && (
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Film className="w-7 h-7 text-blue-600" /> Book a Movie Show
            </h1>
            <div className="bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Movie Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Titanic 3D"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                    value={movieForm.movieName}
                    onChange={(e) => setMovieForm({ ...movieForm, movieName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                      value={movieForm.date}
                      onChange={(e) => setMovieForm({ ...movieForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Seats</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                      value={movieForm.seats}
                      onChange={(e) => setMovieForm({ ...movieForm, seats: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!movieForm.movieName || !movieForm.date) {
                      toast.error("Please fill in all movie fields");
                      return;
                    }
                    addToCart({
                      name: `Movie: ${movieForm.movieName}`,
                      description: `Date: ${movieForm.date} | Seats: ${movieForm.seats}`,
                      details: movieForm
                    }, "movie");
                    setMovieForm({ movieName: "", date: "", seats: "1" });
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resort Booking Tab */}
        {activeTab === "resort" && (
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Home className="w-7 h-7 text-blue-600" /> Room & Resort Lounge Booking
            </h1>
            <div className="bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select View/Option</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Ocean View", "Balcony View", "Corridor View", "Lounge"].map((view) => (
                      <button
                        key={view}
                        type="button"
                        onClick={() => setResortView(view)}
                        className={`px-4 py-3 rounded-lg border text-sm font-semibold transition text-left ${
                          resortView === view 
                            ? "border-blue-600 bg-blue-50 text-blue-600" 
                            : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart({
                      name: `Resort Room: ${resortView}`,
                      description: "Luxurious onboard cabin reservation request",
                      details: { viewType: resortView }
                    }, "resort");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Salon Booking Tab */}
        {activeTab === "salon" && (
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Scissors className="w-7 h-7 text-blue-600" /> Onboard Salon Appointment
            </h1>
            <div className="bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                    value={salonForm.service}
                    onChange={(e) => setSalonForm({ ...salonForm, service: e.target.value })}
                  >
                    <option value="Haircut">Haircut</option>
                    <option value="Hair Styling">Hair Styling & Grooming</option>
                    <option value="Facial Spa">Facial & Spa treatment</option>
                    <option value="Manicure">Manicure & Pedicure</option>
                    <option value="Full Massage">Full Body Therapeutic Massage</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                      value={salonForm.date}
                      onChange={(e) => setSalonForm({ ...salonForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                      value={salonForm.time}
                      onChange={(e) => setSalonForm({ ...salonForm, time: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!salonForm.date || !salonForm.time) {
                      toast.error("Please fill in salon appointment date and time");
                      return;
                    }
                    addToCart({
                      name: `Salon: ${salonForm.service}`,
                      description: `Date: ${salonForm.date} at ${salonForm.time}`,
                      details: salonForm
                    }, "salon");
                    setSalonForm({ service: "Haircut", date: "", time: "" });
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fitness Booking Tab */}
        {activeTab === "fitness" && (
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Dumbbell className="w-7 h-7 text-blue-600" /> Fitness Center & Trainer Booking
            </h1>
            <div className="bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Select Equipment / Session</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                    value={fitnessForm.equipment}
                    onChange={(e) => setFitnessForm({ ...fitnessForm, equipment: e.target.value })}
                  >
                    <option value="Treadmill">Treadmill Slot (1 Hour)</option>
                    <option value="Elliptical">Elliptical Slot (1 Hour)</option>
                    <option value="Personal Trainer">1-on-1 Personal Trainer Session</option>
                    <option value="Yoga Class">Yoga & Pilates Group Class</option>
                    <option value="Gym Access">General Gym Access Pass</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                      value={fitnessForm.date}
                      onChange={(e) => setFitnessForm({ ...fitnessForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none bg-white text-gray-800"
                      value={fitnessForm.time}
                      onChange={(e) => setFitnessForm({ ...fitnessForm, time: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!fitnessForm.date || !fitnessForm.time) {
                      toast.error("Please fill in gym slot date and time");
                      return;
                    }
                    addToCart({
                      name: `Fitness: ${fitnessForm.equipment}`,
                      description: `Slot Date: ${fitnessForm.date} at ${fitnessForm.time}`,
                      details: fitnessForm
                    }, "fitness");
                    setFitnessForm({ equipment: "Treadmill", date: "", time: "" });
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Party Hall Booking Tab */}
        {activeTab === "party" && (
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <GlassWater className="w-7 h-7 text-blue-600" /> Deck Banquet & Party Hall Reservations
            </h1>
            <div className="bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Category Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Birthday", "Wedding", "Engagement", "Business", "Get Together"].map((evt) => (
                      <button
                        key={evt}
                        type="button"
                        onClick={() => setPartyHallType(evt)}
                        className={`px-4 py-3 rounded-lg border text-sm font-semibold transition text-left ${
                          partyHallType === evt 
                            ? "border-blue-600 bg-blue-50 text-blue-600" 
                            : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {evt}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart({
                      name: `Banquet Hall: ${partyHallType}`,
                      description: `Dedicated reservation request for a ${partyHallType} event.`,
                      details: { bookingType: partyHallType }
                    }, "partyhall");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-blue-600" /> Shopping & Booking Cart
            </h1>
            {cart.length === 0 ? (
              <div className="bg-white border p-12 rounded-xl text-center shadow-sm">
                <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Browse dining menus or book cruise services to add items here.</p>
                <button
                  onClick={() => setActiveTab("catering")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
                >
                  Browse Catering
                </button>
              </div>
            ) : (
              <div className="bg-white border rounded-xl shadow-sm overflow-hidden max-w-4xl">
                <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-700">{cart.length} items selected</span>
                  <button
                    onClick={() => setCart([])}
                    className="text-sm font-semibold text-red-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.cartId} className="p-6 flex items-center justify-between">
                      <div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-wide mr-2">
                          {item.cartType}
                        </span>
                        <h4 className="text-lg font-bold text-slate-800 mt-2">{item.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        {item.price && <span className="font-bold text-slate-800 text-lg">${item.price}</span>}
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-sm text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-slate-50 border-t flex justify-end">
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* My Orders Tab */}
        {activeTab === "myorders" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <ClipboardList className="w-7 h-7 text-blue-600" /> My Orders & Bookings
            </h1>
            {myOrders.length === 0 ? (
              <div className="bg-white p-10 border rounded-xl text-center shadow-sm">
                <p className="text-gray-500 text-lg">You haven't placed any bookings or orders yet. 🚢</p>
              </div>
            ) : (
              <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b border-gray-200">
                        <th className="py-4 px-6">Order Type</th>
                        <th className="py-4 px-6">Item / Booking Detail</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Created Date</th>
                        <th className="py-4 px-6">Assigned Date</th>
                        <th className="py-4 px-6">Completed Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {myOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-800 capitalize">
                            {order.type}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {order.details?.name || order.details?.movieName || order.details?.service || order.details?.equipment || order.details?.bookingType || order.details?.viewType || "Service Booking"}
                            {order.details?.price && ` ($${order.details.price})`}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                              order.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : order.status === "assigned"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-500">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-500">
                            {formatDate(order.assignedAt)}
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-500">
                            {formatDate(order.completedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default VoyagerDashboard;
