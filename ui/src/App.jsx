// App.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { Navigation } from './components/shared/Navigation';
import { Homepage } from './components/shared/Homepage';
import { LoginPage } from './components/shared/LoginPage';
import { RegisterPage } from './components/shared/RegisterPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { TechnicianDashboard } from './components/technician/TechnicianDashboard';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { VehicleManagement } from './components/customer/VehicleManagement';
import BookingPage from './components/customer/BookingPage';
import { Notification as NotificationContainer } from './components/shared/Notification';
import { PaymentComponent } from './components/customer/Payment';
import { ServiceHistory } from './components/customer/ServiceHistory';

function AppContent() {
  const { user } = useContext(AuthContext);

  // ✅ luôn khởi tạo ở 'home'
  const [currentView, setCurrentView] = useState('home');
  const handleNavigate = (view) => setCurrentView(view);

  // Tự động chuyển hướng admin/staff/technician đến dashboard khi đăng nhập
  useEffect(() => {
    if (user && ['Admin', 'Staff', 'Technician'].includes(user.role)) {
      setCurrentView('dashboard');
    }
  }, [user]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;

      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;

      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;

      case 'dashboard':
        // Route to appropriate dashboard based on user role
        if (!user) return <LoginPage onNavigate={handleNavigate} />;
        switch (user.role) {
          case 'Admin':
            return <AdminDashboard onNavigate={handleNavigate} />;
          case 'Staff':
            return <StaffDashboard onNavigate={handleNavigate} />;
          case 'Technician':
            return <TechnicianDashboard onNavigate={handleNavigate} />;
          case 'Customer':
            return <CustomerDashboard onNavigate={handleNavigate} />;
          default:
            return <CustomerDashboard onNavigate={handleNavigate} />;
        }

      case 'admin-dashboard':
        if (!user || user.role !== 'Admin') return <LoginPage onNavigate={handleNavigate} />;
        return <AdminDashboard onNavigate={handleNavigate} />;

      case 'staff-dashboard':
        if (!user || user.role !== 'Staff') return <LoginPage onNavigate={handleNavigate} />;
        return <StaffDashboard onNavigate={handleNavigate} />;

      case 'technician-dashboard':
        if (!user || user.role !== 'Technician') return <LoginPage onNavigate={handleNavigate} />;
        return <TechnicianDashboard onNavigate={handleNavigate} />;

      case 'customer-dashboard':
        if (!user || user.role !== 'Customer') return <LoginPage onNavigate={handleNavigate} />;
        return <CustomerDashboard onNavigate={handleNavigate} />;

      case 'vehicles':
        return <VehicleManagement onNavigate={handleNavigate} />;

      case 'booking':
        return <BookingPage onNavigate={handleNavigate} />;

      case 'appointments':
        return user ? <ServiceHistory onNavigate={handleNavigate} /> : <LoginPage onNavigate={handleNavigate} />;

      case 'payment':
        return (
          <PaymentComponent
            amount={100000}
            appointmentId={1}
            onPaymentSuccess={() => { }}
            onPaymentError={() => { }}
            onCancel={() => handleNavigate('home')}
          />
        );

      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      {/* ✅ truyền currentView để highlight menu chính xác */}
      <Navigation onNavigate={handleNavigate} currentView={currentView} />
      <main>{renderView()}</main>
      <NotificationContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
