import { PatientDashBoard,AdminDashboard,DoctorDashboard } from "../dashboards";
import Error401 from "./Error401";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const role = user.role 

 const renderDashboardContent =() => {
  
    switch(role) {
      case 'patient':
        return <PatientDashBoard/>;
      case 'doctor':
        return <DoctorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Error401 />;
    }
  }
  return renderDashboardContent()
}

export default Dashboard