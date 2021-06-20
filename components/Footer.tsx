import Link from "next/link";
import { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div>
      <footer>
        <div className="footerCon flexNormal">
          <div className="footerCopy pt20">
            <h5>&copy;2021 Maru-t</h5>
          </div>
          <div className="mla pt20">
            <Link href="https://twitter.com/intent/tweet?hashtags=loveanime,ラブアニメお問合せ">
              <a target="_new" rel="nofollow">
                お問合せ
              </a>
            </Link>
            <Link href="https://twitter.com/intent/tweet?hashtags=loveanime,ラブアニメご要望">
              <a className="ml20" target="_new" rel="nofollow">
                ご要望
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
