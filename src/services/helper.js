import { toast } from "react-hot-toast";

export const toaster = {
  error: (message = {}) => {
    if (typeof message === "string") {
      toast.error(message);
    } else if (typeof message === "object" && message?.message) {
      toast.error(message.message);
    } else {
      toast.error("Something went wrong!");
    }
  },
  success: (message = {}) => {
    if (typeof message === "string") {
      toast.success(message);
    } else if (typeof message === "object" && message?.message) {
      toast.success(message.message);
    } else {
      toast.success("Success!");
    }
  },
};
