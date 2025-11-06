import { User } from "../../types/user";
import userImage from "../../images/user.svg";
import Image from "next/image";
import EditUserModal from "./ModalEditUser";
import DeleteUserModal from "./ModalDeleteUser";

const SingleUser = ({ user }: { user: User }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow">
      <div className="flex justify-center">
        <Image alt="user-avatar" src={userImage} className="border-4 rounded-full border-indigo-100" width={100} />
      </div>
      <div className="font-medium text-gray-900 text-lg text-center mt-2">{user.name}</div>
      <div className="font-medium text-gray-400 text-sm text-center break-all">{user.email}</div>
      <div className="font-medium text-indigo-700 text-md text-center capitalize mt-6">{user.gender}</div>
      <div className=" text-gray-400 text-xs text-center">Gender</div>

      <div className="flex justify-center mt-6">
        <span className={`w-4 h-4 rounded-full ${user.status === "active" ? "bg-green-600" : "bg-red-600"}`} />
      </div>

      <div className=" text-gray-400 text-xs text-center">Status</div>
      <div className="mt-8 flex justify-center gap-4">
        <DeleteUserModal user={user} />
        <EditUserModal user={user} />
      </div>
    </div>
  );
};

export default SingleUser;
