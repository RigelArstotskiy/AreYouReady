declare module "next-auth" {
  interface User {
    id: string;
    isStudent: boolean;
    isMentor: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isStudent: boolean;
      isMentor: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isStudent: boolean;
    isMentor: boolean;
  }
}
