import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white">
        <Navbar />
        <main className="py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
