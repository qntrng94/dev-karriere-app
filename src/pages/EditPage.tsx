import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import type { User } from "../types/User";

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser } = useUsers();

  const userToEdit = users.find((user) => user.id === id);

  const [formData, setFormData] = useState<User>(
    userToEdit ?? {
      id: "",
      username: "",
      birthdate: "",
      gender: "Männlich",
      email: "",
      address: "",
      phone: "",
      website: "",
      image: "",
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateUser(formData);
    navigate("/");
  };

  if (!userToEdit) return <h1>User nicht gefunden</h1>;

  return (
    <div style={{ maxWidth: "500px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Geburtsdatum</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Geschlecht</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Männlich">Männlich</option>
          <option value="Weiblich">Weiblich</option>
          <option value="Divers">Divers</option>
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Adresse</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Telefon</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Webseite</label>
        <input
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit}>Speichern</button>
    </div>
  );
};
