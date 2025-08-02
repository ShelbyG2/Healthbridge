import AdminDashboard from "../dashboards/AdminDashboard";
import AdminNavBar from "../components/NavBar/AdminNavBar";
const AdminLayout = () => {
  return (
    <main className="flex transition-colors duration-300 h-screen">
      <nav className="h-screen flex items-center w-content bg-light-bg dark:bg-dark-bg shadow-md lg:shadow-none lg:bg-transparent lg:dark:bg-transparent">
        <AdminNavBar />
      </nav>
      <AdminDashboard />
    </main>
  );
};

export default AdminLayout;
