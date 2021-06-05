import { NextPage } from "next";
import Link from "next/link";

interface Props {
  list?: number;
}

interface AList {
  shown: string;
  href: string;
}

const AdminHeader: NextPage<Props> = (props) => {
  console.log(props.list);
  const listList: AList[] = [
    { shown: "アニメ", href: `/admin` },
    { shown: "プラットフォーム", href: `/admin/platform` },
  ];

  return (
    <div className="headerCon2 w100 alCen flexNormal">
      {listList &&
        listList.map((lst: AList, index: number) => (
          <div
            className={
              props.list
                ? props.list === index + 1
                  ? "hrefBox flexCen now"
                  : "hrefBox flexCen"
                : "hrefBox flexCen"
            }
            key={index}
          >
            {lst.shown}
            <Link href={lst.href} passHref>
              <a className="hrefBoxIn"></a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AdminHeader;
