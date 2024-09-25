import React from "react";

export type FileListItem = {
  label: string;
  table: string;
  url: string;
};

const GetFileList = (user: string): Promise<FileListItem[]> => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      user,
    }),
    mode: "cors",
  }

  return fetch("http://localhost:8081/api/file/list", options)
    .then((res) => res.json())
    .then((res) => res.result);
}


type FileListProps = {
  // token: string;
  handleSubmit(record: FileListItem): void;
};

export const FileList = (props: FileListProps) => {
  const [index, setIndex] = React.useState<number>(-1);
  const [fileList, setFileList] = React.useState<FileListItem[]>([]);

  // if (!props.token) {
  //   return null;
  // }

  React.useEffect(() => {
    GetFileList("").then((list) => {
      if (list.length === 0) {
        return;
      }

      setIndex(0);
      setFileList(list);
    });
  }, [
    // props.token
  ]);


  return (
    <div>
      <div>
        <select
          style={{
            width: 300,
            marginBottom: 12,
          }}
          onChange={(e) => {
            const index = Number(e.target.value);
            setIndex(index);
          }}
        >
          {fileList.map((record, index) => (
            <option value={index} title={record.url}>{record.table}</option>
          ))}
        </select>
      </div>

      <div>
        <button style={{ width: 300 }} disabled={index === -1} onClick={() => {
          props.handleSubmit(fileList[index]);
        }}>Load table</button>
      </div>
    </div>
  );
}