import Link from "next/link";
import { TCompany } from "../types/company";

interface Props {
  comp: TCompany;
}

const ComapnyDetail: React.FC<Props> = (props) => {
  return (
    <div>
      <h3>{props.comp.name}</h3>
      {props.comp.official_url && (
        <div className="mt10">
          公式サイト:{" "}
          <Link href={props.comp.official_url} passHref>
            <a target="_new">{props.comp.official_url}</a>
          </Link>
        </div>
      )}
      {props.comp.twitter_account && (
        <div className="mt10">
          twitter:{" "}
          <Link
            href={`https://twitter.com/${props.comp.twitter_account}`}
            passHref
          >
            <a target="_new" className="twitterColor notDecoration">
              @{props.comp.twitter_account}
            </a>
          </Link>
        </div>
      )}
      {props.comp.explanation && (
        <div className="mt10">
          <p className="brAll">{props.comp.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ComapnyDetail;
