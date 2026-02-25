'use server';
/**
 * @fileOverview A GenAI flow for verifying trainee identity using facial recognition from provided images.
 *
 * - traineeGenAIIdentityVerification - A function that handles the trainee identity verification process.
 * - TraineeGenAIIdentityVerificationInput - The input type for the traineeGenAIIdentityVerification function.
 * - TraineeGenAIIdentityVerificationOutput - The return type for the traineeGenAIIdentityVerification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TraineeGenAIIdentityVerificationInputSchema = z.object({
  currentPhotoDataUri: z
    .string()
    .describe(
      "A photo of the trainee for current verification, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  referencePhotoDataUri: z
    .string()
    .describe(
      "A reference photo of the trainee for comparison, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  traineeName: z
    .string()
    .optional()
    .describe('Optional: The name of the trainee, which can help the AI with context.'),
});
export type TraineeGenAIIdentityVerificationInput = z.infer<
  typeof TraineeGenAIIdentityVerificationInputSchema
>;

const TraineeGenAIIdentityVerificationOutputSchema = z.object({
  isVerified: z.boolean().describe('True if the identity is successfully verified, false otherwise.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A confidence score (0-1) indicating the certainty of the verification.'),
  reason: z
    .string()
    .describe(
      'A brief explanation for the verification status, including any discrepancies or observations.'
    ),
});
export type TraineeGenAIIdentityVerificationOutput = z.infer<
  typeof TraineeGenAIIdentityVerificationOutputSchema
>;

export async function traineeGenAIIdentityVerification(
  input: TraineeGenAIIdentityVerificationInput
): Promise<TraineeGenAIIdentityVerificationOutput> {
  return traineeGenAIIdentityVerificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'traineeGenAIIdentityVerificationPrompt',
  input: {schema: TraineeGenAIIdentityVerificationInputSchema},
  output: {schema: TraineeGenAIIdentityVerificationOutputSchema},
  prompt: `You are an AI-powered identity verification system. Your task is to compare two photos to determine if they are of the same person. Both photos are of a trainee. Identify if the current photo matches the reference photo.

Reference Photo: {{media url=referencePhotoDataUri}}
Current Photo: {{media url=currentPhotoDataUri}}

If provided, the trainee's name is: {{{traineeName}}}.

Based on the visual comparison, provide:
- isVerified: true if the current photo matches the reference photo, false otherwise.
- confidenceScore: A number between 0 and 1 indicating your certainty of the match (1 for high confidence, 0 for low).
- reason: A concise explanation of your decision, noting any similarities or differences you observed.`,
  model: 'googleai/gemini-2.5-flash-image',
});

const traineeGenAIIdentityVerificationFlow = ai.defineFlow(
  {
    name: 'traineeGenAIIdentityVerificationFlow',
    inputSchema: TraineeGenAIIdentityVerificationInputSchema,
    outputSchema: TraineeGenAIIdentityVerificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI model did not return an output.');
    }
    return output;
  }
);
