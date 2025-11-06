import React, { useState } from "react";
import { loginUser, registerUser } from "@/api/api";
import { useNavigate } from "react-router";

interface AuthFormProps {
  onAuthSuccess: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (isRegistering) {
      if (!username.trim()) {
        setError("Username is required.");
        return;
      }
      if (!email.trim()) {
        setError("Email is required.");
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        setError("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    } else {
      if (!username.trim()) {
        setError("Username is required.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    setLoading(true);

    try {
      let data;

      if (isRegistering) {
        data = await registerUser(username, email, password);
      } else {
        data = await loginUser(username, password);
      }

      if (data.token) {
        console.log("Token received:", data.token);
        console.log("User data", data.user);
        localStorage.setItem("token", data.token);
        try {
          const storedToken = localStorage.getItem("token");
          console.log("Token in localStorage after setting:", storedToken);
        } catch (err) {
          console.error("Error setting token in localStorage:", err);
        }

        onAuthSuccess(data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Authentication failed.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-2">
        {isRegistering ? "Sign Up" : "Login"}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {isRegistering ? "Create an account" : "Sign in to your account"}
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 mb-3 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {isRegistering && (
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegistering && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      <button
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-400 cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : isRegistering ? "Sign Up" : "Login"}
      </button>

      <hr className="my-6" />

      <div className="text-center">
        <p className="text-sm">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          className="text-red-600 font-semibold mt-2 cursor-pointer"
          onClick={() => {
            setError("");
            setIsRegistering(!isRegistering);
          }}
        >
          {isRegistering ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
