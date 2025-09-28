import { HiOutlineHome } from "react-icons/hi";
import useUser from "../authentication/useUser";
import { FaRegEdit } from "react-icons/fa";
import AccountInformationModal from "./accountInformationModal";
import useGetProfile from "./useGetProfile";
import { GiCash } from "react-icons/gi";
import Button from "../../ui/Button";
import { useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import Spinner from "../../ui/Spinner";
import ProfileStatistics from "./ProfileStatistics";
import ProfileOrderSummary from "./ProfileOrderSummary";

function ProfileContent() {
  const { user } = useUser();
  const userId = user?.id;
  const { data: profile, isLoading } = useGetProfile(userId);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { email, email_verified } = user.user_metadata;
  const { avatar_url, full_name, address, role, phone_number } = profile ?? {};

  if (isLoading) return <Spinner />;

  return (
    <section className=" max-w-screen min-h-screen p-4 md:px-0 md:py-8 relative">
      <div className="mx-auto max-w-screen-xl sm:px-4 2xl:px-0">
        <ProfileStatistics />
        <div className="bg-gradient-to-r from-blue-300 to-blue-200 dark:from-slate-800 dark:to-purple-400 sm:p-8 p-4 my-4 rounded-lg">
          <div className=" mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16 ">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <img
                  className="h-16 w-16 rounded-lg"
                  src={
                    avatar_url
                      ? avatar_url
                      : "https://gmbynptzvocbgapcxnjy.supabase.co/storage/v1/object/public/avatars/7.jpg"
                  }
                  alt="Helene avatar"
                />
                <div>
                  <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    {role} Account
                  </span>
                  <h2 className="flex items-center text-xl font-bold leading-none text-blue-400 dark:text-purple-300 sm:text-2xl">
                    {full_name}
                  </h2>
                </div>
              </div>
              <dl className="">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Email Address
                </dt>
                <dd className="text-gray-600 dark:text-gray-300">
                  {email}{" "}
                  {email_verified && <MdOutlineVerified className="inline" />}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Home Address
                </dt>
                <dd className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <HiOutlineHome />
                  {address}
                </dd>
              </dl>
            </div>
            <div className="space-y-4">
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </dt>
                <dd className="text-gray-600 dark:text-gray-300">
                  {phone_number}
                </dd>
              </dl>
              <dl>
                <dt className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Payment Methods
                </dt>
                <dd className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <GiCash className=" text-4xl" />
                  </div>
                  <div>
                    <div className="text-sm">
                      <p className="mb-0.5 font-medium text-gray-900 dark:text-white">
                        Cash
                      </p>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
            <button
              type="button"
              className={` flex items-center justify-center ${Button.small} + ${Button.primary}`}
              onClick={() => setModalIsOpen(true)}
            >
              <FaRegEdit className=" mr-1" />
              Edit your data
            </button>
          </div>
        </div>

        <ProfileOrderSummary />
      </div>
      {modalIsOpen && (
        <AccountInformationModal
          setModalIsOpen={setModalIsOpen}
          full_name={full_name}
          email={email}
          phone_number={phone_number}
          address={address}
        />
      )}
    </section>
  );
}

export default ProfileContent;
