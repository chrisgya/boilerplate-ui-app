import React, { FC, useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Dropzone from "react-dropzone";

type FileInputProps = React.DetailedHTMLProps<any, any> & {
  name: string;
  setFiles: (files: object[]) => void;
  files: any[];
  disabled?: boolean;
};

const dropzoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "75px",
};

const dropzoneActive = {
  borderColor: "green",
};

const FileInput: FC<FileInputProps> = ({ name, files, setFiles, disabled }) => {
  const { control } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  useEffect(() => {
    return () => {
      files && files.forEach((file: { preview: string; }) => URL.revokeObjectURL(file.preview));
    };
  });


  return (
    <div className="field">
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ onBlur, value }) => (
          <>
            <Dropzone onDrop={onDrop}>
              {({ isDragActive, getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}
                >
                  <input {...getInputProps()} name={name} onBlur={onBlur} disabled={disabled} />
                  <p>Drag 'n' drop files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
            <div>
              {value &&
                value.map((f: any, index: number) => (
                  <div key={index}>
                    <span>{f.name}</span>
                    <span> </span>
                    <span>{f.size}</span>
                  </div>
                ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export { FileInput };
