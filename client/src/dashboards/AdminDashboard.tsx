import React from 'react'
import AdminNavBar from '../components/NavBar/AdminNavBar'

const AdminDashboard = () => {
  const docApplications =[
    {id:1,name:"Alex Kumai",role:"Lab Technician", location:"Thika",contact:25479346448,experience:"4yrs"}
    ,{id:2,name:"John Doe",role:"Nurse", location:"Nairobi",contact:25471234567,experience:"3yrs"},
    {id:3,name:"Jane Smith",role:"Doctor", location:"Mombasa",contact:25470123456,experience:"5yrs"},
    {id:4,name:"Emily Johnson",role:"Pharmacist", location:"Kisumu",contact:25478901234,experience:"2yrs"},
    {id:5,name:"Michael Brown",role:"Surgeon", location:"Eldoret",contact:25479876543,experience:"6yrs"},
    {id:6,name:"Sarah Davis",role:"Radiologist", location:"Nakuru",contact:25476543210,experience:"4yrs"}

  ]
  return (
   <main className='flex transition-colors duration-300 h-screen'>
    <nav className='h-screen flex items-center w-content bg-light-bg dark:bg-dark-bg shadow-md lg:shadow-none lg:bg-transparent lg:dark:bg-transparent'>
      <AdminNavBar />
    </nav>
    <div className='flex-1 p-6 w-full flex flex-col overflow-hidden'>
      <header className='flex-shrink-0 mb-6'>
        <h1 className='text-2xl lg:text-4xl text-light-text dark:text-dark-text font-bold mb-6'>
          Welcome To Admin Panel
        </h1>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl py-2 px-10 w-full focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-300" />
        </div>
      </header>
      <section className='flex-1 overflow-y-auto dashboard-grid pb-8'>
        {/* System Health */}
        <div className=" p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 hover:border-2 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
        <h2 className='text-light-text dark:text-dark-text text-xl font-semibold mb-4'>System Health</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-accent dark:border-dark-accent transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Uptime</h3>
              <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">99.6%</p>
            </div>
              <div className=" bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-l-light-success dark:border-l-dark-success">
              <h2 className='text-lg font-medium text-light-text dark:text-dark-text '>Uptime</h2>
              <p className='text-2xl font-bold text-light-success dark:text-dark-success'>908.67hrs</p>
            </div>
          </div>
        </div>
        {/* Doctors Applications */}
         <div className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm rounded-2xl shadow-lg border border-light-border/30 dark:border-dark-border/30 overflow-hidden flex-grow">
          <div className="p-6 border-b border-light-border/20 dark:border-dark-border/20">
            <div className="flex items-center justify-between">
              <h2 className='text-2xl font-bold text-light-text dark:text-dark-text'>Healthcare Provider Applications</h2>
              <span className="bg-light-accent/20 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent px-3 py-1 rounded-full text-sm font-medium">
                {docApplications.length} Pending
              </span>
            </div>
          </div>
          <div className='max-h-[400px] overflow-y-auto p-6'>
            <div className="space-y-4">
              {docApplications.map(application => (
                <div className='group bg-light-accent/5 dark:bg-dark-accent/10 hover:bg-light-accent/10 dark:hover:bg-dark-accent/20 rounded-xl p-6 border border-light-accent/20 dark:border-dark-accent/20 transition-all duration-300 hover:shadow-md' key={application.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-light-accent/20 dark:bg-dark-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-light-accent dark:text-dark-accent font-semibold text-sm">
                            {application.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className='text-lg font-semibold text-light-text dark:text-dark-text'>{application.name}</h3>
                          <p className='text-sm text-light-accent dark:text-dark-accent font-medium'>{application.role}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className='text-light-secondary dark:text-dark-secondary'>Location</p>
                          <p className='text-light-text dark:text-dark-text font-medium'>{application.location}</p>
                        </div>
                        <div>
                          <p className='text-light-secondary dark:text-dark-secondary'>Contact</p>
                          <p className='text-light-text dark:text-dark-text font-medium'>{application.contact}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs font-medium bg-light-logo-blue/10 dark:bg-dark-logo-blue/20 text-light-logo-blue dark:text-dark-logo-blue px-3 py-1 rounded-full">
                        {application.experience}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-xs bg-light-success/20 dark:bg-dark-success/20 text-light-success dark:text-dark-success px-3 py-1 rounded-lg hover:bg-light-success/30 dark:hover:bg-dark-success/30 transition-colors">
                          Approve
                        </button>
                        <button className="text-xs bg-light-danger/20 dark:bg-dark-danger/20 text-light-danger dark:text-dark-danger px-3 py-1 rounded-lg hover:bg-light-danger/30 dark:hover:bg-dark-danger/30 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-light-border/20 dark:border-dark-border/20">
            <button className='w-full bg-light-accent/10 dark:bg-dark-accent/10 hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 text-light-accent dark:text-dark-accent font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02]'>
              View All Applications
            </button>
          </div>
        </div>
        {/* Appointment Analytics */}
        <div className="flex-grow border-collapse border-light-border dark:border-dark-border p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit">
          <h2 className='text-light-text dark:text-dark-text text-xl font-semibold mb-4'>Appointment Analytics</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg border-l-4 border-l-light-success dark:border-l-dark-success">
            <h3 className='text-lg font-medium text-light-text dark:text-dark-text'>Total Appointments</h3>
            <p className='text-2xl font-bold text-light-success dark:text-dark-success'>1,234</p>
            <div className="mt-4">
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Appointments this month: 123</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Appointments last month: 98</p>
            </div>
            <div className="mt-4">
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Average Appointment Duration: 30 mins</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>No-Show Rate: 5%</p>
            </div>
            <button className='mt-4 text-sm text-light-text dark:text-dark-text bg-light-accent/30 dark:bg-dark-accent px-4 py-2 rounded'>View All Appointments</button>
          </div>
        </div>
        {/* Active Users Summary */}
        <div className="flex-grow mt-6">
          <h2 className='text-light-text dark:text-dark-text text-xl font-semibold mb-4'>Active Users Summary</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg border-l-4 border-l-light-info dark:border-l-dark-info">
            <h3 className='text-lg font-medium text-light-text dark:text-dark-text'>Total Active Users</h3>
            <p className='text-2xl font-bold text-light-info dark:text-dark-info'>5,678</p>
            <div className="mt-4">
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>New Users this month: 123</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Returning Users: 4,555</p>
            </div>
            <button className='mt-4 text-sm text-light-text dark:text-dark-text bg-light-accent/30 dark:bg-dark-accent px-4 py-2 rounded'>View All Users</button>
          </div>
        </div>
        {/* Claim Processing */}
        <div className="flex-grow mt-6">
          <h2 className='text-light-text dark:text-dark-text text-xl font-semibold mb-4'>Claim Processing</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg border-l-4 border-l-light-warning dark:border-l-dark-warning">
            <h3 className='text-lg font-medium text-light-text dark:text-dark-text'>Total Claims Processed</h3>
            <p className='text-2xl font-bold text-light-warning dark:text-dark-warning'>1,234</p>
            <div className="mt-4">
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Claims this month: 123</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Claims last month: 98</p>
            </div>
            <button className='mt-4 text-sm text-light-text dark:text-dark-text bg-light-accent/30 dark:bg-dark-accent px-4 py-2 rounded'>View All Claims</button>
          </div>
        </div>
        {/* Security Logs */}
        <div className="flex-grow mt-6">
          <h2 className='text-light-text dark:text-dark-text text-xl font-semibold mb-4'>Security Logs</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg border-l-4 border-l-light-danger dark:border-l-dark-danger">
            <h3 className='text-lg font-medium text-light-text dark:text-dark-text'>Total Security Events</h3>
            <p className='text-2xl font-bold text-light-danger dark:text-dark-danger'>1,234</p>
            <div className="mt-4">
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Suspicious Logins: 12</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Blocked IPs: 5</p>
            </div>
            <button className='mt-4 text-sm text-light-text dark:text-dark-text bg-light-accent/30 dark:bg-dark-accent px-4 py-2 rounded'>View All Security Logs</button>
          </div>
        </div>
        {/* Content Control */}
        <div className="flex-grow mt-6 min-h-40">
          <h2 className='text-light-text dark:text-dark-text text-xl font-semibold mb-4'>Content Control</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg border-l-4 border-l-light-secondary dark:border-l-dark-secondary">
            <h3 className='text-lg font-medium text-light-text dark:text-dark-text'>Total Content Moderated</h3>
            <p className='text-2xl font-bold text-light-secondary dark:text-dark-secondary'>1,234</p>
            <div className="mt-4">
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Content Approved: 1,000</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>Content Rejected: 234</p>
            </div>
            <button className='mt-4 text-sm text-light-text dark:text-dark-text bg-light-accent/30 dark:bg-dark-accent px-4 py-2 rounded'>View All Content</button>
          </div>
        </div>
        
      </section>
    </div>
   </main>
  )
}

export default AdminDashboard