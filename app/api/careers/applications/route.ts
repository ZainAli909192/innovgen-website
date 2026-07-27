import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const MAX_CV_SIZE = 2 * 1024 * 1024;
const recipient = "nayef@innovgen.com";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  position: z.enum(["Senior Software Engineer", "Product Designer"]),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.CAREERS_EMAIL_FROM) {
    return Response.json(
      { message: "Applications are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const parsed = applicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    position: formData.get("position"),
  });
  const cv = formData.get("cv");

  if (!parsed.success || !(cv instanceof File)) {
    return Response.json({ message: "Please complete all application details and upload your CV." }, { status: 400 });
  }

  const isPdf = cv.type === "application/pdf" || cv.name.toLowerCase().endsWith(".pdf");
  if (!isPdf || cv.size > MAX_CV_SIZE) {
    return Response.json({ message: "Please upload a PDF CV no larger than 2 MB." }, { status: 400 });
  }

  const application = parsed.data;
  const resumeContent = Buffer.from(await cv.arrayBuffer());
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.CAREERS_EMAIL_FROM,
    to: [recipient],
    replyTo: application.email,
    subject: `Careers application: ${application.position} — ${application.fullName}`,
    text: `New InnovGen careers application\n\nName: ${application.fullName}\nEmail: ${application.email}\nPosition: ${application.position}\nCV: ${cv.name}`,
    html: `<h1>New InnovGen careers application</h1><p><strong>Name:</strong> ${escapeHtml(application.fullName)}</p><p><strong>Email:</strong> ${escapeHtml(application.email)}</p><p><strong>Position:</strong> ${escapeHtml(application.position)}</p><p><strong>CV:</strong> ${escapeHtml(cv.name)}</p>`,
    attachments: [{ filename: cv.name, content: resumeContent }],
  });

  if (error) {
    return Response.json({ message: "We could not send your application. Please try again." }, { status: 502 });
  }

  return Response.json({ success: true });
}
