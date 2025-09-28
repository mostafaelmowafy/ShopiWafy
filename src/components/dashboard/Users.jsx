import Spinner from "../../ui/Spinner";
import useGetUsers from "./useGetUsers";

function Users() {
  const { users, isLoading } = useGetUsers();
  if (isLoading) return <Spinner />;
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8 overflow-auto">
      <table className="w-full text-md shadow-md rounded mb-4 overflow-scroll">
        <tbody>
          <tr className="border-b bg-slate-700">
            <th className="text-left p-3 px-5">Name</th>
            <th className="text-left p-3 px-5">Phone Number</th>
            <th className="text-left p-3 px-5">Address</th>
            <th className="text-left p-3 px-5">Role</th>
          </tr>
          {users?.map((user) => (
            <tr className="border-b hover:bg-slate-700 ">
              <td className="p-3 px-5">{user.full_name}</td>
              <td className="p-3 px-5">
                {user.address || "No address provided"}
              </td>
              <td className="p-3 px-5">
                {user.phone_number || "No phone number provided"}
              </td>
              <td className="p-3 px-5">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
