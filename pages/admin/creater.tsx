import { GetServerSideProps, NextPage } from "next";
import { pageBaseProps } from "../../types/page";
import CompanyInput from "../../components/Admin/CompanyInput";

const AdminCreater: NextPage = () => {
  return (
    <div className="mla mra content">
      <main>
        <div className="pt40">
          <CompanyInput></CompanyInput>
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
