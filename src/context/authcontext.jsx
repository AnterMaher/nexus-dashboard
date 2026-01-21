import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. بدل ما نحفظ true/false بس، هنحفظ كائن كامل فيه بيانات المستخدم
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("nexus_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // حالة للتأكد هل هو مسجل ولا لأ (لو فيه user يبقى مسجل)
  const isAuthenticated = !!user;

  // 2. تعديل دالة Login لتقبل بيانات المستخدم
  const login = (userData) => {
    // userData المفروض يكون: { name: "...", email: "..." }
    setUser(userData);
    localStorage.setItem("nexus_user", JSON.stringify(userData));
    return { success: true };
  };

  // 3. دالة Logout تمسح البيانات
  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexus_user");
  };

  // 4. دالة جديدة لتحديث البروفايل (عشان صفحة Profile تستخدمها)
  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("nexus_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
