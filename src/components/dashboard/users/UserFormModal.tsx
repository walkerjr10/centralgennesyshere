import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Profile } from "./types";

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: Profile;
  onSuccess?: () => void;
}

interface FormValues {
  email: string;
  password?: string;
  confirmPassword?: string;
  full_name?: string;
  username?: string;
  role?: string;
  status?: string;
}

export function UserFormModal({ open, onOpenChange, user, onSuccess }: UserFormModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: {
      full_name: user?.full_name || '',
      username: user?.username || '',
      role: user?.role || 'user',
      status: user?.status || 'active',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch("password");

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      if (user) {
        // Update existing user
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: values.full_name,
            username: values.username,
            role: values.role || 'user',
            status: values.status || 'active'
          })
          .eq("id", user.id);

        if (error) throw error;
      } else {
        // Create new user with auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password!,
          options: {
            data: {
              full_name: values.full_name,
              username: values.username,
            }
          }
        });

        if (authError) throw authError;

        // The profile will be created automatically through the database trigger
      }

      toast({
        title: `User ${user ? "updated" : "created"} successfully`,
        variant: "default",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      onOpenChange(false);
      reset();
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!user && (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password *
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password *
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value =>
                      value === password || "The passwords do not match"
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full_name"
              {...register("full_name")}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              {...register("username")}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <Select
              value={user?.role || 'user'}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select
              value={user?.status || 'active'}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : user ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}