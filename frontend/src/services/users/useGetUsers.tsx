import api from "@/services/api";
import type { User } from "@/types/user.types";
import { useEffect, useState } from "react";

const useGetUsers = () => {
  const [response, setResponse] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<User[]>("/users");
      setResponse(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return { response, isLoading, error };
};

export default useGetUsers;