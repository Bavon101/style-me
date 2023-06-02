import NextImage, { ImageProps } from 'next/image';
import React from 'react';

const Image: React.FC<ImageProps> = ({ fill, ...props }) => {
  return (
    <NextImage
      {...props}
      fill
    />
  )
}

export default Image
