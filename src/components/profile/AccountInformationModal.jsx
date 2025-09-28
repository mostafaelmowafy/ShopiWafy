import { IoClose } from "react-icons/io5";
import Button from "../../ui/Button";
import { useState } from "react";
import useUpdateProfile from "./useUpdateProfile";
import useUser from "../authentication/useUser";
import toast from "react-hot-toast";

function AccountInformationModal({
  setModalIsOpen,
  full_name,
  email,
  phone_number,
  address,
}) {
  const [userName, setUserName] = useState(full_name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone_number);
  const [userAddress, setUserAddress] = useState(address);

  const { user } = useUser();
  const userId = user?.id;

  const { updateProfile, isLoading } = useUpdateProfile({
    onSuccess: () => setModalIsOpen(false), // نقفل المودال بعد النجاح
  });

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    toast.promise(
      updateProfile({
        userId,
        full_name: userName,
        phone_number: userPhone,
        address: userAddress,
      }),
      {
        loading: "Saving...",
        success: <b>Profile updated successfully!{setModalIsOpen(false)}</b>,
        error: <b>Failed to update profile.</b>,
      }
    );
  };

  if (isLoading) return null;
  return (
    <div className=" backdrop-blur-sm max-h-auto fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased md:inset-0">
      <div className=" max-h-auto absolute max-h-full w-full max-w-lg p-4 left-[2vw] sm:left-[15vw] md:left-[20vw] lg:left-[30vw] xl:left-[35vw] right-0 top-1/4">
        <div className=" rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
            <h3 className="text-lg font-semibold text-blue-400 dark:text-purple-300">
              Account Information
            </h3>
            <button
              type="button"
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setModalIsOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          <form onSubmit={handleUpdateInfo} className="p-4 md:p-5">
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="full_name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Full Name*
                </label>
                <input
                  type="text"
                  id="full_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Enter your name"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="phone-input_billing_modal"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number*
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="phone-input"
                      className="z-20 block w-full rounded-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                      placeholder="01173177023"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="address_billing_modal"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Home Address*
                </label>
                <textarea
                  id="address_billing_modal"
                  rows="4"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Enter here your address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5 flex justify-center items-center mt-8 w-full ">
              <button
                type="submit"
                className={Button.small + Button.primary + "lg:w-1/2"}
              >
                {isLoading ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                className="lg:w-1/2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountInformationModal;
