import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AppShell({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B1220] text-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pt-6">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppShell;
