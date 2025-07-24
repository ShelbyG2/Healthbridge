import { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import { Home, CalendarClock, MessageCircleMore, User, LogOutIcon, MenuSquareIcon,X, Brain, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast/headless'
const AdminNavBar = () => {
        const [isOpen, setIsOpen] = useState(false)
        const navigate = useNavigate()
        const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    toast.success("Logged out successfully");
}
  return (
    
    <nav className='absolute   h-full bg-light-bg-shape2 left-0'>
            {/* Desktop Nav */}
            <ul className='hidden sm:flex flex-col gap-4 p-4 -shape2 rounded-lg  text-light-text dark:text-dark-text'>
                <li className='flex items-center gap-2'><Home />Dashboard</li>
                <li className='flex items-center gap-2'><CalendarClock /> Appointments</li>
                <li className='flex items-center gap-2'><MessageCircleMore /> Chat</li>
                <li className='flex items-center gap-2'><Brain /> AI Triage</li>
                <li className='flex items-center gap-2'><Clock /> Medication Tracker</li>
                <li className='flex items-center gap-2'><User /> Profile</li>
                <li className='flex items-center gap-2 ' onClick={handleLogout}><LogOutIcon /> Logout</li>
            </ul>
            {/* Mobile Menu Icon */}
            <button
                className="sm:hidden p-2 absolute top-3 left-3 "
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
            >
                {!isOpen && <MenuSquareIcon className='text-light-text dark:text-dark-text ' />}
            </button>
            {isOpen && (
                <ul className='sm:hidden flex flex-col gap-6 p-4 text-2xl  text-white  bg-light-bg-shape2  h-full mt-8'>
                       <button
                        className="absolute top-2 right-2 p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className='text-white dark:text-dark-text' />
                    </button>
                    <li className='flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Home />Dashboard</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><CalendarClock /> Appointments</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><MessageCircleMore /> Chat</li>
                     <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Brain /> AI Triage</li>
                <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Clock /> Med Tracker</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><User /> Profile</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleLogout} ><LogOutIcon /> Logout</li>

                </ul>
            )}
        </nav>
  )
}

export default AdminNavBar