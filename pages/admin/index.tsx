import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import AnimeElement from "../../components/AnimeElement";
import { BACKEND_URL } from "../../helper/Config";
import { TAnime, TAnimeAdmin } from "../../types/anime";

interface Props {
  animes: TAnime[];
  kind: string;
  list: number;
  robots: string;
}

const AdminAnims: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="animeList">
            {animes &&
              animes.map((anime, index) => (
                <AnimeElement
                  index={index}
                  anime={anime}
                  mode="admin"
                ></AnimeElement>
              ))}
          </div>
          <div className="mt40">
            <Link href="/admin/post" passHref>
              <a>新規投稿</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const cookies = parseCookies(ctx);
    const res = await fetch(`${BACKEND_URL}/admin/anime/`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ token: cookies["idToken"] }),
    });
    const ret = await res.json();
    return {
      props: {
        animes: ret["data"],
        kind: "admin",
        list: 1,
        robots: "nofollow noopener noreferrer noindex",
      },
    };
  } catch (e) {
    return {
      props: {
        animes: null,
        kind: "admin",
        list: 1,
        robots: "nofollow noopener noreferrer noindex",
      },
    };
  }
};

export default AdminAnims;
