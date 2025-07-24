import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className='p-2 rounded-full bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text absolute top-3 right-3 z-20 '
    >
      {darkMode ? <Sun className='w-6 h-6' /> : <Moon className='w-6 h-6' />}
    </button>
  );
};

export default DarkModeToggle;