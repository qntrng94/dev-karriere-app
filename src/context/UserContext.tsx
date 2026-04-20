import { createContext, useContext, useReducer, useEffect } from "react";
import type { User } from "../types/User";

type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "UPDATE_USER"; payload: User };

const userReducer = (state: User[], action: Action): User[] => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    case "UPDATE_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      );
    default:
      return state;
  }
};

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const savedUsers = localStorage.getItem("users");
  const initialUsers: User[] = savedUsers ? JSON.parse(savedUsers) : [];

  const [users, dispatch] = useReducer(userReducer, initialUsers);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => dispatch({ type: "ADD_USER", payload: user });
  const deleteUser = (id: string) =>
    dispatch({ type: "DELETE_USER", payload: id });
  const updateUser = (user: User) =>
    dispatch({ type: "UPDATE_USER", payload: user });

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(
      "useUsers muss innerhalb von UserProvider verwendet werden",
    );
  return context;
};
