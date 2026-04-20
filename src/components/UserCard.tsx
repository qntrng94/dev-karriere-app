import { Link } from "react-router-dom";

import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Venus,
  Mars,
  CircleHelp,
  X,
} from "lucide-react";
import type { User } from "../types/User";

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
}

export const UserCard = ({ user, onDelete }: UserCardProps) => {
  const GenderIcon =
    user.gender === "Männlich"
      ? Mars
      : user.gender === "Weiblich"
        ? Venus
        : CircleHelp;

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "600px",
        position: "relative",
      }}
    >
      <button
        onClick={() => onDelete(user.id)}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <X color="red" size={20} />
      </button>

      <Link
        to={`/edit/${user.id}`}
        style={{ position: "absolute", bottom: "8px", right: "8px" }}
      >
        <button>Bearbeiten</button>
      </Link>

      <img
        src={user.image || "https://placehold.co/100x120"}
        alt={user.username}
        style={{
          width: "100px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "4px",
          marginRight: "1rem",
        }}
      />

      <div>
        <h2 style={{ marginBottom: "0.5rem" }}>{user.username}</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.4rem",
          }}
        >
          <span>
            <Calendar size={16} /> {user.birthdate}
          </span>
          <span>
            <MapPin size={16} /> {user.address}
          </span>
          <span>
            <GenderIcon size={16} /> {user.gender}
          </span>
          <span>
            <Phone size={16} /> {user.phone}
          </span>
          <span>
            <Mail size={16} /> {user.email}
          </span>
          <span>
            <Globe size={16} /> {user.website}
          </span>
        </div>
      </div>
    </div>
  );
};
