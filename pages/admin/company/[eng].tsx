import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { TCompany } from "../../../types/company";
import { BACKEND_URL } from "../../../helper/Config";
import { pageBaseProps } from "../../../types/page";
import CompanyInput from "../../../components/Admin/CompanyInput";
import { parseCookies } from "nookies";

type Props = {
  comp: TCompany;
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  eng: string;
}

const CompanyUpdate: NextPage<Props> = (props) => {
  return (
    <div>
      <main>
        <div className="mla mra content">
          <h3 className="mb10">会社更新</h3>
          <CompanyInput comp={props.comp}></CompanyInput>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const company = ctx.params.eng;
  const cookies = parseCookies(ctx);
  const token = cookies["idToken"];

  const res = await fetch(`${BACKEND_URL}/admin/company/?company=${company}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: token }),
  });
  const ret = await res.json();
  const comp: TCompany = ret["data"];

  return {
    props: {
      kind: "admin",
      comp: comp,
      robots: "nofollow noopener noreferrer noindex",
    },
  };
};

export default CompanyUpdate;
