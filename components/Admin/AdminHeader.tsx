import Link from "next/link";
import React from "react";

interface Props {
  list?: number;
}

interface AList {
  shown: string;
  href: string;
}

const AdminHeader: React.FC<Props> = (props) => {
  const listList: AList[] = [
    { shown: "アニメ", href: `/admin` },
    { shown: "プラットフォーム", href: `/admin/platform` },
    { shown: "シーズン", href: `/admin/season` },
    { shown: "制作陣", href: `/admin/creater` },
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
