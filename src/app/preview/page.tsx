import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview | Chris Walker Consulting',
  description:
    'Preview of upcoming features and services from Chris Walker Consulting.',
};

export default function PreviewPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Preview
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Get a sneak peek at upcoming features and services.
            </p>

            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Exciting new features coming soon. Stay tuned for updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
