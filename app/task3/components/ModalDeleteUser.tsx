import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { deleteUser } from "@/app/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/app/types/user";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function DeleteUserModal({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const handleDelete = () => {
    deleteUserMutation.mutate(user.id);
  };

  return (
    <div>
      <button
        onClick={() => handleOpen()}
        className="text-white bg-red-500 py-2 px-8 w-28 rounded-4xl hover:bg-red-600 cursor-pointer"
      >
        Delete
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="title mb-4">Delete user</div>
          <div>
            Are you sure you want to delete <span className="font-bold">{user.name}</span> user?
          </div>
          <div className="flex justify-between">
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            <div className="mt-6">{deleteUserMutation.isPending && <LoadingSpinner />}</div>
            <div className="flex gap-4 mt-6 justify-end">
              <button className="btn-primary w-28 rounded-4xl!" onClick={handleClose}>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-red-500 py-2 px-8 w-28 rounded-4xl hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
