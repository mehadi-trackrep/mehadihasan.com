'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

// utils
import { cn } from '@/utils/common';
import {
  RESUME_DOC_PDF_URL,
  RESUME_DOC_PREVIEW_URL,
} from '@/components/constants';

export default function ResumeDocViewer() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4">
      <div className="flex items-center justify-end">
        <Button
          href={RESUME_DOC_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download Resume
          <Icons.Download className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative w-full overflow-hidden rounded-md bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-400/20 aspect-[1/1.32] min-h-[520px]">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="animate-pulse text-sm text-zinc-500 dark:text-zinc-400">
              Loading resume…
            </p>
          </div>
        )}

        <iframe
          src={RESUME_DOC_PREVIEW_URL}
          title="Resume - Md. Mehadi Hasan"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'h-full w-full border-0 transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Trouble viewing it here?{' '}
        <a
          href={RESUME_DOC_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-200"
        >
          Open the PDF
        </a>
        .
      </p>
    </div>
  );
}
