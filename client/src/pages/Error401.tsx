import { Shield, Lock, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const Error401 = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg p-4">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="relative mb-8">
          <Shield className="w-24 h-24 text-light-accent dark:text-dark-accent" />
          <Lock className="w-12 h-12 text-light-text dark:text-dark-text absolute bottom-0 right-0" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-light-accent dark:text-dark-accent">
          401
        </h1>
        
        <h2 className="text-2xl font-semibold mb-2 text-light-text dark:text-dark-text">
          Unauthorized Access
        </h2>
        
        <p className="text-light-secondary dark:text-dark-secondary mb-8">
          Oops! You're not authorized to access this page.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-light-text dark:text-dark-text">
            What can you do?
          </h3>
          
          <ul className="space-y-2 text-light-secondary dark:text-dark-secondary">
            <li>1. Check your credentials</li>
            <li>2. Contact support</li>
            <li>
              3. Go back to{" "}
              <Link 
                to="/" 
                className="text-light-accent dark:text-dark-accent hover:underline inline-flex items-center gap-1"
              >
                <Home className="w-4 h-4" /> home page
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Error401