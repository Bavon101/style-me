import Image from "next/image";
import React, { ChangeEvent, DragEvent, useMemo } from 'react';
import UploadSVG from '../assets/images/upload.svg';
import './styles.dropzone.scss';

type DropZoneProps = {
  fileList: File[];
  setInDropZone: (e: { files?: File[], inDropZone: boolean }) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ fileList, setInDropZone }) => {
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone({ inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone({ inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    setInDropZone({ inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = Array.from(e.dataTransfer.files);

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));
      // reset inDropZone to false
      setInDropZone({ inDropZone: false, files });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    // get files from event on the input element as an array
    let files = Array.from(e?.target?.files ?? []);

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      files = files.filter((f) => !existingFiles.includes(f.name));
      // reset inDropZone to false
      setInDropZone({ inDropZone: false, files });
    }
  };

  const files = useMemo(() => {
    return fileList.map((file) => {
      const src = URL.createObjectURL(file);
      return { ...file, src };
    })
  }, [fileList]);

  return (
    <>

      {!fileList.length && (
        <div
          className='dropzone'
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image src={UploadSVG} alt="upload" height={50} width={50} />

          <label className="file-input" htmlFor="file-select">
            <input
              id="file-select"
              multiple={false}
              onChange={handleFileSelect}
              type="file"
            />
            <span>Select Image File</span>
          </label>

          <h3 className='upload-caption'>
            or drag &amp; drop your image here
          </h3>

        </div>
      )}

      {!!fileList.length && (
        <div className='file-list'>
          <div className='file-container'>
            {files.map((f) => {
              return (
                <div key={f.name}>
                  <div key={f.name} className='file-name'>
                    {f.name}
                  </div>
                  <Image
                    src={f.src}
                    alt={f.name}
                    className="file-preview"
                    width={460}
                    height={390}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

    </>
  );
};

export default DropZone;
