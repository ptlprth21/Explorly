
'use server';
/**
 * @fileOverview A contact form submission flow.
 *
 * - submitContactForm - A function that handles the contact form submission.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ContactFormInput, ContactFormOutput, ContactFormInputSchema, ContactFormOutputSchema } from '@/types';

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
