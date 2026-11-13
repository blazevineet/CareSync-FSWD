import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../services/userApi';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'caresync_auth_user';

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const result = await loginApi(email, password);
      const userData = {
        id: result.user.id || 1,
        name: result.user.name,
        email: result.user.email,
        role: email.includes('admin') || email.includes('doctor') ? 'doctor' : 'patient',
        phone: '+1 (555) 987-6543',
        bloodGroup: 'B+',
        emergencyContact: '+1 (555) 123-4567',
      };
      setUser(userData);
      addToast(`Welcome back, ${userData.name}!`, 'success');
      return { success: true, user: userData };
    } catch (err) {
      // If service is unreachable or credentials don't match, check demo fallback if demo credentials
      if (email === 'priya@example.com' && password === 'DemoPass456') {
        const demoUser = {
          id: 1,
          name: 'Priya Sharma',
          email: 'priya@example.com',
          role: 'patient',
          phone: '+1 (555) 987-6543',
          bloodGroup: 'O+',
          emergencyContact: '+1 (555) 444-2211',
        };
        setUser(demoUser);
        addToast('Logged in as Demo Patient (Priya Sharma)', 'success');
        return { success: true, user: demoUser };
      }
      addToast(err.message || 'Login failed', 'error');
      return { success: false, error: err.message };
    }
  };

  const loginDemo = (role = 'patient') => {
    if (role === 'doctor' || role === 'admin') {
      const doctorUser = {
        id: 99,
        name: 'Dr. Rahul Sharma',
        email: 'rahul.sharma@caresync.com',
        role: 'doctor',
        phone: '+1 (555) 234-8901',
        specialization: 'Cardiologist',
        hospital: 'CareSync Central Medical Center',
      };
      setUser(doctorUser);
      addToast('Logged in as Doctor & Administrator (Dr. Rahul Sharma)', 'success');
      return doctorUser;
    }

    const patientUser = {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'patient',
      phone: '+1 (555) 987-6543',
      bloodGroup: 'B+',
      emergencyContact: '+1 (555) 321-7654',
    };
    setUser(patientUser);
    addToast('Logged in as Patient (Priya Sharma)', 'success');
    return patientUser;
  };

  const signup = async (name, email, password) => {
    try {
      const result = await registerApi(name, email, password);
      const newUser = {
        id: result.user.id || Date.now(),
        name: result.user.name,
        email: result.user.email,
        role: 'patient',
        phone: '',
        bloodGroup: 'A+',
        emergencyContact: '',
      };
      setUser(newUser);
      addToast('Account created successfully! Welcome to CareSync.', 'success');
      return { success: true, user: newUser };
    } catch (err) {
      // Fallback local registration if user service is offline
      if (err.message.includes('Unable to connect')) {
        const fallbackUser = {
          id: Date.now(),
          name,
          email,
          role: 'patient',
          phone: '',
          bloodGroup: 'O+',
          emergencyContact: '',
        };
        setUser(fallbackUser);
        addToast('Account created in offline mode (User Service not reached).', 'warning');
        return { success: true, user: fallbackUser };
      }
      addToast(err.message || 'Registration failed', 'error');
      return { success: false, error: err.message };
    }
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      addToast('Profile updated successfully!', 'success');
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginDemo,
        signup,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
