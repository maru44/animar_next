import { GetServerSideProps, NextPage } from "next";
import { pageBaseProps } from "../../types/page";
import CompanyInput from "../../components/Admin/CompanyInput";
import StaffInput from "../../components/Admin/StaffInput";
import RoleInput from "../../components/Admin/RoleInput";

const AdminCreater: NextPage = () => {
  return (
    <div className="mla mra content">
      <main>
        <div className="pt40">
          <h3 className="mb10">制作会社</h3>
          <CompanyInput></CompanyInput>
        </div>
        <div className="mt40">
          <h3 className="mb10">制作スタッフ</h3>
          <StaffInput></StaffInput>
        </div>
        <div className="mt40">
          <h3 className="mb10">役割</h3>
          <RoleInput></RoleInput>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<pageBaseProps> = async (
  props
) => {
  return {
    props: {
      kind: "admin",
      list: 4,
      robots: "nofollow noopener noreferrer noindex",
    },
  };
};

export default AdminCreater;
