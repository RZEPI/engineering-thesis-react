import { useEffect, useState } from "react";

import { SidebarLinkProps } from "../../../models/SidebarLink";
import { Link, useLocation } from "react-router-dom";

import styles from "../../../styles/SidebarLink.module.css";

export default function ({ label, imageSrc, link }: SidebarLinkProps) {
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const { pathname }: { pathname: string } = useLocation();
  let linkClasses = "";

  if (pathname === link) {
    linkClasses = styles["active"];
  }
  useEffect(() => {
    if (imageSrc) {
      const imageUrl = new URL(`../../../assets/${imageSrc}`, import.meta.url)
        .href;
      setLoadedImage(imageUrl);
    }
  }, [imageSrc]);

  return (
    <li className={styles["link"]}>
      <Link to={link} className={linkClasses}>
        <div></div>
        {imageSrc ? <img src={loadedImage!} alt={label} /> : <div></div>}
        <span>{label}</span>
      </Link>
    </li>
  );
}
