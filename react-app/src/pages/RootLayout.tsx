import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Sidebar from "../components/UI/sidebar/Sidebar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <Sidebar />
      {children || <Outlet />}
    </>
  );
}
