import { z } from 'zod'

export const step1Schema = z.object({
  dateReceived: z
    .string()
    .min(1, 'Date received is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  timeReceived: z
    .string()
    .min(1, 'Time received is required')
    .regex(/^\d{2}:\d{2}:00$/, 'Invalid time format'),
  customerTitle: z
    .enum(['Mr', 'Ms', 'Mrs'])
    .or(z.literal('').refine((val) => val !== '', { message: 'Customer title is required' })),
  customerName: z
    .string()
    .max(100, 'Customer name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  firstName: z
    .string()
    .max(100, 'First name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date format (DD/MM/YYYY)')
    .optional()
    .or(z.literal('')),
  sex: z.enum(['Male', 'Female']).optional().or(z.literal('')),
})

export const step2Schema = z.object({
  nameOpj: z.string().min(1, 'OPJ name is required'),
  servicePolice: z
    .string()
    .max(100, 'Service police must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  opjGrade: z
    .string()
    .max(50, 'OPJ grade must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  pvNumber: z
    .string()
    .max(50, 'PV number must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  nationality: z.string().optional().or(z.literal('')),
  tgiOf: z.string().optional().or(z.literal('')),
  magistrateName: z.string().optional().or(z.literal('')),
  magistrateGrade: z.string().optional().or(z.literal('')),
  prosecutorOfficeNumber: z
    .string()
    .max(50, 'Prosecutor office number must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  instructionNumber: z
    .string()
    .max(50, 'Instruction number must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  justiceIdentifier: z
    .string()
    .max(50, 'Justice identifier must be less than 50 characters')
    .optional()
    .or(z.literal('')),
})

export const step3Schema = z.object({
  seals: z
    .array(
      z.object({
        id: z.number(),
        receptionDate: z
          .string()
          .min(1, 'Reception date is required')
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
        sealState: z.string().min(1, 'Seal state is required'),
        images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
        samples: z
          .array(
            z.object({
              id: z.number(),
              date: z
                .string()
                .min(1, 'Sample date is required')
                .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
              time: z
                .string()
                .min(1, 'Sample time is required')
                .regex(/^\d{2}:\d{2}:00$/, 'Invalid time format'),
              description: z.string().min(1, 'Description is required'),
              analysis: z.string().optional(),
            }),
          )
          .optional(),
      }),
    )
    .min(1, 'At least one seal is required'),
})
