"use client";
import { useState, ChangeEvent } from "react";
import { validatePesel } from "../utils/utils";

const Task2 = () => {
  const [pesel, setPesel] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPesel(e.target.value);
  };

  const handleValidate = () => {
    setIsValid(validatePesel(pesel));
  };
  return (
    <div className="p-8">
      <h2 className="title mb-4">PESEL Validator</h2>
      <input className="input-primary" type="text" value={pesel} onChange={handleChange} placeholder="Enter PESEL" />
      <button className="ml-4 btn-primary" onClick={handleValidate}>
        Validate
      </button>
      {isValid !== null && (
        <p className={`font-medium mt-2 ${isValid ? "text-green-500" : "text-red-600"}`}>
          {isValid ? "PESEL is valid" : "PESEL is invalid"}
        </p>
      )}
    </div>
  );
};

export default Task2;
