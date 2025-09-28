import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

function DarkmodeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className=" flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 dark:hover:bg-purple-100 w-full"
    >
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />} Mode
    </button>
  );
}

export default DarkmodeToggle;
