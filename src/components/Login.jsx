import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", { position: "top-right" });
      navigate("/");
    } catch (err) {
      toast.error("Login failed!", { position: "top-right" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", { position: "top-right" });
    } catch (err) {
      toast.error("Logout failed! " + err.message, { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-900">
      {user ? (
        <div className="p-6 bg-slate-900 shadow-md shadow-yellow-200 rounded-lg w-80 text-center">
          <h2 className="text-2xl font-mono mb-4 text-yellow-500">User Info</h2>
          <p className="text-white font-mono mb-2">Email: {user.email}</p>
          <p className="text-white font-mono mb-2">Password: <span className="font-mono">{showPassword ? password : "••••••"}</span></p>
          <button onClick={() => setShowPassword(!showPassword)} className="w-full bg-gray-500 font-mono text-white p-2 rounded mb-2">
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <button onClick={handleLogout} className="w-full bg-red-500 font-mono text-white p-2 rounded">
            Log Out
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="p-6 bg-slate-900 shadow-md shadow-yellow-200 rounded-lg w-80">
          <h2 className="text-2xl font-mono mb-4 text-center text-yellow-500">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full text-black p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full text-black p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-yellow-500 font-serif text-black p-2 rounded mb-2">Login</button>
          <p className="text-sm text-center text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;