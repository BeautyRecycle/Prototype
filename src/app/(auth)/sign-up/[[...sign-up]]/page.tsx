import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="from-eco-primary-50 to-eco-secondary-50 flex min-h-screen items-center justify-center bg-gradient-to-br">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
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
