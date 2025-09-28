import { HiArrowRightOnRectangle } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isloading } = useLogout();

  return (
    <button
      disabled={isloading}
      onClick={logout}
      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full"
    >
      {!isloading ? (
        <span className=" flex items-center gap-2">
          <HiArrowRightOnRectangle /> Logout
        </span>
      ) : (
        <Spinner size={"mini"} />
      )}
    </button>
  );
}

export default Logout;
