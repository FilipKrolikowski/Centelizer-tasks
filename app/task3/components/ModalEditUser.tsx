import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { editUser } from "@/app/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, EditUserInputs } from "@/app/types/user";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function EditUserModal({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserInputs>({ defaultValues: user });

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit: SubmitHandler<EditUserInputs> = (data) => {
    handleEdit(data);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const handleEdit = (data: EditUserInputs) => {
    editUserMutation.mutate({
      userId: user.id,
      userConfig: data,
    });
  };

  return (
    <div>
      <button className="btn-primary w-28 rounded-4xl!" onClick={handleOpen}>
        Edit
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="title mb-4">Edit user</div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-bold">Name:</label>
              <input
                className="input-primary w-full"
                {...register("name", { required: { value: true, message: "This field is required" } })}
              />
              {errors.name && <div className="text-red-600">{errors.name.message}</div>}
            </div>
            <div>
              <label className="font-bold">Email:</label>
              <input
                className="input-primary w-full"
                {...register("email", {
                  required: { value: true, message: "This field is required" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <div className="text-red-600">{errors.email.message}</div>}
            </div>
            <div>
              <label className="font-bold">Status:</label>
              <select className="input-primary w-full" {...register("status")}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <div className="flex justify-between">
            <div className="mt-4">{editUserMutation.isPending && <LoadingSpinner />}</div>
            <div className="flex gap-4 mt-6 justify-end">
              <button className="btn-primary w-28 rounded-4xl! bg-gray-500!" onClick={handleClose}>
                Cancel
              </button>
              <button onClick={handleSubmit(onSubmit)} className="btn-primary w-28 rounded-4xl!">
                Edit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
