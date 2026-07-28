"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Deters casual copying: blocks the context menu, dragging, and
   * selection. This is a deterrent only — nothing rendered in a
   * browser can be fully protected from capture.
   */
  protect?: boolean;
  thumbnailClassName?: string;
};

/** Thumbnail button that opens the image full-size in a modal dialog. */
export function ImageLightbox({
  src,
  alt,
  width,
  height,
  protect = false,
  thumbnailClassName,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const blockContextMenu = protect
    ? (event: MouseEvent) => event.preventDefault()
    : undefined;

  const closeOnBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={`View full size: ${alt}`}
        title="Click to enlarge"
        onClick={() => dialogRef.current?.showModal()}
        onContextMenu={blockContextMenu}
        className="cursor-zoom-in select-none"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          draggable={!protect}
          className={thumbnailClassName}
        />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClick={closeOnBackdropClick}
        onContextMenu={blockContextMenu}
        className="m-auto max-h-[92vh] max-w-[95vw] rounded-xl bg-transparent p-0 backdrop:bg-black/80"
      >
        <div className="relative select-none">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            draggable={!protect}
            className="h-auto max-h-[92vh] w-auto rounded-xl"
          />
          <button
            type="button"
            aria-label="Close full-size view"
            onClick={() => dialogRef.current?.close()}
            className="absolute top-3 right-3 rounded-full bg-neutral-900/80 px-3 py-1 text-sm font-medium text-white hover:bg-neutral-900"
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
