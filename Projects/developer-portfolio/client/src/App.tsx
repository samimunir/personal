import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/effects/PageTransition";
import ScrollProgress from "./components/effects/ScrollProgress";
// import NoiseOverlay from './components/effects/NoiseOverlay'
import CursorFollower from "./components/effects/CursorFollower";
import Toasts from "./components/ui/Toast";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-[#0B0E11] text-white">
      <ScrollProgress />
      {/* <NoiseOverlay /> */}
      <CursorFollower />
      <Navbar />
      <main className="flex-1">
        <PageTransition />
      </main>
      <Footer />
      <Toasts />
    </div>
  );
}
