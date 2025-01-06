import { IUser } from "@/types/auth.types";
import { useSelector } from "react-redux";

export default function useGlobalStates() {
  const user: IUser = useSelector((state: any) => state.user);

  return {
    user,
  };
}
