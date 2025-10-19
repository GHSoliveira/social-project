import { create } from "zustand";
import { persist } from "zustand/middleware";

class User {
  constructor(username, role, profilePicture, bio, email, password, posts) {
    this.username = username;
    this.role = role;
    this.profilePicture = profilePicture;
    this.bio = bio;
    this.email = email;
    this.password = password;
    this.posts = posts;
  }
}

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      whoIsLogged: null,
      isLoggedIn: false,

      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ whoIsLogged: user, isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ whoIsLogged: null, isLoggedIn: false });
      },

      addUser: (username, email, password) => {
        const exists = get().users.some(
          (u) => u.email === email || u.username === username
        );
        if (exists) return null;

        const newUser = new User(
          username,
          "Newbie",
          "https://i.pravatar.cc/150",
          "Oi, sou novo por aqui!",
          email,
          password,
          []
        );
        set((state) => ({
          users: [...state.users, newUser],
          whoIsLogged: newUser,
          isLoggedIn: true,
        }));
        return newUser;
      },

      updateProfilePicture: (newPicture) => {
        const logged = get().whoIsLogged;
        if (!logged) return;

        const updatedUser = { ...logged, profilePicture: newPicture };
        const updatedUsers = get().users.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        );

        set({
          whoIsLogged: updatedUser,
          users: updatedUsers,
        });
      },

      updateBio: (newBio) => {
        const logged = get().whoIsLogged;
        if (!logged) return;

        const updatedUser = { ...logged, bio: newBio };
        const updatedUsers = get().users.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        );

        set({
          whoIsLogged: updatedUser,
          users: updatedUsers,
        });
      },
      updateUserRole: (newRole) => {
        const user = get().whoIsLogged;
        if (!user) return;

        const updatedUser = { ...user, role: newRole };
        const updatedUsers = get().users.map((u) =>
          u.email === updatedUser.email ? updatedUser : u
        );

        set({
          whoIsLogged: updatedUser,
          users: updatedUsers,
        });
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.users) {
          state.users = state.users.map(
            (u) =>
              new User(
                u.username,
                u.role,
                u.profilePicture,
                u.bio,
                u.email,
                u.password,
                u.posts
              )
          );
        }
      },
    }
  )
);
