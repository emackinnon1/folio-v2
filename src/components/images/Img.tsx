import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

type ImgType = {
  publicId: string;
  height?: string | number;
  width?: string | number;
  alt: string;
  fill?: boolean;
  title?: string;
  className?: string;
  preview?: boolean;
  noStyle?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
  mdx?: boolean;
} & React.ComponentPropsWithoutRef<'figure'>;

export default function Img({
  publicId,
  height,
  width,
  alt,
  title,
  fill = false,
  className,
  preview = true,
  noStyle = false,
  mdx = false,
  style,
  aspect,
  ...rest
}: ImgType) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  const RESIZE_MAX_WIDTH = 1000;
  const resizedToMaxWidth = mdx && width && +width >= RESIZE_MAX_WIDTH;

  // Handle S3 image paths
  const path: string = publicId.startsWith('/images')
    ? `https://folio-v2-images.s3.us-west-2.amazonaws.com${publicId}`
    : publicId;

  return (
    <figure
      className={clsx(className, {
        'overflow-hidden rounded shadow dark:shadow-none': !noStyle,
        'mx-auto w-full': mdx && width && +width <= 800,
      })}
      style={{
        ...(mdx && width && +width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          height: fill ? '100%' : 0,
          paddingTop: !fill
            ? aspectRatio
              ? `${aspectRatio * 100}%`
              : width && height
              ? `${(+height / +width) * 100}%`
              : '56.25%'
            : undefined,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        className='img-blur'
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        {fill ? (
          <Image
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            sizes='100vw'
            quality={80}
            unoptimized
            src={path}
            alt={alt}
            title={title || alt}
            className={clsx('absolute inset-0 h-full w-full', className)}
            priority
          />
        ) : (
          <div className='absolute left-0 top-0'>
            <Image
              width={
                resizedToMaxWidth && width
                  ? Number(Math.min(+width, RESIZE_MAX_WIDTH))
                  : Number(width || 1200)
              }
              height={
                resizedToMaxWidth && width && height
                  ? Number((RESIZE_MAX_WIDTH * +height) / +width)
                  : Number(height || 630)
              }
              unoptimized
              src={path}
              alt={alt}
              title={title || alt}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <Lightbox mainSrc={path} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
}
