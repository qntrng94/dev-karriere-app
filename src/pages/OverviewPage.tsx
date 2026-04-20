import { UserCard } from "../components/UserCard";
import { useUsers } from "../context/UserContext";

export const OverviewPage = () => {
  const { users, deleteUser } = useUsers();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={deleteUser} />
      ))}
    </div>
  );
};
