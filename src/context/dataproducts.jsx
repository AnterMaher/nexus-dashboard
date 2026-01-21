import { createContext, useContext, useState, useEffect } from "react";

export const DataProductsContext = createContext();

export const DataProductsProvider = ({ children }) => {
  const initialProducts = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 299.99, stock: 45, status: "In Stock" },
    { id: 2, name: "Smart Watch Series X", category: "Electronics", price: 449.99, stock: 12, status: "Low Stock" },
    { id: 3, name: "Premium Leather Bag", category: "Fashion", price: 189.99, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Ergonomic Office Chair", category: "Furniture", price: 599.99, stock: 28, status: "In Stock" },
    { id: 5, name: "Gaming Mouse", category: "Electronics", price: 49.99, stock: 100, status: "In Stock" },
    { id: 6, name: "Mechanical Keyboard", category: "Electronics", price: 129.99, stock: 15, status: "Low Stock" },
    { id: 7, name: "Leather Wallet", category: "Fashion", price: 49.99, stock: 0, status: "Out of Stock" },
    { id: 8, name: "Wooden Desk", category: "Furniture", price: 399.99, stock: 5, status: "Low Stock" },
  ];

  // 1. تهيئة State من LocalStorage (Lazy Initialization)
  const [products, setProducts] = useState(() => {
    try {
      const savedData = localStorage.getItem("my_products_db");
      return savedData ? JSON.parse(savedData) : initialProducts;
    } catch (error) {
      return initialProducts;
    }
  });

  // 2. حفظ البيانات عند أي تغيير (Effect)
  useEffect(() => {
    localStorage.setItem("my_products_db", JSON.stringify(products));
  }, [products]);

  // --- CRUD Functions ---

  // Add Product
  const AddProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      price: Number(product.price),
      stock: Number(product.stock),
      status: product.status,
      sales: 0,
    };
    setProducts([newProduct, ...products]);
  };

  // Delete Product
  const deleteProduct = (id) => {
    const filteredProducts = products.filter((item) => item.id !== id);
    setProducts(filteredProducts);
  };

  // Update Product
  const updateProduct = (product) => {
    const updatedItems = products.map((item) =>
      item.id === product.id ? product : item
    );
    setProducts(updatedItems);
  };

  const value = {
    products,
    AddProduct,     // تم توحيد الاسم (camelCase)
    deleteProduct,  // تم توحيد الاسم (camelCase)
    updateProduct,
    // تم حذف المتغيرات غير المعرفة (productsData) عشان الكود يشتغل
  };

  return (
    <DataProductsContext.Provider value={value}>
      {children}
    </DataProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(DataProductsContext);
};