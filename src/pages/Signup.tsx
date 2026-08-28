import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupSchema, type SignupFormData } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signupUserWithEmailAndPassword } from "@/firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/store";

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const newUser = await signupUserWithEmailAndPassword(data);

      setUser({
        id: newUser.user.uid,
        name: data.name,
        email: data.email,
        profileURL: "",
      });

      navigate("/dashboard");
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="brutal-card w-full max-w-md">
        {/* Header */}
        <CardHeader className="border-b-2 border-border px-6 pb-6 pt-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center border-2 border-border bg-primary shadow-[3px_3px_0_var(--shadow-color)]">
              <span className="text-2xl font-black text-primary-foreground">
                P
              </span>
            </div>

            <div className="border-2 border-border bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
              PennyPilot
            </div>
          </div>

          <CardTitle className="text-3xl font-black tracking-tight text-foreground">
            Create your account
          </CardTitle>

          <CardDescription className="mt-2 text-sm leading-6 text-muted-foreground">
            Register below to get access to your PennyPilot dashboard.
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="px-6 py-7">
            <FieldGroup className="gap-5">
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-foreground"
                    >
                      Name
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
                      className="brutal-input h-11 rounded-none px-3 shadow-none placeholder:text-muted-foreground focus:shadow-[3px_3px_0_var(--shadow-color)]"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-foreground"
                    >
                      Email
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      className="brutal-input h-11 rounded-none px-3 shadow-none placeholder:text-muted-foreground focus:shadow-[3px_3px_0_var(--shadow-color)]"
                    />

                    {fieldState.error && (
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
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-foreground"
                    >
                      Password
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Create a password"
                      className="brutal-input h-11 rounded-none px-3 shadow-none placeholder:text-muted-foreground focus:shadow-[3px_3px_0_var(--shadow-color)]"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-foreground"
                    >
                      Confirm Password
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Repeat your password"
                      className="brutal-input h-11 rounded-none px-3 shadow-none placeholder:text-muted-foreground focus:shadow-[3px_3px_0_var(--shadow-color)]"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          {/* Footer */}
          <CardFooter className="border-t-2 border-border px-6 py-6">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="brutal-button h-12 w-full rounded-none bg-primary text-sm font-black uppercase tracking-wide text-primary-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {form.formState.isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

export default Signup;
