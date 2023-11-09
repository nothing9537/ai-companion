'use client';

import { FC, useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (imageUrl: string) => void;
  disabled?: boolean;
}

export const ImageUpload: FC<ImageUploadProps> = ({ value, onChange, disabled }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(isMounted);

  return (
    <div className="space-y-4 w-full flex flex-col justify-center">
      <CldUploadButton options={{ maxFiles: 1 }} uploadPreset="gb7sg2da" />
      <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
        <div className="relative h-40 w-40">
          <Image
            fill
            alt="Upload"
            src="/image-placeholder.svg"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};
