import React from 'react'
import PatientNavBar from '../components/NavBar/PatientNavBar'
import Footer from '../components/Footer';
import Doctor from "../assets/doctor2.jpg"
import { Brain, Clock, FileClock, MessageCircle, PhoneCallIcon, User, HeartPulse } from 'lucide-react';

const PatientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name || "User";

  const triageResults = [
    { id: 1, urgency: 'High', summary: 'Fever - High - In Progress', specialist: 'General Practitioner', date: '2023-10-01' },

  ]

  const messages = [
    { id: 1, text: 'Your test results are ready for review', time: '3:12 PM' },
    { id: 2, text: 'Your prescription has been refilled', time: '2:45 PM' },
    { id: 3, text: 'Your appointment is confirmed', time: '1:30 PM' },
    { id: 4, text: 'You have a new message from your doctor', time: '12:15 PM' },
    { id: 5, text: 'Your lab results are available', time: '11:00 AM' },
    { id: 6, text: 'Reminder: Take your medication', time: '10:30 AM' },
    { id: 7, text: 'Your follow-up appointment is scheduled', time: '9:00 AM' },
    { id: 8, text: 'New health tips available for you', time: '8:45 AM' },
    { id: 9, text: 'Your health insurance claim has been processed', time: '8:00 AM' },
    { id: 10, text: 'Your health profile has been updated', time: '7:30 AM' },
  ];

  const appointments = [
    { id: 1, date: '2023-10-01', time: '10:00 AM', doctor: 'Dr. Smith' },
    { id: 2, date: '2023-10-05', time: '2:00 PM', doctor: 'Dr. Johnson' },
    { id: 3, date: '2023-10-10', time: '1:30 PM', doctor: 'Dr. Lee' },
    { id: 4, date: '2023-10-15', time: '11:00 AM', doctor: 'Dr. Brown' },
    { id: 5, date: '2023-10-20', time: '3:00 PM', doctor: 'Dr. Davis' },
  ];

  return (
    <main className='main-container   gap-4 bg-light-bg dark:bg-dark-bg min-h-screen '>
      <nav>
        <PatientNavBar />
      </nav>
      <div className="flex-1 justify-center p-6  w-full" >
        {/* hero section */}
        <header className='flex justify-between items-center mb-8'>
          <h1 className='text-light-text dark:text-dark-text text-2xl lg:text-4xl font-bold'>
            Welcome back, {name}
          </h1>
        </header>
        {/* main widgets */}
        <section className="main-container ">
          {/* Quick Stats */}
          <div className="flex-grow p-6 rounded-lg shadow-lg bg-light-surface dark:bg-dark-surface min-h-fit">
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Total Appointments</h3>
                <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">5</p>
              </div>
              <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Pending Messages</h3>
                <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">3</p>
              </div>
              
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Medical Adherance</h3>
                  <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">86%</p>
                </div>
            </div>
          </div>
          {/* appointment card */}
<div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl flex-grow">
  <div className="flex items-center gap-3 mb-4">
    <FileClock className="w-8 h-8 text-light-accent dark:text-dark-accent" />
    <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">Upcoming Appointment</h2>
  </div>
  <div className="space-y-3">
    <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Dr. Jane Muthoni</h3>
    <div className="text-light-secondary dark:text-dark-secondary space-y-1">
      <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2023-10-01</p>
      <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> 10:00 AM</p>
    </div>
    <button className="w-full mt-4 bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-light-bg dark:text-dark-bg rounded-lg p-3 transition-colors duration-300">
      View Details
    </button>
  </div>
</div>
          {/* Triage result card */}
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl flex-grow shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-light-accent dark:text-dark-accent" />
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">Triage Results</h2>
            </div>
            <div className="space-y-3">
              {triageResults.map(result => (
                <div key={result.id} className="bg-light-bg-highlight dark:bg-dark-bg-highlight bg-opacity-20 p-4 rounded-lg">
                  <p className="text-light-text dark:text-dark-text font-medium mb-2">{result.summary}</p>
                  <div className="text-light-secondary dark:text-dark-secondary space-y-1 text-sm">
                    <p>Urgency: <span className="text-light-error ">{result.urgency}</span></p>
                    <p>Specialist: {result.specialist}</p>
                    <p>Date: {result.date}</p>
                  </div>
                  <button className="mt-2 bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-light-bg dark:text-dark-bg rounded-lg p-2 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* assigned doctor */}
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex-grow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-light-accent dark:text-dark-accent" />
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">Assigned Doctor</h2>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <img src={Doctor} alt="Doctor" className="rounded-full w-24 h-24 object-cover" />
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Dr. Jane </h3>
              <p className="text-light-secondary dark:text-dark-secondary">General Medicine</p>
              <p className="flex items-center gap-2 text-light-secondary dark:text-dark-secondary">
                <PhoneCallIcon className="w-4 h-4" /> (123) 456-7890
              </p>
              <button className="w-full mt-2 bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-light-bg dark:text-dark-bg rounded-lg p-3 transition-colors duration-300">
                Contact Doctor
              </button>
            </div>
          </div>
          {/* messages */}
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex-grow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-light-accent dark:text-dark-accent" />
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">Recent Messages</h2>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {messages.map(message => (
                <div key={message.id} className="bg-light-bg-highlight dark:bg-dark-bg-highlight bg-opacity-20 p-3 rounded-lg">
                  <p className="text-light-text dark:text-dark-text text-sm">{message.text}</p>
                  <span className="text-light-secondary dark:text-dark-secondary text-xs">{message.time}</span>
                </div>
              ))}
            </div>
          </div>
          {/* health tips */}
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex-grow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-light-accent dark:text-dark-accent" />
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">Health Tips</h2>
            </div>
            <ul className="space-y-2">
              <li className="text-light-secondary dark:text-dark-secondary">Stay hydrated by drinking plenty of water.</li>
              <li className="text-light-secondary dark:text-dark-secondary">Maintain a balanced diet rich in fruits and vegetables.</li>
              <li className="text-light-secondary dark:text-dark-secondary">Exercise regularly to keep your body active.</li>
              <li className="text-light-secondary dark:text-dark-secondary">Get enough sleep to help your body recover.</li>
            </ul>
          </div>
    
        </section>

        
      </div>
  

    </main>
  )
}

export default PatientDashboard