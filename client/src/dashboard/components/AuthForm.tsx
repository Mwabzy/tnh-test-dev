import React, { useState } from "react";
import { loginUser, registerUser } from "@/api/api";
import { useNavigate } from "react-router";

interface AuthFormProps {
  onAuthSuccess: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.includes("@") || password.length < 6) {
      setError("Invalid email or password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = isRegistering
        ? await registerUser(email, password)
        : await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        onAuthSuccess(data.token);
        navigate("/dashboard");
      } else {
        setError(" Authentication failed.");
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
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-300 cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
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
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
