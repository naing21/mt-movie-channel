import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "user"; // Fixed role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { role });

      toast.success("Registration successful!", { position: "top-right" });
      navigate("/");
    } catch (err) {
      toast.error("Registration failed! " + err.message, { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="p-6 bg-slate-900 shadow-md shadow-neutral-200 rounded-lg w-80">
        <h2 className="text-2xl mb-4 font-mono text-yellow-500 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 text-black border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 text-black border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          value={role}
          className="w-full p-2 border text-black rounded mb-2 bg-gray-200 cursor-not-allowed"
          disabled
        />
        <button className="w-full bg-yellow-500 font-serif text-black p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
