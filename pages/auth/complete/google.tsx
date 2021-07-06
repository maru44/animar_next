import { NextPage } from "next";
import { useRouter } from "next/router";

const CompleteGoogle: NextPage = () => {
  const router = useRouter();

  const redirect = () => {
    /**
     * ?state
     * ?code
     * ?scope
     * ?authuser
     * ?prompt
     */
    router.push("");
  };

  return <div></div>;
};

export default CompleteGoogle;
