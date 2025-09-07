
'use server';
/**
 * @fileOverview A contact form submission flow.
 *
 * - submitContactForm - A function that handles the contact form submission.
 * - ContactFormInput - The input type for the submitContactForm function.
 * - ContactFormOutput - The return type for the submitContactForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export const ContactFormOutputSchema = z.object({
  reply: z.string().describe('A confirmation message to show the user.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function submitContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const contactFlowPrompt = ai.definePrompt({
    name: 'contactFlowPrompt',
    input: {schema: ContactFormInputSchema},
    output: {schema: ContactFormOutputSchema},
    prompt: `A user named {{name}} has submitted the contact form with the following message:

"{{message}}"

Generate a friendly, brief confirmation reply. Acknowledge their message and let them know our team will get back to them at {{email}} within 24-48 hours.`,
});

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    // In a real app, you would add logic here to send an email,
    // save to a database, or notify a support team.
    console.log('Contact form submitted:', input);

    const { output } = await contactFlowPrompt(input);
    return output!;
  }
);
