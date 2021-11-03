import { NextPage, GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import {
  fetchUsersSlackChannelId,
  RegisterNotificationSlack,
  UpdateNotifiedSlack,
} from '../../helper/PlatformHelper';
import LocalMessage from '../../components/LocalMessage';
import { pageBaseProps } from '../../types/page';

const NotificationRegister: NextPage = () => {
  const [channelId, setChannelId] = useState<string | null>(null);
  const [mess, setMess] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetchUsersSlackChannelId();
      if (res.status == 200) {
        const ret = await res.json();
        setChannelId(ret['channel_id']);
      }
    })();
  }, []);

  const startRegisterOrUpdateSlackChannel = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = channelId
        ? await UpdateNotifiedSlack(e.currentTarget.slack.value)
        : await RegisterNotificationSlack(e.currentTarget.slack.value);
      if (res.status === 200) {
        setMess(['登録に成功しました。']);
      } else {
        const ret = await res.json();
        setMess([ret['message']]);
      }
    } catch (e) {
      setMess(['登録に失敗しました。']);
    }
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <div className="mt20 wM500px mla mra">
            <h2 className="brAll">通知の登録</h2>
            <div className="mt10">
              <p>
                登録することで毎日am
                4:00にその日のアニメ放送予定が通知が届きます。
                <br />
                <br />
                ** ユーザー登録が必要です。
              </p>
            </div>
            <form
              className="mt40"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                startRegisterOrUpdateSlackChannel(e)
              }
            >
              <div className="field">
                <h3>Slack</h3>
                <p className="mt10">
                  まず、こちらのボタンでボットをワークスペースに対して有効にしてください。
                </p>
                <a
                  target="_new"
                  href={`https://slack.com/oauth/v2/authorize?client_id=2525975483381.2631499923477&scope=chat:write,chat:write.public&user_scope=chat:write`}
                >
                  <img
                    alt="Add to Slack"
                    height="40"
                    width="139"
                    src="https://platform.slack-edge.com/img/add_to_slack.png"
                    srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                  />
                </a>
                <p className="mt20">
                  その後チャンネルIDをこちらからご登録下さい。
                </p>
                <label className="mt10">Channel ID</label>
                <input
                  type="text"
                  name="slack"
                  placeholder="slackのチャンネルID"
                  defaultValue={channelId ?? ''}
                  required
                />
              </div>
              <div className="field mt20">
                <button type="submit" className="floatR">
                  登録する
                </button>
              </div>
              <div className="mt60">
                <LocalMessage message={mess}></LocalMessage>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<pageBaseProps> = async () => {
  return {
    props: {
      title: '放送スケジュール通知',
      list: 3,
      ogDescription:
        '登録することでその日の放送スケジュールを毎日04:00に通知します。',
      ogSeoDescription:
        '登録することでその日の放送スケジュールを毎日04:00に通知します。',
    },
  };
};

export default NotificationRegister;
