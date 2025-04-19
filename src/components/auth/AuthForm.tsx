
import { GraduationCap } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type AuthFormProps = {
  mode: 'login' | 'register';
  isAdmin?: boolean;
};

export function AuthForm({ mode, isAdmin = false }: AuthFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="bg-fud-green-50 rounded-full p-3">
          <GraduationCap className="h-8 w-8 text-fud-green" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-1">
        {mode === 'login' 
          ? (isAdmin ? 'Admin Login' : 'Alumni Login') 
          : 'Alumni Registration'}
      </h1>
      
      <p className="text-gray-500 text-center mb-6">
        {mode === 'login' 
          ? 'Welcome back! Please enter your details.' 
          : 'Join the FUD alumni network!'}
      </p>

      {mode === 'login' ? (
        <LoginForm isAdmin={isAdmin} />
      ) : (
        <RegisterForm />
      )}
    </div>
  );
}
