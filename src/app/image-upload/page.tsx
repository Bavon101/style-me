"use client"

import { RedirectToSignIn, SignedIn } from "@clerk/clerk-react";
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from "react";
import LoaderSVG from '../assets/images/loader.svg';
import DropZone from "./DropZone";
import './styles.scss';

export default function OnboardingWizard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [fileList, setFileList] = useState<File[]>([]);
  const [inDropZone, setInDropZone] = useState<boolean>(false)

  const onSelectImage = (e?: { inDropZone: boolean; files?: File[] }) => {
    setFileList(e?.files ?? []);
    setInDropZone(!!e?.inDropZone);
  }

  // to handle file uploads
  const uploadFiles = async () => {
    const formData = new FormData();
    fileList.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/file-upload", {
      method: "POST",
      body: formData,
    });

    //successful file upload
    if (response.ok) {
      alert("Files uploaded successfully");
    } else {
      alert("Error uploading files");
    }
  };

  return (
    <div className='wizard'>

      {!isLoaded && (
        <div className="wizard-loader">
          <Image src={LoaderSVG} className='loader' alt='Loading spinner' />
        </div>
      )}

      {(isLoaded && !isSignedIn) && (
        <RedirectToSignIn />
      )}

      <SignedIn>
        <div className="wizard-container">

          <div className="wizard-header">
            <div className="wizard-title">Upload Image</div>
            <div className="wizard-caption">Upload a passport size photo of yourself</div>
          </div>

          <form className="wizard-body">
            <DropZone fileList={fileList} setInDropZone={onSelectImage} />
          </form>

          <div className="wizard-btn-wrapper">
            {!!fileList.length && (
              <button className='wizard-btn prev' onClick={() => onSelectImage()}>
                <span className="w-btn-text">Clear Image</span>
              </button>
            )}

            {!fileList.length && <div className="dummy-placeholder" />}

            <button
              className='wizard-btn next'
              disabled={!fileList.length}
              onClick={uploadFiles}
            >
              <span className="w-btn-text">Upload</span>
            </button>
          </div>

        </div>
      </SignedIn>

    </div>
  )
}
