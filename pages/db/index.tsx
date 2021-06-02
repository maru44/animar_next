import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import AnimeElement from "../../components/AnimeElement";
import { BACKEND_URL } from "../../helper/Config";
import { TAnime, TAnimeAdmin } from "../../types/anime";

interface Props {
  animes: TAnime[];
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
    console.log(ret);
    return {
      props: {
        animes: ret["Data"],
      },
    };
  } catch (e) {
    return {
      props: {
        animes: null,
      },
    };
  }
};

export default AdminAnims;
