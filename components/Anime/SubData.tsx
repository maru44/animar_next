import Link from "next/link";
import { TSubData1 } from "../../types/anime";

const SubData: React.FC<TSubData1> = (props) => {
  if (
    !props.company_name &&
    !props.hash_tag &&
    !props.official_url &&
    !props.twitter_url
  ) {
    return null;
  }

  return (
    <div className="subData1 flexNormal spBw">
      <div className="mr20">
        {props.company_name && <p>制作会社</p>}
        {props.official_url && <p className="mt5">公式URL</p>}
        {props.twitter_url && <p className="mt5">twitter</p>}
        {props.hash_tag && <p className="mt5">ハッシュタグ</p>}
      </div>
      <div className="flex1">
        {props.company_name && (
          <p>
            :{" "}
            <Link
              href="/anime/company/[eng]"
              as={`/anime/company/${props.company_eng}`}
              passHref
            >
              <a>{props.company_name}</a>
            </Link>
          </p>
        )}
        {props.official_url && (
          <p className="mt5">
            :{" "}
            <Link href={props.official_url} passHref>
              <a target="_new" className="">
                {props.official_url}
              </a>
            </Link>
          </p>
        )}
        {props.twitter_url && (
          <p className="mt5">
            :{" "}
            <Link href={`https://twitter.com/${props.twitter_url}`} passHref>
              <a target="_new" className="twitterColor notDecoration">
                {props.twitter_url && `@${props.twitter_url}`}
              </a>
            </Link>
          </p>
        )}
        {props.hash_tag && (
          <p className="mt5">
            :{" "}
            <Link
              href={`https://twitter.com/intent/tweet?hashtags=${props.hash_tag}`}
              passHref
            >
              <a target="_new" className="twitterColor notDecoration">
                {props.hash_tag && `#${props.hash_tag}`}
              </a>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SubData;
