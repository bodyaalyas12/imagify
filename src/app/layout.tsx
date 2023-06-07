import { ReactNode } from "react";
import MUISetup from "@/components/MUISetup";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MUISetup>{children}</MUISetup>
      </body>
    </html>
  );
}
