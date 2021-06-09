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
        </div>
      </footer>
    </div>
  );
};

export default Footer;
