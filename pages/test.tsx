import { NextPage } from "next";
import { useState } from "react";
import { BACKEND_URL } from "../helper/Config";

const Test: NextPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const fileReader = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const consoleChange = async (e: any) => {
    const fileTmp = e.target.files[0];
    const fileNameTmp = fileTmp.name;
    const readed = await fileReader(fileTmp);
    setFileName(fileNameTmp);
    setFile(readed);
    console.log(readed);
  };

  const startUpload = async () => {
    const res = await fetch(`${BACKEND_URL}/test/upload/`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ file: file, filename: fileName }),
    });
    const ret = await res.json();
    console.log(ret);
  };

  const startSub = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("file", e.target.testimage.files[0]);

    const res = await fetch(`${BACKEND_URL}/test/upload/`, {
      method: "POST",
      mode: "cors",
      body: formData,
    });
    const ret = await res.json();
    console.log(ret);
  };

  return (
    <div>
      <form onSubmit={startSub}>
        <input
          onChange={consoleChange}
          type="file"
          accept="image/png, image/jpeg"
          name="testimage"
        />
        <button type="submit">form</button>
      </form>
      <div>
        <button className="" onClick={startUpload}>
          画像アップロード
        </button>
      </div>
    </div>
  );
};

export default Test;
