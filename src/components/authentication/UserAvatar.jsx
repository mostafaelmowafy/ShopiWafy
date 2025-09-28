import useUser from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  // console.log(user);
  return (
    <div className="flex items-center gap-5 font-medium">
      <span className="block max-w-[160px] truncate text-sm text-gray-700">
        {email}
      </span>
    </div>
  );
}

export default UserAvatar;
