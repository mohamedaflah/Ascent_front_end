import { Company } from "./oneCompanyType";
import { User } from "./types.user";

export interface ChatInitial {
  loading: boolean;
  err: boolean | string;
  companies?: Company[] | null;
  users?: User[] | null;
  selectedUser?:Company|User|null
}
