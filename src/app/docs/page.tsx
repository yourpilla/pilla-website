import { redirect } from 'next/navigation';

// Redirect /docs to /docs/getting-started/introduction
export default function DocsPage() {
  redirect('/docs/getting-started/introduction');
}