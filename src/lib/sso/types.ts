export type SsoUser = {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  googleSub: string | null;
};

export type SsoSessionPayload = {
  user: SsoUser | null;
};
