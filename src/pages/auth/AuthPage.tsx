
import { AuthForm } from "@/components/auth/AuthForm";
import Layout from "@/components/layout/Layout";

type AuthPageProps = {
  mode: 'login' | 'register';
  isAdmin?: boolean;
};

const AuthPage = ({ mode, isAdmin = false }: AuthPageProps) => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <AuthForm mode={mode} isAdmin={isAdmin} />
      </div>
    </Layout>
  );
};

export default AuthPage;
