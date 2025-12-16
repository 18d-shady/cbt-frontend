import { Suspense } from 'react';
import SubmitContent from '@/components/SubmitContent';

export default function SubmitPage() {
  return (
    // The Suspense boundary tells Next.js to wait for the client-side
    // code (SubmitContent) to determine the search parameters.
    <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
            Processing submission details...
        </div>
    }>
      <SubmitContent />
    </Suspense>
  );
}