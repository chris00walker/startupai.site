import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Strategy Assistant | Chris Walker Consulting',
  description:
    'Generate strategy canvases, validate experiments, and turn ideas into execution plans. Private-by-design AI for founders and operators.',
};

export default function Page() {
  redirect('/product#ai-strategy');
}
