import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useUserStore } from "@/store/user.store";
import { UserRound, Mail, LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type profileUpdateFormData } from "@/schemas/profileUpdateSchema";
import { updateUserDocument } from "@/firebase/user.service";
import { updateUserPassword } from "@/firebase/auth.service";

const ACCENT = "#ccff00";
const inputClass = "h-11 rounded-none border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 font-sans transition-all duration-200 focus:border-[#ccff00]/60 focus:ring-1 focus:ring-[#ccff00]/30";


const ProfileUpdateDialog = () => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const[open, setOpen] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<profileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      oldpassword: "",
      newpassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        oldpassword: "",
        newpassword: ""
      });
    }
  }, [user, reset]);
  


  const onSubmit = async (data: profileUpdateFormData) => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const updatedName = data.name.trim();
      const nameChanged = updatedName !== user.name;

      const passwordChanged =
        data.oldpassword.length > 0 ||
        data.newpassword.length > 0;

      // Nothing to update
      if (!nameChanged && !passwordChanged) {
        console.log("No changes detected");
        return;
      }

      // 1. Update password if requested
      if (passwordChanged) {
        await updateUserPassword(
          data.oldpassword,
          data.newpassword
        );
      }

      // 2. Update name if requested
      if (nameChanged) {
        await updateUserDocument(user.id, {
          name: updatedName,
        });

        updateUser({
          name: updatedName,
        });
      }

      // 3. Update form defaults
      reset({
        name: updatedName,
        email: user.email,
        oldpassword: "",
        newpassword: "",
      });
      setOpen(false);
      console.log("Profile updated!", data);
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };

      if (firebaseError.code === "auth/invalid-credential") {
        setError("oldpassword", {
          type: "manual",
          message: "Incorrect password. Please try again.",
        });
      } else {
        console.error("Profile update failed:", error);
      }
    }
  };



  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              className="
                h-11
                w-full
                rounded-none
                border
                border-[#ccff00]/30
                bg-[#ccff00]
                px-5
                text-xs
                font-black
                uppercase
                tracking-widest
                text-black
                transition-all
                duration-200
                hover:bg-[#d6ff33]
                hover:shadow-[4px_4px_0_rgba(204,255,0,0.15)]
                active:translate-x-0.5
                active:translate-y-0.5
                active:shadow-none
              "
            >
              Update Profile
            </Button>
          }
        />

        <DialogContent
          className="
            max-w-lg
            rounded-none
            border
            border-white/10
            bg-[#080808]
            p-0
            text-white
            shadow-[8px_8px_0_rgba(204,255,0,0.08)]
            [&>button]:text-zinc-500
            [&>button]:hover:text-[#ccff00]
          "
        >
          {/* Top accent */}
          <div
            className="absolute left-0 top-0 h-px w-24"
            style={{ background: ACCENT }}
          />

          <div className="p-7 sm:p-8">
            <DialogHeader className="mb-8">
              <div className="mb-5 flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border
                    border-[#ccff00]/30
                    bg-[#ccff00]/6
                  "
                  style={{
                    clipPath:
                      "polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)",
                  }}
                >
                  <UserRound
                    className="h-5 w-5"
                    style={{ color: ACCENT }}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p
                    className="mb-1 text-[9px] font-black uppercase tracking-[0.3em]"
                    style={{ color: ACCENT }}
                  >
                    Account Settings
                  </p>

                  <DialogTitle className="text-xl font-black uppercase tracking-tight text-white">
                    Update Profile
                  </DialogTitle>
                </div>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                Update your profile information or change your account
                password.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel
                      className="
                        mb-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        text-zinc-400
                      "
                    >
                      Name
                    </FieldLabel>

                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                      <Input
                        //onChange update the name in firebase
                        {...field}
                        placeholder="Enter your name"
                        className={`${inputClass} pl-10`}
                        aria-label={user?.name ?? "username"}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name && <p role="alert">{errors.name.message}</p>}
                    </div>
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        className="
                          mb-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-widest
                          text-zinc-400
                        "
                      >
                        Email Address
                      </FieldLabel>

                      <span className="mb-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                        <ShieldCheck className="h-3 w-3" />
                        Account ID
                      </span>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                      <Input
                        {...field}
                        disabled
                        placeholder={user?.email}
                        className={`${inputClass} cursor-not-allowed pl-10 opacity-50`}
                        aria-label={user?.email ?? "useremail"}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && <p role="alert">{errors.email.message}</p>}
                    </div>
                  </Field>
                )}
              />

              {/* Password divider */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-px flex-1 bg-white/[0.07]" />

                <span
                  className="
                    flex
                    items-center
                    gap-2
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-zinc-600
                  "
                >
                  <LockKeyhole className="h-3 w-3" />
                  Password
                </span>

                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>

              {/* Old password */}
              <Controller
                name="oldpassword"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel
                      className="
                        mb-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        text-zinc-400
                      "
                    >
                      Current Password
                    </FieldLabel>

                    <Input
                      //onChange function needed with state verify with user?.password
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                      className={inputClass}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("oldpassword");
                      }}
                    />
                    {errors.oldpassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.oldpassword.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* New password */}
              <Controller
                name="newpassword"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel
                      className="
                        mb-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        text-zinc-400
                      "
                    >
                      New Password
                    </FieldLabel>

                    <Input
                      //onChange function needed with state
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                      className={inputClass}
                    />
                    {errors.newpassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.newpassword.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Footer */}
              <DialogFooter className="mt-8 flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row">
                <DialogClose
                  render={
                    <Button
                      type="button"
                      className="
                        h-11
                        rounded-none
                        border
                        border-white/10
                        bg-white/3
                        px-6
                        text-xs
                        font-black
                        uppercase
                        tracking-widest
                        text-zinc-400
                        transition-all
                        hover:border-white/20
                        hover:bg-white/6
                        hover:text-white
                      "
                    >
                      Cancel
                    </Button>
                  }
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    h-11
                    rounded-none
                    border
                    border-[#ccff00]
                    bg-[#ccff00]
                    px-7
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    text-black
                    transition-all
                    hover:bg-[#d6ff33]
                    hover:shadow-[4px_4px_0_rgba(204,255,0,0.15)]
                    active:translate-x-0.5
                    active:translate-y-0.5
                    active:shadow-none
                  "
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </div>

          {/* Bottom corner accents */}
          <div
            className="absolute bottom-0 right-0 h-px w-16"
            style={{ background: ACCENT }}
          />
          <div
            className="absolute bottom-0 right-0 h-16 w-px"
            style={{ background: ACCENT }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileUpdateDialog;
