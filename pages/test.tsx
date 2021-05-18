import { NextPage } from "next";

const Test: NextPage = () => {
  const fileReader = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const consoleChange = async (e: any) => {
    const file = e.target.files[0];
    const fileName = file.name;
    console.log(fileName);
    const readed = await fileReader(file);
    console.log(readed);
  };

  return (
    <div>
      <input
        onChange={consoleChange}
        type="file"
        accept="image/png, image/jpeg"
        name="testimage"
      />
    </div>
  );
};

export default Test;
