import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { TPlatformAdmin } from "../../../types/platform";
import { BACKEND_URL } from "../../../helper/Config";
import { useState } from "react";
import PlatformPost from "../../../components/Admin/PlatformPost";
import Link from "next/link";
import { fetchInsertPlatform } from "../../../helper/admin/PlatformHelper";
import { pageBaseProps } from "../../../types/page";

type Props = {
  plats: TPlatformAdmin[];
} & pageBaseProps;

const AdminPlatform: NextPage<Props> = (props) => {
  const [plats, setPlats] = useState(props.plats);

  const startInsertPlatform = async (e: any) => {
    e.preventDefault();
    const ret = await fetchInsertPlatform(
      e.target.eng_name.value,
      e.target.plat_name.value,
      e.target.url.value,
      e.target.thumb_url.files,
      e.currentTarget.valid.checked
    );
  };

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="">
            {plats &&
              plats.map((plat: TPlatformAdmin, index: number) => (
                <article key={index} className="mb15 hrefBox">
                  <h4>
                    {plat.id}: {plat.plat_name}
                  </h4>
                  <p>URL: {plat.base_url}</p>
                  <Link
                    href="/admin/platform/[id]"
                    as={`/admin/platform/${plat.id}`}
                    passHref
                  >
                    <a className="hrefBoxIn"></a>
                  </Link>
                </article>
              ))}
          </div>
          <PlatformPost
            fetchFunc={startInsertPlatform}
            plat={null}
          ></PlatformPost>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = parseCookies(ctx);
  const res = await fetch(`${BACKEND_URL}/admin/platform/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token: cookies["idToken"] }),
  });
  const ret = await res.json();
  return {
    props: {
      plats: ret["data"],
      robots: "nofollow noopener noreferrer noindex",
      kind: "admin",
      list: 2,
    },
  };
};

export default AdminPlatform;
