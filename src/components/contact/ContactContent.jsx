import toast from "react-hot-toast";
import { FiPhoneCall } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";

function ContactContent() {
  const phoneNumber = "(+20) 1125477496";

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      toast.success("Phone number copied");
    } catch (err) {
      console.error("Copy [ailed", err);
    }
  };
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <p className="text-base font-semibold uppercase tracking-wide text-blue-300 dark:text-purple-200">
              Contact
            </p>
            <h2 className="font-heading mb-4 font-bold tracking-tight text-blue-400 dark:text-purple-400 text-3xl sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-blue-300 dark:text-purple-200">
              Contact us at any time
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <div className="h-full pr-6 grid grid-cols-2 gap-8 md:gap-20  justify-between p-6">
              <p className="mt-3 mb-12 text-lg col-span-2 md:col-span-1 text-gray-600 dark:text-slate-400 flex-col-1">
                Don't worry, we're always available and will respond as quickly
                as possible. This is basic information about us. You can contact
                us by phone, email, or visit our store.
              </p>
              <ul className="mb-6 md:mb-0 flex col-span-2 md:col-span-1 flex-col lg:items-end ">
                <li className="flex lg:w-3/4">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <SlLocationPin className="text-xl" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Our Address
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      El Geish Street, next to Town Team
                    </p>
                    <p className="text-gray-600 dark:text-slate-400">
                      El Mahalla El Kubra, Egpt
                    </p>
                  </div>
                </li>
                <li className="flex lg:w-3/4">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <FiPhoneCall className="text-xl" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Contact
                    </h3>
                    <p
                      onClick={copyPhone}
                      className="text-gray-600 dark:text-slate-400 cursor-pointer "
                    >
                      Mobile:{" "}
                      <span className="hover:text-gray-400 dark:hover:text-slate-200">
                        {" "}
                        {phoneNumber}
                      </span>
                    </p>
                    <p className="text-gray-600 dark:text-slate-400 ">
                      Mail:{" "}
                      <a
                        className="hover:text-gray-400 dark:hover:text-slate-200"
                        href="mailto:mostafaelmowafy1@gmail.com"
                      >
                        mostafaelmowafy1@gmail.com
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex lg:w-3/4">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <LuClock4 className="text-xl" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Working hours
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Monday - Friday: 08:00 - 17:00
                    </p>
                    <p className="text-gray-600 dark:text-slate-400">
                      Saturday &amp; Sunday: 08:00 - 12:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactContent;
