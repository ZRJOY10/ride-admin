import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In - cholBhai"
        description="Sign in to your cholBhai Admin Dashboard account."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
