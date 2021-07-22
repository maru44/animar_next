import Link from "next/link";
import { TSubData1 } from "../../types/anime";

const SubData: React.FC<TSubData1> = (props) => {
  if (!props.hash_tag && !props.official_url && !props.twitter_url) {
    return null;
  }
  return (
    <div className="subData1 flexNormal spBw">
      <div className="mr20">
        <p>公式URL</p>
        <p className="mt5">twitter</p>
        <p className="mt5">ハッシュタグ</p>
      </div>
      <div className="flex1">
        <p>
          :{" "}
          <Link href={props.official_url} passHref>
            <a className="">{props.official_url}</a>
          </Link>
        </p>
        <p className="mt5">
          :{" "}
          <Link href={`https://twitter.com/${props.twitter_url}`} passHref>
            <a target="_new" className="twitterColor notDecoration">
              {props.twitter_url && `@${props.twitter_url}`}
            </a>
          </Link>
        </p>
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
      </div>
    </div>
  );
};

export default SubData;
