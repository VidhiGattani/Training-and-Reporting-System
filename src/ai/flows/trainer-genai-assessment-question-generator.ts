'use server';
/**
 * @fileOverview This file implements a Genkit flow for trainers to generate multiple-choice quiz questions
 * from training content outlines or summaries, enabling rapid assessment creation.
 *
 * - generateAssessmentQuestions - A function that handles the generation of assessment questions.
 * - TrainerAssessmentQuestionGeneratorInput - The input type for the generateAssessmentQuestions function.
 * - TrainerAssessmentQuestionGeneratorOutput - The return type for the generateAssessmentQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainerAssessmentQuestionGeneratorInputSchema = z.object({
  trainingContent: z
    .string()
    .describe(
      'The training content outline or summary from which to generate questions.'
    ),
  numberOfQuestions: z
    .number()
    .int()
    .min(1)
    .describe('The number of multiple-choice questions to generate.'),
});
export type TrainerAssessmentQuestionGeneratorInput = z.infer<
  typeof TrainerAssessmentQuestionGeneratorInputSchema
>;

const MultipleChoiceQuestionSchema = z.object({
  question: z.string().describe('The multiple-choice question text.'),
  options: z
    .array(z.string())
    .min(2)
    .describe('An array of at least two possible answer options for the question.'),
  correctAnswer: z.string().describe('The correct answer option from the provided options.'),
});

const TrainerAssessmentQuestionGeneratorOutputSchema = z
  .array(MultipleChoiceQuestionSchema)
  .describe('An array of generated multiple-choice quiz questions.');
export type TrainerAssessmentQuestionGeneratorOutput = z.infer<
  typeof TrainerAssessmentQuestionGeneratorOutputSchema
>;

export async function generateAssessmentQuestions(
  input: TrainerAssessmentQuestionGeneratorInput
): Promise<TrainerAssessmentQuestionGeneratorOutput> {
  return trainerAssessmentQuestionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trainerAssessmentQuestionGeneratorPrompt',
  input: {schema: TrainerAssessmentQuestionGeneratorInputSchema},
  output: {schema: TrainerAssessmentQuestionGeneratorOutputSchema},
  prompt: `You are an expert at creating multiple-choice quiz questions from training material.
      Generate exactly {{numberOfQuestions}} multiple-choice quiz questions based on the following training content outline or summary.
      Each question must have at least 2 options, and one of the options must be the correct answer.
      Ensure the questions cover different aspects of the content and are suitable for assessing understanding.

      Training Content:
      {{{trainingContent}}}

      Your output must be a JSON array of questions, formatted exactly as specified by the output schema.`,
});

const trainerAssessmentQuestionGeneratorFlow = ai.defineFlow(
  {
    name: 'trainerAssessmentQuestionGeneratorFlow',
    inputSchema: TrainerAssessmentQuestionGeneratorInputSchema,
    outputSchema: TrainerAssessmentQuestionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
