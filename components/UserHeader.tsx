import Link from 'next/link';

interface Props {
  list?: number;
  uid: string;
}

interface AList {
  shown: string;
  href: string;
}

const UserHeader: React.FC<Props> = (props) => {
  const listList: AList[] = [
    { shown: '見てるアニメ', href: `/watch/${props.uid}` },
    { shown: 'レビュー', href: `/reviews/${props.uid}` },
    { shown: 'コラム', href: `/column/u/${props.uid}` },
  ];

  return (
    <div className="headerCon2 w100 alCen flexNormal">
      {listList &&
        listList.map((lst: AList, index: number) => (
          <div
            className={
              props.list
                ? props.list === index + 1
                  ? 'hrefBox flexCen now'
                  : 'hrefBox flexCen'
                : 'hrefBox flexCen'
            }
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

export default UserHeader;
