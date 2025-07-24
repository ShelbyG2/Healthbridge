import { useState } from 'react'
import { Home, CalendarClock, MessageCircleMore, User, LogOutIcon, MenuSquareIcon,X, Brain, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const PatientNavBar = () => {
    const navigate = useNavigate()
        const [isOpen, setIsOpen] = useState(false)
const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    toast.success("Logged out successfully");}
  return (
   <nav className='fixed lg:relative h-full bg-light-bg-shape2 left-0 z-50'>
            {/* Desktop Nav */}
            <ul className='hidden lg:flex flex-col gap-4 p-4 rounded-lg text-white dark:text-dark-text h-full' >
                <li className='flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Home />Dashboard</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><CalendarClock /> Appointments</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><MessageCircleMore /> Chat</li>
                     <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Brain /> AI Triage</li>
                <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Clock /> Med Tracker</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><User /> Profile</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleLogout} ><LogOutIcon /> Logout</li>

            </ul>
            {/* Mobile Menu Icon */}
            <button
                className="lg:hidden p-2 fixed top-3 left-3 z-50 rounded-md "
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
            >
                {!isOpen && <MenuSquareIcon className='text-light-text dark:text-dark-text ' />}
            </button>
            {isOpen && (
                <ul className='lg:hidden flex flex-col gap-6 p-4 text-2xl text-white bg-light-bg-shape2 h-full mt-8 fixed top-0 left-0 w-64 z-50'>
                       <button
                        className="relative w-full top-2 left-2 p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className='text-white dark:text-dark-text self-end' />
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

export default PatientNavBar