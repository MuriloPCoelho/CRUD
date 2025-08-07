import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import useGetUsers from "@/services/users/useGetUsers";
import useCreateUser from "@/services/users/useCreateUser";
import ModalUsers from "@/components/modalUsers";

const App = () => {
  const { response } = useGetUsers();
  const { createUser } = useCreateUser();

  const handleCreateUser = async () => {
    await createUser({ name: "João", email: "joao@example.com" });
  };

  useEffect(() => {
    console.log(response);
    handleCreateUser();
  }, [response]);

  return (
    <div className="dark:bg-neutral-900 h-dvh w-screen dark:text-white text-neutral-900">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-1/2 flex flex-col gap-8">
          <form action="">
            <div className="dark:bg-neutral-800 grid grid-cols-3 grid-rows-2 rounded p-8 gap-x-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="search">Search</Label>
                <Input type="text" placeholder="Search invoices..." />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="search">Search</Label>
                <Input type="text" placeholder="Search invoices..." />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="search">Search</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full flex justify-end row-start-2 col-span-4 items-end">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Search
                </Button>
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <ModalUsers />
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status ? "Active" : "Inactive"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
