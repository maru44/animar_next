export interface IMessage {
  title: string;
  content?: string;
}

export const addMessage = (mess: IMessage, initialMess: IMessage[]) => {
  initialMess.push(mess);
  return initialMess;
};

interface Props {
  messages?: IMessage[];
}

const MessageComponent: React.FC<Props> = (props) => {
  if (props.messages) {
    return (
      <div className="pt20">
        <div className="messageZone">
          {props.messages.map((mess, index) => (
            <div key={index}>
              <h4>{mess.title}</h4>
              {mess.content && <p>{mess.content}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default MessageComponent;
