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
import { useUserStore } from "@/store/store";
import { UserRound, Mail, LockKeyhole, ShieldCheck } from "lucide-react";

const ACCENT = "#ccff00";

const ProfileUpdateDialog = () => {
  const user = useUserStore((state) => state.user);

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: "",
      oldpassword: "",
      newpassword: "",
    },
  });

  const onSubmit = () => {
    try {
      console.log("Profile updated!");
      form.reset();
    } catch (error) {
      console.log("Update Failed: ", error);
    }
  };

  const inputClass =
    "h-11 rounded-none border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 font-sans transition-all duration-200 focus:border-[#ccff00]/60 focus:ring-1 focus:ring-[#ccff00]/30";

  return (
    <div className="w-full">
      <Dialog>
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
                active:translate-x-[2px]
                active:translate-y-[2px]
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
                    bg-[#ccff00]/[0.06]
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
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
                        {...field}
                        placeholder={user?.name}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
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
                      />
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
                control={form.control}
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
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                      className={inputClass}
                    />
                  </Field>
                )}
              />

              {/* New password */}
              <Controller
                name="newpassword"
                control={form.control}
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
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                      className={inputClass}
                    />
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
                        bg-white/[0.03]
                        px-6
                        text-xs
                        font-black
                        uppercase
                        tracking-widest
                        text-zinc-400
                        transition-all
                        hover:border-white/20
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      Cancel
                    </Button>
                  }
                />

                <Button
                  type="submit"
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
                  Save Changes
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
