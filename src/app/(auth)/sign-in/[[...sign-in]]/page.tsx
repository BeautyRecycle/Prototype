import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="from-eco-primary-50 to-eco-secondary-50 flex min-h-screen items-center justify-center bg-gradient-to-br">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "rounded-2xl shadow-xl",
          },
        }}
      />
    </div>
  );
}
