import Link from 'next/link';

interface Props {
  list?: number;
}

interface AList {
  shown: string;
  href: string;
}

const listList: AList[] = [
  { shown: 'アニメ一覧', href: '/anime' },
  { shown: 'コラム', href: '/column' },
  { shown: '放送予定通知', href: '/notification' },
];

const ListHeader: React.FC<Props> = (props) => {
  return (
    <div className="headerCon2 w100 alCen flexNormal">
      {listList &&
        listList.map((lst: AList, index: number) => (
          <div
            key={index}
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

export default ListHeader;
