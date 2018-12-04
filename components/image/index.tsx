import queryString from 'query-string'
import assign from 'object-assign'

import { ImageProps } from './types'

export default function Image({
  src,
  steps = [250, 500, 750, 1000, 1500, 2000, 2500],
  sizes = '100vw',
  svg = false,
  classes,
  aspect_ratio,
  params = {},
  alt
}: ImageProps) {
  // set default params, merge user preferences with priority
  const opts = assign(
    {
      fm: getImageFormat(src),
      fit: aspect_ratio ? 'crop' : 'max',
      q: 80
    },
    params
  )

  if (svg) {
    // if it's an SVG, we don't need the picture element, so return
    return <img className={classes} src={src} alt={alt} />
  } else {
    // otherwise, we return a picture element with multiple sizes and a webp
    // optimized version for performance
    const srcDefault = formatSteps(src, opts, steps, aspect_ratio)
    const srcWebp = formatSteps(
      src,
      assign({}, opts, { fm: 'webp' }),
      steps,
      aspect_ratio
    )

    return (
      <picture>
        <source type="image/webp" srcSet={srcWebp} sizes={sizes} />
        <img
          className={classes}
          src={format(src, opts, aspect_ratio && aspect_ratio[2], aspect_ratio)}
          srcSet={srcDefault}
          sizes={sizes}
          alt={alt}
        />
      </picture>
    )
  }
}

function formatSteps(
  src: string,
  opts: {
    w?: number
    h?: number
    fm: string
  },
  steps: number[],
  aspect_ratio?: number[]
) {
  return steps.map(s => `${format(src, opts, s, aspect_ratio)} ${s}w`).join(',')
}

function format(
  src: string,
  opts: {
    w?: number
    h?: number
    fm: string
  },
  width?: number,
  aspect_ratio?: number[]
) {
  const opt = assign({}, opts)
  if (width) opt.w = width
  if (width && aspect_ratio) opt.h = (aspect_ratio[1] / aspect_ratio[0]) * width
  return `${src}?${queryString.stringify(opt)}`
}

function getImageFormat(src: string) {
  // Get file extension from src url
  const match: RegExpMatchArray | null = src.match(/\.(\w+)$/)
  return match && match[1] ? match[1] : 'jpg'
}
