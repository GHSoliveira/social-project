export const configurations = {
  home: {
    options: [
      {
        optionName: "Home",
        src: "/home",
        icon: "Home",
        needLogin: false,
      },
      {
        optionName: "Notifications",
        src: "",
        icon: "Bell",
        needLogin: true,
      },
      {
        optionName: "Messages",
        src: "",
        icon: "Mail",
        needLogin: true,
      },
      {
        optionName: "Profile",
        src: "/profile",
        icon: "User",
        needLogin: true,
      },
      {
        optionName: "Plano +",
        src: "",
        icon: "Star",
        needLogin: true,
      },
      {
        optionName: "Sair",
        src: "/",
        icon: "LogOut",
        needLogin: false,
      },
    ],
  },
  postCreation: {
    options: [
      {
        optionName: "Home",
        src: "/home",
        icon: "Home",
        needLogin: false,
      },
      {
        optionName: "Profile",
        src: "",
        icon: "User",
        needLogin: true,
      },
      {
        optionName: "Plano +",
        src: "",
        icon: "Star",
        needLogin: true,
      },
      {
        optionName: "Sair",
        src: "/",
        icon: "LogOut",
        needLogin: false,
      },
    ],
  },
};
