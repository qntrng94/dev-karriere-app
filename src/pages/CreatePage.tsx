import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User.ts";
import { useUsers } from "../context/UserContext";

export const CreatePage = () => {
  const { addUser } = useUsers();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<User, "id">>({
    username: "",
    birthdate: "",
    gender: "Männlich",
    email: "",
    address: "",
    phone: "",
    website: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState<
    Partial<Record<keyof Omit<User, "id" | "image">, string>>
  >({});

  const validate = () => {
    const newErrors: Partial<Record<keyof Omit<User, "id" | "image">, string>> =
      {};

    if (!formData.username) newErrors.username = "Username ist erforderlich";
    if (!formData.birthdate)
      newErrors.birthdate = "Geburtsdatum ist erforderlich";
    if (!formData.email) newErrors.email = "Email ist erforderlich";
    if (!formData.address) newErrors.address = "Adresse ist erforderlich";
    if (!formData.phone) newErrors.phone = "Telefon ist erforderlich";
    if (!formData.website) newErrors.website = "Webseite ist erforderlich";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newUser: User = {
      ...formData,
      id: crypto.randomUUID(),
    };
    addUser(newUser);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Geburtsdatum</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
        {errors.birthdate && <p style={{ color: "red" }}>{errors.birthdate}</p>}
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
        <label>Email Adresse</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Post Adresse</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Telefonnummer</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Webseite</label>
        <input
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        {errors.website && <p style={{ color: "red" }}>{errors.website}</p>}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
