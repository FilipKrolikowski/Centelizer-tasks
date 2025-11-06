"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useUsers } from "../api/users";
import { User } from "../types/user";
import SingleUser from "./components/SingleUser";
import LoadingSpinner from "../components/LoadingSpinner";
import AddUserModal from "./components/ModalAddUser";

const Task3 = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const { status, data, error, isFetching, isRefetching, refetch } = useUsers(searchInput);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (!searchFilter) {
      refetch();
    }
  }, [searchFilter]);

  return (
    <div className="p-8">
      <h2 className="title mb-4">User search</h2>
      <div className="flex items-center">
        <input
          type="text"
          name="search"
          className="input-primary"
          placeholder="Enter name"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button
          className="ml-4 btn-primary mr-4"
          onClick={() => {
            refetch();
            setSearchFilter(searchInput);
          }}
        >
          Search
        </button>
        {searchFilter && !isFetching && !isRefetching && (
          <button
            className="btn-primary"
            onClick={() => {
              setSearchInput("");
              setSearchFilter("");
            }}
          >
            Reset search
          </button>
        )}

        {isFetching && <LoadingSpinner />}
      </div>
      {data && status === "success" && (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-12 mt-8">
          <AddUserModal />
          {data.map((user: User) => (
            <SingleUser key={user.id} user={user} />
          ))}
        </div>
      )}
      {error?.message && status === "error" && <div className="text-red-600">{error.message}</div>}
    </div>
  );
};

export default Task3;
