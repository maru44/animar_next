import { NextPage } from "next";

interface Props {
  message: string[];
}

const LocalMessage: NextPage<Props> = (props) => {
  if (!props.message) return null;

  return (
    <div className="">
      <div className="messageZone local">
        {props.message.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
};

export default LocalMessage;
