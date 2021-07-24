import Link from "next/link";
import { TCompany } from "../types/company";

interface Props {
  comp: TCompany;
}

const ComapnyDetail: React.FC<Props> = (props) => {
  return (
    <div>
      <h3>{props.comp.name}</h3>
      <div className="mt10">
        公式サイト:{" "}
        <Link href={props.comp.official_url} passHref>
          <a>{props.comp.official_url}</a>
        </Link>
      </div>
    </div>
  );
};

export default ComapnyDetail;
