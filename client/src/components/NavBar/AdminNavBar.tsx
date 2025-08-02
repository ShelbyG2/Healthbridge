import { useState } from 'react'
import { Home, Settings,Logs,ContactIcon,CalendarClock, NotebookPen, LogOutIcon, MenuSquareIcon,X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const AdminNavBar = () => {
    const navigate=useNavigate()
const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    toast.success("Logged out successfully");
}

        const [isOpen, setIsOpen] = useState(false)
  return (
<nav className='absolute   h-full bg-light-bg-shape2 lg:relative lg:mt-4 lg:h-1/2 lg:rounded-r-xl md:relative lg:txt-xl left-0'>
            {/* Desktop Nav */}
            <ul className='hidden sm:flex flex-col gap-4 p-4 -shape2 rounded-lg  text-white dark:text-dark-text'>
            
                <li className='flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Home/>Dashboard</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <ContactIcon/>Manage Users</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <CalendarClock/>Appointments</li>
                     <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <NotebookPen/>Reports</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Logs /> Logs</li>
                <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <Settings/>Settings</li>
               <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleLogout} ><LogOutIcon /> Logout</li>
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
                    <li className='flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Home/>Dashboard</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <ContactIcon/>Manage Users</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <CalendarClock/>Appointments</li>
                     <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <NotebookPen/>Reports</li>
                    <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' ><Logs /> Logs</li>
                <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' > <Settings/>Settings</li>
               <li className='flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleLogout} ><LogOutIcon /> Logout</li>
                </ul>
            )}
        </nav>
  )
}

export default AdminNavBar