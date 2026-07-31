import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const recipient = process.env.CAREERS_EMAIL_TO ?? "linkplus.ae@gmail.com";

const consultationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,24}$/).max(24),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(4000),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return entities[character];
  });
}

export async function POST(request: Request) {
  const sender = process.env.CONSULTATION_EMAIL_FROM ?? process.env.CAREERS_EMAIL_FROM;
  if (!process.env.RESEND_API_KEY || !sender) {
    return Response.json(
      { message: "Enquiries are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const parsed = consultationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json(
      { message: "Please complete all required fields with valid information." },
      { status: 400 }
    );
  }

  const enquiry = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  // -----------------------------
  // 1) EMAIL TO COMPANY
  // -----------------------------
  const { error: companyError } = await resend.emails.send({
    from: sender,
    to: [recipient],
    replyTo: enquiry.email,
    subject: `Website enquiry: ${enquiry.subject}`,
    text: `New website enquiry

Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Subject: ${enquiry.subject}

Message:
${enquiry.message}

Sent from the website enquiry form.`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; background: #f5f7fa;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; border: 1px solid #e6e9ef;">
          
          <h1 style="margin-top: 0; font-size: 24px; color: #1a1f36; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">
            New Website Enquiry
          </h1>

          <p style="font-size: 15px; color: #333;">
            <strong style="color:#4a90e2;">Name:</strong> ${escapeHtml(enquiry.name)}
          </p>

          <p style="font-size: 15px; color: #333;">
            <strong style="color:#4a90e2;">Email:</strong> ${escapeHtml(enquiry.email)}
          </p>

          <p style="font-size: 15px; color: #333;">
            <strong style="color:#4a90e2;">Phone:</strong> ${escapeHtml(enquiry.phone)}
          </p>

          <p style="font-size: 15px; color: #333;">
            <strong style="color:#4a90e2;">Subject:</strong> ${escapeHtml(enquiry.subject)}
          </p>

          <div style="margin-top: 20px; padding: 15px; background: #f0f4ff; border-left: 4px solid #4a90e2; border-radius: 6px;">
            <p style="font-size: 15px; color: #333; margin: 0;">
              <strong style="color:#4a90e2;">Message:</strong><br>
              ${escapeHtml(enquiry.message).replace(/\n/g, "<br>")}
            </p>
          </div>

          <p style="margin-top: 30px; font-size: 13px; color: #777; text-align: center;">
            This message was sent from your website enquiry form.
          </p>

        </div>
      </div>
    `,
  });

  if (companyError) {
    return Response.json(
      { message: "We could not send your enquiry. Please try again." },
      { status: 502 }
    );
  }

  // -----------------------------
  // 2) CONFIRMATION EMAIL TO APPLICANT
  // -----------------------------
  const { error: applicantError } = await resend.emails.send({
    from: sender,
    to: [enquiry.email],
    subject: "We received your enquiry — InnovGen",
    text: `Hi ${enquiry.name},

Thank you for contacting InnovGen.

We’ve received your enquiry and our team will get back to you shortly.

Regards,
InnovGen Team`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; background: #f5f7fa;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; border: 1px solid #e6e9ef;">
          
          <h2 style="margin-top: 0; font-size: 22px; color: #1a1f36;">
            Thank you for contacting InnovGen
          </h2>

          <p style="font-size: 15px; color: #333;">
            Hi <strong>${escapeHtml(enquiry.name)}</strong>,
          </p>

          <p style="font-size: 15px; color: #333; line-height: 1.6;">
            Thank you for reaching out to us. We’ve received your enquiry and our team will get back to you shortly.
          </p>

          <p style="font-size: 15px; color: #333; margin-top: 25px;">
            Regards,<br>
            <strong>InnovGen Team</strong>
          </p>

        </div>
      </div>
    `,
  });

  if (applicantError) {
    // Applicant email failing should NOT block the form submission
    console.error("Applicant confirmation email failed:", applicantError);
  }

  return Response.json({ success: true });
}

// Old email sending to company only 
// export async function POST(request: Request) {
//   const sender = process.env.CONSULTATION_EMAIL_FROM ?? process.env.CAREERS_EMAIL_FROM;
//   if (!process.env.RESEND_API_KEY || !sender) {
//     return Response.json({ message: "Enquiries are temporarily unavailable. Please try again later." }, { status: 503 });
//   }

//   const parsed = consultationSchema.safeParse(await request.json());
//   if (!parsed.success) {
//     return Response.json({ message: "Please complete all required fields with valid information." }, { status: 400 });
//   }

//   const enquiry = parsed.data;
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   const { error } = await resend.emails.send({
//     from: sender,
//     to: [recipient],
//     replyTo: enquiry.email,
//     subject: `Website enquiry: ${enquiry.subject}`,
//     text: `New website enquiry\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nSubject: ${enquiry.subject}\n\nMessage:\n${enquiry.message}`,
//   html:
//    ` <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; background: #f5f7fa;">
//   <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; border: 1px solid #e6e9ef;">
    
//     <h1 style="margin-top: 0; font-size: 24px; color: #1a1f36; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">
//       New Website Enquiry
//     </h1>

//     <p style="font-size: 15px; color: #333;">
//       <strong style="color:#4a90e2;">Name:</strong> ${escapeHtml(enquiry.name)}
//     </p>

//     <p style="font-size: 15px; color: #333;">
//       <strong style="color:#4a90e2;">Email:</strong> ${escapeHtml(enquiry.email)}
//     </p>

//     <p style="font-size: 15px; color: #333;">
//       <strong style="color:#4a90e2;">Phone:</strong> ${escapeHtml(enquiry.phone)}
//     </p>

//     <p style="font-size: 15px; color: #333;">
//       <strong style="color:#4a90e2;">Subject:</strong> ${escapeHtml(enquiry.subject)}
//     </p>

//     <div style="margin-top: 20px; padding: 15px; background: #f0f4ff; border-left: 4px solid #4a90e2; border-radius: 6px;">
//       <p style="font-size: 15px; color: #333; margin: 0;">
//         <strong style="color:#4a90e2;">Message:</strong><br>
//         ${escapeHtml(enquiry.message).replace(/\n/g, "<br>")}
//       </p>
//     </div>

//     <p style="margin-top: 30px; font-size: 13px; color: #777; text-align: center;">
//       This message was sent from your website enquiry form.
//     </p>

//   </div>
// </div>
// `
  
//   });

//   if (error) {
//     return Response.json({ message: "We could not send your enquiry. Please try again." }, { status: 502 });
//   }

//   return Response.json({ success: true });
// }
