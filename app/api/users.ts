import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";
import axios from "axios";
import { EditUserInputs, AddUserInputs } from "../types/user";

// Normally I would keep this in .env file
const API_KEY = "ca1623d79cddd0a20e4d42124dfebd66ee75eee6225a84315c8d1206d0996453";

// I would use infiniteQuery or add pagination but there is no data from api about this to do it properly
export const useUsers = (search: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<Array<User>> => {
      const response = await axios(
        `https://gorest.co.in/public/v2/users?name=${search}&page=1&per_page=12&access-token=${API_KEY}`
      );
      return await response.data;
    },
  });
};

export const deleteUser = (userId: number) => {
  return axios.delete(`https://gorest.co.in/public/v2/users/${userId}?access-token=${API_KEY}`);
};

export const editUser = ({ userId, userConfig }: { userId: number; userConfig: EditUserInputs }) => {
  return axios.patch(`https://gorest.co.in/public/v2/users/${userId}?access-token=${API_KEY}`, userConfig);
};

export const addUser = (userConfig: AddUserInputs) => {
  return axios.post(`https://gorest.co.in/public/v2/users?access-token=${API_KEY}`, userConfig);
};
