import Navbar from "../components/Navbar";

export default function Main({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
