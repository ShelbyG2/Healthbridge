import React from 'react'
import DoctorNavBar from '../components/NavBar/DoctorNavBar'
import { ArrowRight } from 'lucide-react';

const DoctorDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const name = user.name || "Doctor";
  return (
 <div className='h-screen flex flex-col items w-full bg-light-bg dark:bg-dark-bg '>
        <DoctorNavBar />
      <div className='mt-6 flex flex-col items-center  w-full h-full gap-4 p-4   rounded-lg shadow-lg'>
        <h1 className='text-light-text dark:text-dark-text text-2xl font-bold mb-4'>Welcome, Dr {name}</h1>
        <h2 className='text-light-secondary dark:text-dark-secondary text-sm'>Status: Online</h2>
        {/* Primary Card */}
<div className="grid  sm:w-full md:w-1/2 lg:w-1/3 gap-4">
    {/* Todays Appointments */}
    <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md w-full">
      <h3 className="text-light-text dark:text-dark-text font-bold">Today's Appointments</h3>
      <ul className="mt-2">
        <li className="text-light-secondary dark:text-dark-secondary">9:00 AM - Patient A</li>
        <li className="text-light-secondary dark:text-dark-secondary">10:00 AM - Patient B</li>
        <li className="text-light-secondary dark:text-dark-secondary">11:00 AM - Patient C</li>
      </ul>
      <div>
        <button className="mt-2 bg-light-accent dark:bg-dark-accent hover:bg-light-hover text-light-bg dark:text-dark-bg rounded-lg p-2">
          View All Appointments
          <ArrowRight className="inline ml-1" />
        </button>
      </div>
    </div>
    {/* Patients Recent Activity */}
    <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md w-full">
      <h3 className="text-light-text dark:text-dark-text font-bold">Recent Patient Activity</h3>
      <ul className="mt-2">
        <li className="text-light-secondary dark:text-dark-secondary">Patient A: Follow-up on test results</li>
        <li className="text-light-secondary dark:text-dark-secondary">Patient B: Medication refill request</li>
        <li className="text-light-secondary dark:text-dark-secondary">Patient C: New appointment scheduled</li>
      </ul>
      <div>
        <button className="mt-2 bg-light-accent dark:bg-dark-accent hover:bg-light-hover text-light-bg dark:text-dark-bg rounded-lg p-2">
          View All Activities
          <ArrowRight className="inline ml-1" />
        </button>
      </div>
</div>

      </div>
      </div>
    </div>
  )
}

export default DoctorDashboard