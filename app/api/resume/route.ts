import { RESUME_DOC_PDF_URL } from '@/components/constants';

// Proxy the Google Doc PDF export through our own origin so we can force a
// download. Cross-origin links ignore the `download` attribute, which makes
// mobile browsers open the PDF in a viewer tab instead of saving it.
export async function GET() {
  try {
    const upstream = await fetch(RESUME_DOC_PDF_URL, {
      next: { revalidate: 3600 },
    });

    const contentType = upstream.headers.get('content-type') ?? '';
    if (!upstream.ok || !contentType.includes('application/pdf')) {
      // e.g. the doc stopped being link-shared and Google returned a login page
      return Response.redirect(RESUME_DOC_PDF_URL, 302);
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="Md-Mehadi-Hasan-Resume.pdf"',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return Response.redirect(RESUME_DOC_PDF_URL, 302);
  }
}
