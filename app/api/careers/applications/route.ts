import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const MAX_CV_SIZE = 2 * 1024 * 1024;
const recipient = process.env.CAREERS_EMAIL_TO ?? "nayef@innovgen.com";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  number: z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number."),   
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
  if (!process.env.RESEND_API_KEY || !process.env.CAREERS_EMAIL_FROM || !recipient) {
    return Response.json(
      { message: "Applications are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const parsed = applicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    number: formData.get("number"),
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

  // Send email to company
  const { error: companyError } = await resend.emails.send({
    from: process.env.CAREERS_EMAIL_FROM,
    to: [recipient],
    replyTo: application.email,
    subject: `New Application — ${application.fullName}`,
    text: `A new application has been submitted.

Name: ${application.fullName}
Email: ${application.email}
Phone: ${application.number}
CV: ${cv.name}

This message was generated automatically by the InnovGen Careers system.`,
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; background: #f5f7fa;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; border: 1px solid #e6e9ef;">
        
        <h2 style="margin-top: 0; font-size: 22px; color: #1a1f36;">
          New Careers Application
        </h2>

        <p style="font-size: 15px; color: #333;">
          <strong>Name:</strong> ${escapeHtml(application.fullName)}
        </p>

        <p style="font-size: 15px; color: #333;">
          <strong>Email:</strong> ${escapeHtml(application.email)}
        </p>

        <p style="font-size: 15px; color: #333;">
          <strong>Phone:</strong> ${escapeHtml(application.number)}
        </p>

        <p style="font-size: 15px; color: #333;">
          <strong>CV:</strong> ${escapeHtml(cv.name)}
        </p>

        <p style="margin-top: 25px; font-size: 13px; color: #777;">
          This notification was generated automatically by the InnovGen Careers system.
        </p>

      </div>
    </div>
  `,
    attachments: [{ filename: cv.name, content: resumeContent }],
  });


  if (companyError) {
    return Response.json({ message: "We could not send your application. Please try again." }, { status: 502 });
  }

  // Send confirmation email to applicant
  const { error: applicantError } = await resend.emails.send({
    from: process.env.CAREERS_EMAIL_FROM,
    to: [application.email],
    subject: "Your Application Has Been Received — InnovGen",
    text: `Hi ${application.fullName},

Thank you for applying to InnovGen.

We’re writing to confirm that we’ve successfully received your application. Our team is currently reviewing your details, and if your profile aligns with our requirements, we will reach out to you for the next steps.

We appreciate your interest in joining InnovGen and the time you invested in submitting your application.

Warm regards,
InnovGen Careers Team`,
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; background: #f5f7fa;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; border: 1px solid #e6e9ef;">
        
        <h2 style="margin-top: 0; font-size: 22px; color: #1a1f36;">
          Application Received — InnovGen
        </h2>

        <p style="font-size: 15px; color: #333;">
          Hi <strong>${escapeHtml(application.fullName)}</strong>,
        </p>

        <p style="font-size: 15px; color: #333; line-height: 1.6;">
          Thank you for applying to <strong>InnovGen</strong>. This email is to confirm that we’ve successfully received your application.
        </p>

        <p style="font-size: 15px; color: #333; line-height: 1.6;">
          Our recruitment team is currently reviewing your details. If your profile matches our requirements, we will contact you regarding the next steps in the selection process.
        </p>

        <p style="font-size: 15px; color: #333; line-height: 1.6;">
          We appreciate your interest in joining InnovGen and the time you invested in submitting your application.
        </p>

        <p style="font-size: 15px; color: #333; margin-top: 25px;">
          Warm regards,<br>
          <strong>InnovGen Careers Team</strong>
        </p>

      </div>
    </div>
  `,
  });


  if (applicantError) {
    return Response.json({ message: "We could not send your application. Please try again." }, { status: 502 });
  }

  return Response.json({ success: true });
}
