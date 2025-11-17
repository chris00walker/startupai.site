import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pt-8">
          <p className="text-base text-gray-300 text-center">
            &copy; {new Date().getFullYear()} StartupAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
