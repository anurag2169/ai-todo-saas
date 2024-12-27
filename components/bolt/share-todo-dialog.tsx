"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";
import { Label } from "../ui/label";

interface ShareTodoDialogProps {
  onShare: (email: string) => void;
}

export function ShareTodoDialog({ onShare }: ShareTodoDialogProps) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleShare = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() && emailRegex.test(email.trim())) {
      onShare(email.trim());
      setEmail("");
      setOpen(false);
    } else {
      setIsEmailValid(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Todo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailValid && (
            <Label htmlFor="email" className="text-red-500 text-sm">
              Please enter a valid email address.
            </Label>
          )}
          <Button onClick={handleShare} className="w-full">
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
