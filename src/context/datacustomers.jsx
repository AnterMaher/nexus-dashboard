import { createContext, useContext, useState, useEffect } from "react";

export const DataCustomersContext = createContext(null);

export const DataCustomersProvider = ({ children }) => {
  const [customersData, setCustomersData] = useState(() => {
    const savedData = localStorage.getItem("my_customers_db");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      // لو ملقيناش (أول مرة)، نرجع البيانات الافتراضية
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("my_customers_db", JSON.stringify(customersData));
  }, [customersData]);
  const handleAddItem = (item) => {
    const newItem = {
      id: Date.now(),
      name: item.name,
      email: item.email,
      status: "Active",
      orders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split("T")[0],
      initials:
        item.name.charAt(0).toUpperCase() + item.name.charAt(1).toUpperCase(),
    };
    setCustomersData([...customersData, newItem]);
  };
  const deleteItem = (id) => {
    const updatedList = customersData.filter((item) => item.id !== id);
    setCustomersData(updatedList);
  };
  const value = {
    customersData,
    setCustomersData,
    handleAddItem,
    deleteItem,
  };

  return (
    <DataCustomersContext.Provider value={value}>
      {children}
    </DataCustomersContext.Provider>
  );
};

export const useCustomers = () => {
  return useContext(DataCustomersContext);
};
