import { BACKEND_URL } from './Config';

export const RegisterNotificationSlack = async (slackId: string) => {
  const res = await fetch(`${BACKEND_URL}/notification/register/`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ slack_id: slackId }),
  });
  return res;
};

export const UpdateNotifiedSlack = async (slackId: string) => {
  const res = await fetch(`${BACKEND_URL}/notification/update/`, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ slack_id: slackId }),
  });
  return res;
};

export const fetchUsersSlackChannelId = async () => {
  const res = await fetch(`${BACKEND_URL}/notification/user/slack/`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });
  return res;
};
