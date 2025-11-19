import { Suspense } from 'react';
import { CheckCircle } from 'lucide-react';

function AuthSuccessContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Successful
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You have been successfully authenticated. Redirecting to your
            dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
