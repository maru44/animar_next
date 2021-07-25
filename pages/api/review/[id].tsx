import { NextApiRequest, NextApiResponse } from "next";
import { createOgpBuffer } from "../../../helper/CreateOgp";
import { BACKEND_URL } from "../../../helper/Config";

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { id } = request.query;
  const res = await fetch(`${BACKEND_URL}/reviews/?id=${id}`);
  const ret = await res.json();
  const data = ret["data"];

  let buf: Buffer;
  if (ret["data"]["content"]) {
    buf = await createOgpBuffer({
      id: parseInt(id.toString()),
      title: data["anime_title"],
      rating: data["rating"] ?? null,
      content: data["content"],
    });
  }

  response.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buf.length,
  });
  response.end(buf, "binary");
};
