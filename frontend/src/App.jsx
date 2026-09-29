import useTheme from "./hooks/useTheme";
import AppShell from "./layouts/AppShell";
import Dashboard from "./pages/Dashboard";

function App() {
  useTheme(); // 🔥 just initialize

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-gray-900 dark:text-white transition-colors duration-300">
      <AppShell>
        <Dashboard />
      </AppShell>
    </div>
  );
}

export default App;