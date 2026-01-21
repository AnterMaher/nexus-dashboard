import { createTheme } from "@mui/material/styles";

// الألوان المستخرجة من تصميم Nexus
const colors = {
  primary: "hsl(238.73deg 84.52% 67.06%)", // البنفسجي المضيء (Indigo) المستخدم في الأزرار والروابط
  secondary: "#a855f7", // بنفسجي ثانوي
  success: "#22c55e", // الأخضر (In Stock, Positive numbers)
  warning: "#f59e0b", // البرتقالي (Low Stock)
  error: "#ef4444", // الأحمر (Out of Stock, Negative numbers)

  // ألوان الوضع المظلم (طبقاً للصور)
  dark: {
    background: "hsl(223.64deg 73.33% 2.94%)", // الخلفية السوداء العميقة جداً
    paper: "hsl(223.33deg 50% 7.06%)", // لون الكروت (Cards) والـ Sidebar
    textPrimary: "#F3F4F6", // أبيض مريح للعين
    textSecondary: "#9CA3AF", // رمادي للنصوص الفرعية
  },

  // ألوان الوضع المضيء (مقترحة لتكون متناسقة)
  light: {
    background: "#F3F4F6", // رمادي فاتح جداً
    paper: "#FFFFFF", // أبيض
    textPrimary: "#111827", // كحلي غامق
    textSecondary: "#6B7280", // رمادي متوسط
  },
};

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        contrastText: "#ffffff", // النص داخل الزر الأساسي يكون أبيض دائماً
      },
      secondary: {
        main: colors.secondary,
      },
       
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
      error: {
        main: colors.error,
      },
      background: {
        default:
          mode === "dark" ? colors.dark.background : colors.light.background,
        paper: mode === "dark" ? colors.dark.paper : colors.light.paper,
      },
      text: {
        primary:
          mode === "dark" ? colors.dark.textPrimary : colors.light.textPrimary,
        secondary:
          mode === "dark"
            ? colors.dark.textSecondary
            : colors.light.textSecondary,
      },
    },
    shape: {
      borderRadius: 12, // الحواف الدائرية للكروت والأزرار كما في التصميم
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // يفضل استخدام خط Inter إذا أمكن لأنه يشبه التصميم
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600, fontSize: "1.5rem" }, // عناوين الكروت
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
      body1: { fontSize: "0.95rem" },
    },
    components: {
      // تعديل شكل الأزرار لتشبه الصورة (Nexus Buttons)
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none", // إلغاء الحروف الكبيرة
            padding: "8px 20px",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(99, 102, 241, 0.2)", // ظل خفيف عند الوقوف
            },
          },
          containedPrimary: {
            // تدرج لوني خفيف إذا أردت، أو لون ثابت
            backgroundColor: colors.primary,
          },
        },
      },
      // تعديل شكل الكروت (Cards) لتشبه الصور
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none", // إلغاء تأثيرات MUI الافتراضية
          },
          rounded: {
            border:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.05)"
                : "1px solid rgba(0, 0, 0, 0.05)", // حدود خفيفة جداً
          },
        },
      },
      // تعديل حقول الإدخال (Inputs) مثل Search Bar
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(0, 0, 0, 0.03)",
            "& fieldset": {
              borderColor: "transparent", // إخفاء الحدود الافتراضية
            },
            "&:hover fieldset": {
              borderColor: colors.primary, // ظهور حدود ملونة عند الوقوف
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary, // حدود ملونة عند الكتابة
            },
          },
        },
      },
    },
  });