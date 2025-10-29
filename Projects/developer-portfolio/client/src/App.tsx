import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Navbar & sticky frosted header */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer */}
    </div>
  );
}
