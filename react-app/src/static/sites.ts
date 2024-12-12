import { Site } from "../models/Site";

export const sites: Array<Site> = [
  {
    label: "Home",
    link: "/",
    imageSrc: "home.svg",
    description:
      "Home page, nothing special. Description of features in this project.",
  },
  {
    label: "Flexbox",
    link: "/flexbox",
    description:
      "Page responsible for testing flexbox properites. It's purpose is to measure state menagement tools.",
  },
  {
    label: "Grid",
    description: "<TODO>",
    link: "/grid",
  },
  {
    label: "Table",
    description:
      "Table page, page responsible for testing rendering of big amounts of data. It also displays filtering modal.",
    link: "/table",
  },
  {
    label: "Recursive Rendering",
    link: "/recursive-rendering",
    description: 
      "Page responsible for testing recursive rendering of components.",
  },
  {
    label: "Animation",
    description: 
      "Page responsible for testing animations, focuses on evaluating the performance and visual fluidity.",
    link: "/animation",
  },
  {
    label: "Cache",
    description: "A page dedicated to testing caching, evaluating the efficiency of useMemo() and computed.",
    link: "/cache",
  },
];
