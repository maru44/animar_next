import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import PlatformPost from "../../../components/Admin/PlatformPost";
import { fetchUpdatePlatform } from "../../../helper/admin/PlatformHelper";
import { BACKEND_URL } from "../../../helper/Config";
import { pageBaseProps } from "../../../types/page";
import { TPlatformAdmin } from "../../../types/platform";

type Props = {
  plat: TPlatformAdmin;
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  id: string;
}

const AdminEditPlatform: NextPage<Props> = (props) => {
  const [plat, setPlat] = useState(props.plat);

  const startUpdatePlatform = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ret = await fetchUpdatePlatform(
      e.currentTarget.eng_name.value,
      e.currentTarget.plat_name.value,
      e.currentTarget.url.value,
      e.currentTarget.thumb_url.files,
      e.currentTarget.valid.checked,
      plat.id
    );
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
