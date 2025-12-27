import { useState } from "react";

export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    console.log(form);
  };
  return { handleChange, data: form, handleSubmit };
}
