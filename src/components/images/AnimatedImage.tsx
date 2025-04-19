import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import * as React from 'react';

type AnimatedImageProps = {
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  animationType?: 'scale' | 'tilt' | 'both';
} & Omit<ImageProps, 'className'>;

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  imgClassName,
  wrapperClassName,
  imgStyle,
  wrapperStyle,
  animationType = 'scale',
  ...rest
}: AnimatedImageProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-lg',
        wrapperClassName
      )}
      style={wrapperStyle}
    >
      {/* Glow overlay */}
      <div
        className={clsx(
          'absolute inset-0 -z-10 transform-gpu rounded-lg bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400 opacity-0 blur transition duration-300 group-hover:opacity-70',
          animationType === 'tilt' || animationType === 'both'
            ? 'group-hover:animate-tilt'
            : ''
        )}
      />

      {/* Image container */}
      <div className='relative h-full w-full'>
        <Image
          className={clsx(
            'rounded-lg transition-all duration-300',
            (animationType === 'scale' || animationType === 'both') &&
              'group-hover:scale-[1.02]',
            fill ? 'object-cover' : '',
            imgClassName
          )}
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          style={imgStyle}
          sizes={fill ? '(max-width: 768px) 100vw, 50vw' : undefined}
          priority={true}
          {...rest}
        />
      </div>

      {/* Shadow overlay */}
      <div className='absolute inset-0 rounded-lg shadow-md opacity-0 transition duration-300 group-hover:opacity-100' />
    </div>
  );
}
