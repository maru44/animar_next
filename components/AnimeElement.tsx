import { NextPage } from "next";
import Link from "next/link";
import { TAnime } from "../types/anime";

interface Props {
  index: number;
  anime: TAnime;
  mode?: string;
}

const AnimeElement: NextPage<Props> = (props) => {
  const anime = props.anime;
  const index = props.index;
  const mode = props.mode;

  return (
    <div className="hrefBox oneAnime ovHide mb15" key={index}>
      <div className="flexNormal">
        <div className="w20 thumb frame">
          {anime.thumb_url ? (
            <img
              className="w100 contain"
              src={anime.thumb_url}
              alt={anime.title}
            />
          ) : (
            <img className="w100 contain" />
          )}
        </div>
        <div className="flex1">
          <h3>{anime.title}</h3>
          <small className="copyright">&copy;{anime.copyright}</small>
          <p className="description brAll">{anime.description}</p>
        </div>
      </div>
      {mode && mode === "admin" && (
        <Link
          href="/admin/update/[id]"
          as={`/admin/update/${anime.id}`}
          passHref
        >
          <a className="hrefBoxIn"></a>
        </Link>
      )}
      {!mode && (
        <Link href="/anime/[slug]" as={`/anime/${anime.slug}`} passHref>
          <a className="hrefBoxIn"></a>
        </Link>
      )}
    </div>
  );
};

export default AnimeElement;
