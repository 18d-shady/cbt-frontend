
import PrelimContent from '@/components/PrelimContent';
import { Suspense } from 'react';


export default function PrelimPage() {
  return (
  
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
            Loading exam details...
        </div>
    }>
      <PrelimContent />
    </Suspense>
  );
}