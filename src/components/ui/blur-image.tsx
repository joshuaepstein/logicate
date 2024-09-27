'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface Props extends ImageProps {
  errorSrc?: string;
}

export function BlurImage(props: Props) {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className} ${loading ? 'blur-[2px]' : 'blur-0'}`}
      onLoad={async () => {
        setLoading(false);
      }}
      onError={() => {
        setSrc(props.errorSrc ?? '/_static/missing_image.png'); // if the image fails to load, use the default avatar
      }}
    />
  );
}
