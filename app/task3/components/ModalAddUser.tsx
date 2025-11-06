import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { addUser } from "@/app/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddUserInputs } from "@/app/types/user";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import plusImage from "../../images/plus.svg";
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

export default function AddUserModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserInputs>({
    defaultValues: {
      name: "",
      email: "",
      status: "active",
      gender: "female",
    },
  });

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit: SubmitHandler<AddUserInputs> = (data) => {
    handleAdd(data);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
    setErrorMessage("");
  };

  const handleAdd = (data: AddUserInputs) => {
    addUserMutation.mutate(data);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        className="border-3 cursor-pointer border-white rounded-xl p-4 h-full flex flex-col justify-center"
      >
        <div className="flex justify-center">
          <Image
            loading="eager"
            alt="add-user"
            src={plusImage}
            className="border-4 rounded-full bg-white border-indigo-100"
            width={100}
          />
        </div>
        <div className="text-indigo-900 text-lg font-medium text-center mt-4">ADD NEW</div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="title mb-4">Add user</div>
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
            <div>
              <label className="font-bold">Gender:</label>
              <select className="input-primary w-full" {...register("gender")}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <div className="flex justify-between">
            <div className="mt-4">{addUserMutation.isPending && <LoadingSpinner />}</div>
            <div className="flex gap-4 mt-6 justify-end">
              <button className="btn-primary w-28 rounded-4xl! bg-gray-500!" onClick={handleClose}>
                Cancel
              </button>
              <button onClick={handleSubmit(onSubmit)} className="btn-primary w-28 rounded-4xl!">
                Add
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
