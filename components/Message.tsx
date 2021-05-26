import { GetServerSideProps, NextPage } from "next";

export interface IMessage {
  title: string;
  content: string;
}

interface Props {
  messages?: IMessage[];
}

const MessageComponent: NextPage<Props> = (props) => {
  if (props.messages) {
    return (
      <div className="messageZone">
        {props.messages.map((mess, index) => (
          <div key={index}>
            <h4>{mess.title}</h4>
            <p>{mess.content}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default MessageComponent;
