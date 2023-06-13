"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { EmotionCacheProvider } from "@/components/theme/EmotionCacheProvider";

function MUISetup({ children }: PropsWithChildren) {
  return (
    <>
      <CssBaseline />
      <EmotionCacheProvider options={{ key: "mui" }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </EmotionCacheProvider>
    </>
  );
}

export default MUISetup;
