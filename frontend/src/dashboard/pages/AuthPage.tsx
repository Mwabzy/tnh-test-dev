import React from "react";
import AuthForm from "../components/AuthForm";

interface Props {
  onAuthSuccess: (token: string) => void;
}

const AuthPage: React.FC<Props> = ({ onAuthSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm onAuthSuccess={onAuthSuccess} />
    </div>
  );
};

export default AuthPage;
