export interface User {
  id: string;
  username: string;
  birthdate: string;
  gender: "Männlich" | "Weiblich" | "Divers";
  email: string;
  address: string;
  phone: string;
  website: string;
  image?: string;
}
