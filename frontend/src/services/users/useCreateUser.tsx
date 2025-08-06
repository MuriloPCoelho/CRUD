import api from "@/services/api";
import type { User } from "@/types/user.types";
import { useState } from "react";

interface CreateUserData {
  name: string;
  email: string;
}

const useCreateUser = () => {
  const [response, setResponse] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: CreateUserData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<User>("/users", userData);
      setResponse(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, createUser };
};

export default useCreateUser;