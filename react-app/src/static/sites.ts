import { SidebarLinkProps } from "../models/SidebarLink";

export const sites: Array<SidebarLinkProps> = [
  {
    label: "Home",
    link: "/",
    imageSrc: "home.svg",
    description: "Home page, nothing special. Description of features in this project.",
  },
  {
    label: "Flexbox",
    link: "/flexbox",
    description: "Page responsible for testing flexbox properites. It's purpose is to measure state menagement tools.",
  },
  {
    label: "Table",
    description: "Table page, page responsible for testing rendering of big amounts of data. It also displays filtering modal.",
    link: "/table",
  }
];
