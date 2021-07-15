import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../helper/Config";
import { TUser } from "../types/auth";
import Link from "next/link";

interface Props {
  author: TUser;
  currentUser: TUser;
}

const AuthorZone: React.FC<Props> = (props) => {
  const author = props.author;
  const CurrentUser = props.currentUser;

  return (
    <div className="mt10 flexNormal alCen">
      {author && author.displayName ? (
        <>
          <div
            className="imgCircle"
            style={
              author.photoUrl
                ? { backgroundImage: `url(${author.photoUrl})` }
                : { backgroundImage: `url(${DEFAULT_USER_IMAGE})` }
            }
          ></div>
          <p>{author.displayName}</p>
          {CurrentUser && CurrentUser.rawId === author.rawId && (
            <h4 className="hrefBox mla">
              Edit
              <Link href="/auth/profile" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </h4>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AuthorZone;
