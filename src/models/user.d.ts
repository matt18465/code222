export interface User {
  id: number;
  email: string;
  name?: string;
  securityLevel: number;
  isPasswordLocked: boolean;
}

export interface UserState {
  data: {
    user: User;
    groups: string[];
    claims: UserStateClaims[];
    access_token: string;
    tokenExpires: string;
    token_type: string;
  };
  message: string;
  succeeded: boolean;
}

export interface UserStateClaims {
  type: string;
  value: string;
  valueType: string;
}
