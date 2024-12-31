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

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser?: {
    id: string;
    full_name?: string;
    username?: string;
    role?: string;
    status?: string;
  };
  onSuccess: () => void;
}

interface FormValues {
  full_name?: string;
  username?: string;
  role?: string;
  status?: string;
}

export function UserFormModal({ open, onOpenChange, selectedUser, onSuccess }: UserFormModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      if (selectedUser) {
        // Update existing user
        const { error } = await supabase
          .from("profiles")
          .update(values)
          .eq("id", selectedUser.id);

        if (error) throw error;
      } else {
        // Create new user
        const { error } = await supabase
          .from("profiles")
          .insert(values);

        if (error) throw error;
      }

      toast({
        title: `User ${selectedUser ? "updated" : "created"} successfully`,
        variant: "default",
      });
      
      onSuccess();
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
          <DialogTitle>{selectedUser ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full_name"
              defaultValue={selectedUser?.full_name}
              {...register("full_name")}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              defaultValue={selectedUser?.username}
              {...register("username")}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <Select
              defaultValue={selectedUser?.role}
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
              defaultValue={selectedUser?.status}
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
              {loading ? "Loading..." : selectedUser ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}