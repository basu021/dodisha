import DashBoardLayerOne from "@/components/DashBoardLayerOne";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";

export const metadata = {
  title: "Dashboard — Dodisha Admin",
  description: "Dodisha admin dashboard.",
};

const Page = () => {
  return (
    <MasterLayout>
      <Breadcrumb title='AI' />
      <DashBoardLayerOne />
    </MasterLayout>
  );
};

export default Page;
