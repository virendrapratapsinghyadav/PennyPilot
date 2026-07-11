import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "@/schemas/authSchema"





const Login = () => {

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = (data: LoginFormData) => {
    try{
      console.log(data);
      form.reset();
    }
    catch(error){
      console.log(error);
    }
    
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="shadow-xl w-[90%] sm:w-100 md:w-112.5 lg:w-125">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent>

          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="John@email.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
             <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
      </CardContent>

      <CardFooter>
        <Button
        className={'w-full'} 
        type="submit">Login</Button>
      </CardFooter>
      </form>
    </Card>
    </div>
  )
}

export default Login
