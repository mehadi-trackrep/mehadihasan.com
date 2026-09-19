import React from 'react';

// components
import ResumeDocViewer from '@/components/resume-doc-viewer';

// utils
import { cn } from '@/utils/common';

import { getSiteMetaData } from '@/utils/seo';

export async function generateMetadata() {
  return getSiteMetaData({
    title: 'Resume | Md. Mehadi Hasan',
    description: 'Md. Mehadi Hasan - Senior Data & AI Engineer',
  });
}

export default function ResumePage() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-7xl lg:px-4 relative">
        <div
          className={cn(
            'w-full bg-white ring-1 ring-zinc-100 py-10 dark:bg-zinc-900 dark:ring-zinc-400/20',
          )}
        >
          <ResumeDocViewer />
        </div>
      </div>
    </div>
  );
}
