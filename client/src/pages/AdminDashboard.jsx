import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import {
  LayoutDashboard, Users, Utensils, BookOpen, ClipboardList,
  LogOut, User as UserIcon, Plus, Trash2, Edit, Check
} from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // State lists
  const [users, setUsers] = useState([]);
  const [cateringItems, setCateringItems] = useState([]);
  const [stationeryItems, setStationeryItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Stats State
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVoyagers: 0,
    totalStaff: 0,
    totalOrders: 0,
    pendingOrders: 0,
    assignedOrders: 0,
    completedOrders: 0,
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  // Forms states
  const [staffForm, setStaffForm] = useState({ username: "", email: "", password: "" });
  
  const [cateringForm, setCateringForm] = useState({ name: "", description: "", price: "", image: "" });
  const [editingCateringId, setEditingCateringId] = useState(null);

  const [stationeryForm, setStationeryForm] = useState({ name: "", description: "", price: "", image: "" });
  const [editingStationeryId, setEditingStationeryId] = useState(null);

  // Fetch all data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const usersRes = await axios.get("/api/users");
      setUsers(usersRes.data);

      const catRes = await axios.get("/api/catering");
      setCateringItems(catRes.data);

      const statRes = await axios.get("/api/stationery");
      setStationeryItems(statRes.data);

      const ordersRes = await axios.get("/api/orders");
      setOrders(ordersRes.data);

      // Calculate stats
      const totalU = usersRes.data.length;
      const totalVoy = usersRes.data.filter((u) => u.role === "voyager").length;
      const totalStf = usersRes.data.filter((u) => u.role === "staff").length;
      const totalOrd = ordersRes.data.length;
      const pendingOrd = ordersRes.data.filter((o) => o.status === "pending").length;
      const assignedOrd = ordersRes.data.filter((o) => o.status === "assigned").length;
      const completedOrd = ordersRes.data.filter((o) => o.status === "completed").length;

      setStats({
        totalUsers: totalU,
        totalVoyagers: totalVoy,
        totalStaff: totalStf,
        totalOrders: totalOrd,
        pendingOrders: pendingOrd,
        assignedOrders: assignedOrd,
        completedOrders: completedOrd,
      });
    } catch (err) {
      toast.error("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Staff Account creation
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!staffForm.username || !staffForm.email || !staffForm.password) {
      toast.error("Please fill in all staff details");
      return;
    }
    try {
      await axios.post("/api/users/staff", staffForm);
      toast.success("Staff account created!");
      setStaffForm({ username: "", email: "", password: "" });
      loadAllData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create staff");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("User deleted");
      loadAllData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Catering CRUD
  const handleCateringSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, image } = cateringForm;
    if (!name || !description || price === "" || !image) {
      toast.error("All fields required");
      return;
    }

    try {
      if (editingCateringId) {
        await axios.put(`/api/catering/${editingCateringId}`, cateringForm);
        toast.success("Catering item updated");
        setEditingCateringId(null);
      } else {
        await axios.post("/api/catering", cateringForm);
        toast.success("Catering item added");
      }
      setCateringForm({ name: "", description: "", price: "", image: "" });
      loadAllData();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleEditCatering = (item) => {
    setEditingCateringId(item._id);
    setCateringForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });
  };

  const handleDeleteCatering = async (id) => {
    if (!window.confirm("Delete this catering item?")) return;
    try {
      await axios.delete(`/api/catering/${id}`);
      toast.success("Deleted catering item");
      loadAllData();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  // Stationery CRUD
  const handleStationerySubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, image } = stationeryForm;
    if (!name || !description || price === "" || !image) {
      toast.error("All fields required");
      return;
    }

    try {
      if (editingStationeryId) {
        await axios.put(`/api/stationery/${editingStationeryId}`, stationeryForm);
        toast.success("Stationery item updated");
        setEditingStationeryId(null);
      } else {
        await axios.post("/api/stationery", stationeryForm);
        toast.success("Stationery item added");
      }
      setStationeryForm({ name: "", description: "", price: "", image: "" });
      loadAllData();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleEditStationery = (item) => {
    setEditingStationeryId(item._id);
    setStationeryForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });
  };

  const handleDeleteStationery = async (id) => {
    if (!window.confirm("Delete this stationery item?")) return;
    try {
      await axios.delete(`/api/stationery/${id}`);
      toast.success("Deleted stationery item");
      loadAllData();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  // Staff Assignment
  const handleAssignStaff = async (orderId, staffId) => {
    if (!staffId) {
      toast.error("Please select a staff member");
      return;
    }
    try {
      await axios.put(`/api/orders/${orderId}/assign`, { assignedTo: staffId });
      toast.success("Staff assigned successfully!");
      loadAllData();
    } catch (err) {
      toast.error("Failed to assign staff");
    }
  };

  // Completion Time Formatter
  const formatCompletionTime = (assignedAt, completedAt) => {
    if (!assignedAt || !completedAt) return "-";
    const start = new Date(assignedAt);
    const end = new Date(completedAt);
    const diffMs = end - start;
    if (diffMs < 0) return "-";
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    if (hours === 0) {
      return `${mins} Minute${mins !== 1 ? "s" : ""}`;
    }
    return `${hours} Hour${hours !== 1 ? "s" : ""} ${mins} Minute${mins !== 1 ? "s" : ""}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const staffUsers = users.filter((u) => u.role === "staff");

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shadow-lg">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <span className="text-2xl font-bold tracking-wider text-blue-400">🚢 ADMIN PORTAL</span>
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
              onClick={() => {
                setActiveTab("dashboard");
                loadAllData();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "dashboard" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "users" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Users className="w-5 h-5" /> Users
            </button>

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
              onClick={() => {
                setActiveTab("orders");
                loadAllData();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === "orders" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <ClipboardList className="w-5 h-5" /> Orders
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
        {loading && activeTab === "dashboard" ? (
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-3xl font-bold mb-6 text-slate-800">System Dashboard Overview</h1>
                
                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 border rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="text-sm font-bold text-gray-500 uppercase">Total Users</span>
                    <span className="text-4xl font-extrabold mt-2 text-slate-800">{stats.totalUsers}</span>
                    <span className="text-xs text-gray-400 mt-2">{stats.totalVoyagers} Voyagers | {stats.totalStaff} Staff</span>
                  </div>
                  <div className="bg-white p-6 border rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="text-sm font-bold text-gray-500 uppercase">Pending Orders</span>
                    <span className="text-4xl font-extrabold mt-2 text-blue-600">{stats.pendingOrders}</span>
                    <span className="text-xs text-gray-400 mt-2">Awaiting staff assignment</span>
                  </div>
                  <div className="bg-white p-6 border rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="text-sm font-bold text-gray-500 uppercase">Assigned Orders</span>
                    <span className="text-4xl font-extrabold mt-2 text-amber-600">{stats.assignedOrders}</span>
                    <span className="text-xs text-gray-400 mt-2">Currently in progress</span>
                  </div>
                  <div className="bg-white p-6 border rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="text-sm font-bold text-gray-500 uppercase">Completed Orders</span>
                    <span className="text-4xl font-extrabold mt-2 text-green-600">{stats.completedOrders}</span>
                    <span className="text-xs text-gray-400 mt-2">Tasks completed on schedule</span>
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => setActiveTab("users")} className="p-4 bg-slate-50 border rounded-lg hover:bg-slate-100 font-semibold text-center transition cursor-pointer">Manage Users</button>
                    <button onClick={() => setActiveTab("catering")} className="p-4 bg-slate-50 border rounded-lg hover:bg-slate-100 font-semibold text-center transition cursor-pointer">Manage Catering</button>
                    <button onClick={() => setActiveTab("stationery")} className="p-4 bg-slate-50 border rounded-lg hover:bg-slate-100 font-semibold text-center transition cursor-pointer">Manage Stationery</button>
                    <button onClick={() => setActiveTab("orders")} className="p-4 bg-slate-50 border rounded-lg hover:bg-slate-100 font-semibold text-center transition cursor-pointer">Monitor Orders</button>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h1 className="text-3xl font-bold mb-6 text-slate-800">User Management</h1>
                
                {/* Form to create Staff */}
                <div className="bg-white border rounded-xl p-6 shadow-sm mb-8 max-w-xl">
                  <h3 className="text-lg font-bold mb-4 text-slate-700 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600" /> Create Staff Account
                  </h3>
                  <form onSubmit={handleCreateStaff} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        placeholder="Staff Username"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={staffForm.username}
                        onChange={(e) => setStaffForm({ ...staffForm, username: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="staff@cruise.com"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={staffForm.email}
                        onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={staffForm.password}
                        onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition cursor-pointer"
                    >
                      Create Account
                    </button>
                  </form>
                </div>

                {/* Users List Table */}
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b bg-slate-50">
                    <h3 className="font-bold text-slate-800">All Registered Accounts</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b border-gray-200">
                          <th className="py-4 px-6">Username</th>
                          <th className="py-4 px-6">Email</th>
                          <th className="py-4 px-6">Role</th>
                          <th className="py-4 px-6">Joined Date</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((u) => (
                          <tr key={u._id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 font-semibold text-slate-800">{u.username}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">{u.email}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                                u.role === "admin" 
                                  ? "bg-purple-100 text-purple-800" 
                                  : u.role === "staff"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-xs text-gray-500">{formatDate(u.createdAt)}</td>
                            <td className="py-4 px-6 text-right">
                              {u._id !== user?.id && (
                                <button
                                  onClick={() => handleDeleteUser(u._id)}
                                  className="text-red-600 hover:text-red-800 transition cursor-pointer"
                                >
                                  <Trash2 className="w-5 h-5 inline" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Catering Tab */}
            {activeTab === "catering" && (
              <div>
                <h1 className="text-3xl font-bold mb-6 text-slate-800">Catering Inventory Management</h1>

                {/* Catering Form */}
                <div className="bg-white border rounded-xl p-6 shadow-sm mb-8 max-w-xl">
                  <h3 className="text-lg font-bold mb-4 text-slate-700">
                    {editingCateringId ? "Edit Catering Item" : "Add New Catering Item"}
                  </h3>
                  <form onSubmit={handleCateringSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Lobster Thermidor"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={cateringForm.name}
                        onChange={(e) => setCateringForm({ ...cateringForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                      <textarea
                        placeholder="Ingredients, preparations, serving sizing..."
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={cateringForm.description}
                        onChange={(e) => setCateringForm({ ...cateringForm, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          placeholder="45"
                          className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                          value={cateringForm.price}
                          onChange={(e) => setCateringForm({ ...cateringForm, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                          value={cateringForm.image}
                          onChange={(e) => setCateringForm({ ...cateringForm, image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
                      >
                        {editingCateringId ? "Update Item" : "Add Item"}
                      </button>
                      {editingCateringId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCateringId(null);
                            setCateringForm({ name: "", description: "", price: "", image: "" });
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Catering Table */}
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b border-gray-200">
                        <th className="py-4 px-6">Image</th>
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Description</th>
                        <th className="py-4 px-6">Price</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cateringItems.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          </td>
                          <td className="py-4 px-6 font-semibold">{item.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                          <td className="py-4 px-6 font-bold">${item.price}</td>
                          <td className="py-4 px-6 text-right space-x-3">
                            <button onClick={() => handleEditCatering(item)} className="text-blue-600 hover:text-blue-800 transition cursor-pointer">
                              <Edit className="w-5 h-5 inline" />
                            </button>
                            <button onClick={() => handleDeleteCatering(item._id)} className="text-red-600 hover:text-red-800 transition cursor-pointer">
                              <Trash2 className="w-5 h-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stationery Tab */}
            {activeTab === "stationery" && (
              <div>
                <h1 className="text-3xl font-bold mb-6 text-slate-800">Stationery Inventory Management</h1>

                {/* Stationery Form */}
                <div className="bg-white border rounded-xl p-6 shadow-sm mb-8 max-w-xl">
                  <h3 className="text-lg font-bold mb-4 text-slate-700">
                    {editingStationeryId ? "Edit Stationery Item" : "Add New Stationery Item"}
                  </h3>
                  <form onSubmit={handleStationerySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Cruise Postcard Pack"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={stationeryForm.name}
                        onChange={(e) => setStationeryForm({ ...stationeryForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                      <textarea
                        placeholder="Material details, dimensions, pack quantities..."
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                        value={stationeryForm.description}
                        onChange={(e) => setStationeryForm({ ...stationeryForm, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          placeholder="12"
                          className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                          value={stationeryForm.price}
                          onChange={(e) => setStationeryForm({ ...stationeryForm, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          className="w-full px-4 py-2 border rounded-lg outline-none bg-white text-gray-800"
                          value={stationeryForm.image}
                          onChange={(e) => setStationeryForm({ ...stationeryForm, image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
                      >
                        {editingStationeryId ? "Update Item" : "Add Item"}
                      </button>
                      {editingStationeryId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingStationeryId(null);
                            setStationeryForm({ name: "", description: "", price: "", image: "" });
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Stationery Table */}
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b border-gray-200">
                        <th className="py-4 px-6">Image</th>
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Description</th>
                        <th className="py-4 px-6">Price</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stationeryItems.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          </td>
                          <td className="py-4 px-6 font-semibold">{item.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                          <td className="py-4 px-6 font-bold">${item.price}</td>
                          <td className="py-4 px-6 text-right space-x-3">
                            <button onClick={() => handleEditStationery(item)} className="text-blue-600 hover:text-blue-800 transition cursor-pointer">
                              <Edit className="w-5 h-5 inline" />
                            </button>
                            <button onClick={() => handleDeleteStationery(item._id)} className="text-red-600 hover:text-red-800 transition cursor-pointer">
                              <Trash2 className="w-5 h-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-3xl font-bold mb-6 text-slate-800">Orders & Bookings Management</h1>

                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b border-gray-200">
                          <th className="py-4 px-6">Voyager</th>
                          <th className="py-4 px-6">Type</th>
                          <th className="py-4 px-6">Booking details</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Assigned Staff</th>
                          <th className="py-4 px-6">Created At</th>
                          <th className="py-4 px-6">Assigned At</th>
                          <th className="py-4 px-6">Completed At</th>
                          <th className="py-4 px-6">Completion Time</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-sm">
                        {orders.map((o) => (
                          <tr key={o._id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 text-slate-800">
                              {o.voyagerId ? (
                                <div>
                                  <p className="font-semibold">{o.voyagerId.username}</p>
                                  <p className="text-xs text-gray-400">{o.voyagerId.email}</p>
                                </div>
                              ) : (
                                "Unknown"
                              )}
                            </td>
                            <td className="py-4 px-6 font-bold capitalize">{o.type}</td>
                            <td className="py-4 px-6 text-xs text-slate-600 max-w-xs truncate">
                              {o.details?.name || o.details?.movieName || o.details?.service || o.details?.equipment || o.details?.bookingType || o.details?.viewType || "Service Request"}
                              {o.details?.price && ` ($${o.details.price})`}
                            </td>
                            <td className="py-4 px-6">
                              <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                                o.status === "completed" 
                                  ? "bg-green-100 text-green-800" 
                                  : o.status === "assigned"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              {o.assignedTo ? (
                                <span className="font-semibold text-slate-800">{o.assignedTo.username}</span>
                              ) : (
                                <span className="text-gray-400 italic">Not Assigned</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-xs text-gray-500">{formatDate(o.createdAt)}</td>
                            <td className="py-4 px-6 text-xs text-gray-500">{formatDate(o.assignedAt)}</td>
                            <td className="py-4 px-6 text-xs text-gray-500">{formatDate(o.completedAt)}</td>
                            <td className="py-4 px-6 font-medium text-slate-700">
                              {formatCompletionTime(o.assignedAt, o.completedAt)}
                            </td>
                            <td className="py-4 px-6 text-right">
                              {o.status !== "completed" ? (
                                <div className="flex items-center gap-2 justify-end">
                                  <select
                                    defaultValue={o.assignedTo?._id || ""}
                                    onChange={(e) => {
                                      o._selectedStaff = e.target.value;
                                    }}
                                    className="px-2 py-1 border rounded bg-white text-xs outline-none max-w-[120px]"
                                  >
                                    <option value="">Choose Staff</option>
                                    {staffUsers.map((st) => (
                                      <option key={st._id} value={st._id}>
                                        {st.username}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => {
                                      const selected = o._selectedStaff || "";
                                      handleAssignStaff(o._id, selected);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-2.5 py-1 rounded transition cursor-pointer"
                                  >
                                    Assign
                                  </button>
                                </div>
                              ) : (
                                <span className="text-green-600 text-xs font-bold flex items-center gap-1 justify-end">
                                  <Check className="w-4 h-4" /> Finished
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
