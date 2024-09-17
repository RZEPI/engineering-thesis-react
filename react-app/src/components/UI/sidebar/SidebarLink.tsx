import { SidebarLinkProps } from "../../../models/SidebarLink";
import { Link, useLocation } from "react-router-dom";

import styles from "../../../styles/SidebarLink.module.css";

export default function ({ label, imageSrc, link }: SidebarLinkProps) {
  const { pathname }: { pathname: string } = useLocation();
  let linkClasses = "";

  if (pathname === link) {
    linkClasses = styles["active"];
  }
  return (
    <li className={styles["link"]}>
      <Link to={link} className={linkClasses}>
        <div></div>
        {imageSrc ? <img src={imageSrc} alt={label} /> : <div></div>}
        <span>{label}</span>
      </Link>
    </li>
  );
}
