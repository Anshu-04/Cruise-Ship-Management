import { Link } from 'react-router-dom';
import { Ship, Users, Calendar, Settings } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-ocean">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-4 text-shadow">
            Cruise Ship Management
          </h1>
          <p className="text-xl opacity-90">
            Your comprehensive solution for cruise ship operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <Ship className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fleet Management</h3>
            <p className="text-sm opacity-90">Manage your cruise fleet efficiently</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Passenger Services</h3>
            <p className="text-sm opacity-90">Enhance passenger experience</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Booking System</h3>
            <p className="text-sm opacity-90">Streamlined reservation management</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <Settings className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Operations</h3>
            <p className="text-sm opacity-90">Optimize daily operations</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            to="/login" 
            className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
