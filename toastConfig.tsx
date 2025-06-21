import { BaseToast, ErrorToast } from "react-native-toast-message";
import type { BaseToastProps } from "react-native-toast-message";
import React from "react";

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#22c55e",
        backgroundColor: "#f0fdf4",
        borderRadius: 8,
        marginHorizontal: 12,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "bold",
        color: "#166534",
      }}
      text2Style={{
        fontSize: 12,
        color: "#4d7c0f",
      }}
    />
  ),

  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#3b82f6",
        backgroundColor: "#eff6ff",
        borderRadius: 8,
        marginHorizontal: 12,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "bold",
        color: "#1e3a8a",
      }}
      text2Style={{
        fontSize: 12,
        color: "#1e40af",
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#ef4444",
        backgroundColor: "#fef2f2",
        borderRadius: 8,
        marginHorizontal: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#991b1b",
      }}
      text2Style={{
        fontSize: 14,
        color: "#b91c1c",
      }}
    />
  ),
};
