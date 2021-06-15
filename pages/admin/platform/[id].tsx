import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import PlatformPost from "../../../components/Admin/PlatformPost";
import { fetchUpdatePlatform } from "../../../helper/admin/PlatformHelper";
import { BACKEND_URL } from "../../../helper/Config";
import { TPlatformAdmin } from "../../../types/platform";

interface Props {
  kind: string;
  plat: TPlatformAdmin;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const AdminEditPlatform: NextPage<Props> = (props) => {
  const [plat, setPlat] = useState(props.plat);

  const startUpdatePlatform = async (e: any) => {
    e.preventDefault();
    const ret = await fetchUpdatePlatform(
      e.target.eng_name.value,
      e.target.plat_name.value,
      e.target.url.value,
      e.target.thumb_url.files,
      e.currentTarget.valid.checked,
      plat.id
    );
    if (ret["data"] === 200) {
      // @TODO platform更新処理
      console.log(ret);
    }
  };

  return (
    <div>
      <main>
        <div className="mla mra content">
          <PlatformPost
            fetchFunc={startUpdatePlatform}
            plat={plat}
          ></PlatformPost>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = parseCookies(ctx);
  const id = ctx.params.id;
  const res = await fetch(`${BACKEND_URL}/admin/platform/?id=${id}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: cookies["idToken"] }),
  });
  const ret = await res.json();
  return {
    props: {
      kind: "admin",
      plat: ret["data"],
      robots: "nofollow noopener noreferrer noindex",
    },
  };
};

export default AdminEditPlatform;
