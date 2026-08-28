import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
} from "@/schemas/authSchema";
import { loginUserWithEmailAndPassword } from "@/firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/store";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const existingUser = await loginUserWithEmailAndPassword(data);

      if (!existingUser.userData) {
        throw new Error("User data not found");
      }

      setUser({
        id: existingUser.user.uid,
        name: existingUser.userData.name,
        email: existingUser.userData.email,
        profileURL: "",
      });

      form.reset();

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Invalid email or password.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">

      <Card className="brutal-card w-full max-w-md rounded-none">

        {/* Header */}
        <CardHeader className="space-y-3 border-b-2 border-border pb-6">
          <div className="flex items-center justify-between">
            <div className="border-2 border-border bg-primary px-3 py-1.5 text-sm font-black shadow-[3px_3px_0_var(--shadow-color)]">
              YOUR APP
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Account
            </span>
          </div>

          <div>
            <CardTitle className="text-3xl font-black tracking-tight">
              Welcome back.
            </CardTitle>

            <CardDescription className="mt-2 text-muted-foreground">
              Enter your credentials to continue.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-6">
            <FieldGroup className="gap-5">

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-bold"
                    >
                      Email
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="john@email.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="brutal-input h-12 rounded-none"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-bold"
                    >
                      Password
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      aria-invalid={fieldState.invalid}
                      className="brutal-input h-12 rounded-none"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Firebase error */}
              {form.formState.errors.root && (
                <div className="border-2 border-destructive bg-red-50 px-3 py-2 text-sm font-bold text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-5">

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="brutal-button h-12 w-full rounded-none bg-primary font-black text-primary-foreground hover:bg-accent"
            >
              {form.formState.isSubmitting
                ? "LOGGING IN..."
                : "LOGIN →"}
            </Button>

            <div className="w-full border-t-2 border-border pt-5 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-black text-foreground underline decoration-2 underline-offset-4 hover:text-primary"
                >
                  Create account
                </button>
              </p>
            </div>

          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;