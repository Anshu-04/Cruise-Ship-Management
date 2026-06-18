import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { ClipboardList, LogOut, User as UserIcon, CheckCircle } from "lucide-react";

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/orders");
      setTasks(data);
    } catch (err) {
      toast.error("Failed to load assigned tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`/api/orders/${taskId}/complete`);
      toast.success("Task completed successfully!");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark task completed");
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
            <span className="text-2xl font-bold tracking-wider text-blue-400">🚢 STAFF HUB</span>
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
          <nav className="px-4 py-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white transition">
              <ClipboardList className="w-5 h-5" /> Assigned Tasks
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
        <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-blue-600" /> My Assigned Tasks
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white p-12 border rounded-xl text-center shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-1">All caught up!</h3>
            <p className="text-gray-500">You do not have any pending assigned tasks right now.</p>
          </div>
        ) : (
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b border-gray-200">
                    <th className="py-4 px-6">Order Type</th>
                    <th className="py-4 px-6">Voyager</th>
                    <th className="py-4 px-6">Booking Details</th>
                    <th className="py-4 px-6">Assigned Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800 capitalize">
                        {task.type}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {task.voyagerId ? (
                          <div>
                            <p className="font-semibold">{task.voyagerId.username}</p>
                            <p className="text-xs text-gray-400">{task.voyagerId.email}</p>
                          </div>
                        ) : (
                          "Unknown Voyager"
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {task.details?.name || task.details?.movieName || task.details?.service || task.details?.equipment || task.details?.bookingType || task.details?.viewType || "Service Booking"}
                        {task.details?.price && ` ($${task.details.price})`}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">
                        {formatDate(task.assignedAt)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                          task.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {task.status !== "completed" && (
                          <button
                            onClick={() => handleComplete(task._id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StaffDashboard;
