import { redirect } from 'next/navigation';

// Redirect /docs to /docs/introduction
export default function DocsPage() {
  redirect('/docs/introduction');
}