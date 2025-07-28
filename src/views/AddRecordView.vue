<script setup lang="ts">
import { ref, computed } from 'vue'
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import SealTabs from '@/components/SealTabs.vue'
import Stepper from '@/components/StepperComponent.vue'

interface Sample {
  id: number
  date: string
  time: string
  description: string
  analysis: string
}

interface Seal {
  id: number
  receptionDate: string
  sealState: string
  images: File[]
  samples?: Sample[]
}

// Stepper state
const currentStep = ref<number>(1)
const totalSteps: number = 3
const stepLabels = ['Create New Record', 'Review', 'Seal']

// Schema definitions
const step1Schema = z.object({
  dateReceived: z
    .string()
    .min(1, 'Date received is required')
    .regex(/^\d{4}\d{2}\d{2}$/, 'Invalid date format'),
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

const step2Schema = z.object({
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

const step3Schema = z.object({
  seals: z
    .array(
      z.object({
        id: z.number(),
        receptionDate: z
          .string()
          .min(1, 'Reception date is required')
          .regex(/^\d{4}\d{2}\d{2}$/, 'Invalid date format'),
        sealState: z.string().min(1, 'Seal state is required'),
        images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
        samples: z
          .array(
            z.object({
              id: z.number(),
              date: z
                .string()
                .min(1, 'Sample date is required')
                .regex(/^\d{4}\d{2}\d{2}$/, 'Invalid date format'),
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

const combinedSchema = step1Schema.merge(step2Schema).merge(step3Schema)

// Form setup with veevalidate  using individual step schemas
const { handleSubmit, validate, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(combinedSchema),
  initialValues: {
    dateReceived: '',
    timeReceived: '',
    customerTitle: '',
    customerName: '',
    firstName: '',
    dateOfBirth: '',
    sex: '',
    nameOpj: '',
    servicePolice: '',
    opjGrade: '',
    pvNumber: '',
    nationality: '',
    tgiOf: '',
    magistrateName: '',
    magistrateGrade: '',
    prosecutorOfficeNumber: '',
    instructionNumber: '',
    justiceIdentifier: '',
    seals: [],
  },
})

const { value: dateReceived, errorMessage: dateReceivedError } = useField<string>(
  'dateReceived',
  undefined,
  {
    initialValue: '',
  },
)
const { value: timeReceived, errorMessage: timeReceivedError } = useField<string>(
  'timeReceived',
  undefined,
  {
    initialValue: '',
  },
)
const { value: customerTitle, errorMessage: customerTitleError } = useField<string>(
  'customerTitle',
  undefined,
  {
    initialValue: '',
  },
)
const { value: customerName, errorMessage: customerNameError } = useField<string>(
  'customerName',
  undefined,
  {
    initialValue: '',
  },
)
const { value: firstName, errorMessage: firstNameError } = useField<string>(
  'firstName',
  undefined,
  {
    initialValue: '',
  },
)
const { value: dateOfBirth, errorMessage: dateOfBirthError } = useField<string>(
  'dateOfBirth',
  undefined,
  {
    initialValue: '',
  },
)
const { value: sex, errorMessage: sexError } = useField<string>('sex', undefined, {
  initialValue: '',
})

const { value: nameOpj, errorMessage: nameOpjError } = useField<string>('nameOpj', undefined, {
  initialValue: '',
})
const { value: servicePolice, errorMessage: servicePoliceError } = useField<string>(
  'servicePolice',
  undefined,
  {
    initialValue: '',
  },
)
const { value: opjGrade, errorMessage: opjGradeError } = useField<string>('opjGrade', undefined, {
  initialValue: '',
})
const { value: pvNumber, errorMessage: pvNumberError } = useField<string>('pvNumber', undefined, {
  initialValue: '',
})
const { value: nationality, errorMessage: nationalityError } = useField<string>(
  'nationality',
  undefined,
  {
    initialValue: '',
  },
)
const { value: tgiOf, errorMessage: tgiOfError } = useField<string>('tgiOf', undefined, {
  initialValue: '',
})
const { value: magistrateName, errorMessage: magistrateNameError } = useField<string>(
  'magistrateName',
  undefined,
  {
    initialValue: '',
  },
)
const { value: magistrateGrade, errorMessage: magistrateGradeError } = useField<string>(
  'magistrateGrade',
  undefined,
  {
    initialValue: '',
  },
)
const { value: prosecutorOfficeNumber, errorMessage: prosecutorOfficeNumberError } =
  useField<string>('prosecutorOfficeNumber', undefined, {
    initialValue: '',
  })
const { value: instructionNumber, errorMessage: instructionNumberError } = useField<string>(
  'instructionNumber',
  undefined,
  {
    initialValue: '',
  },
)
const { value: justiceIdentifier, errorMessage: justiceIdentifierError } = useField<string>(
  'justiceIdentifier',
  undefined,
  {
    initialValue: '',
  },
)

const seals = ref<Seal[]>([
  {
    id: 1,
    receptionDate: '',
    sealState: '',
    images: [],
    samples: [
      {
        id: 1,
        date: '',
        time: '15:00:00',
        description: '',
        analysis: '',
      },
    ],
  },
])

// Time slots generation
const timeSlots = Array.from({ length: 96 }, (_, i) => {
  const h = String(Math.floor(i / 4)).padStart(2, '0')
  const m = String((i % 4) * 15).padStart(2, '0')
  return `${h}:${m}:00`
})

// Stepspecific validation using Zod directly
// const validateCurrentStep = async (): Promise<boolean> => {
//   try {
//     const currentValues = getCurrentStepValues()

//     switch (currentStep.value) {
//       case 1:
//         await step1Schema.parseAsync(currentValues)
//         break
//       case 2:
//         await step2Schema.parseAsync(currentValues)
//         break
//       case 3:
//         await step3Schema.parseAsync(currentValues)
//         break
//     }

//     return true
//   } catch (error) {
//     console.log('Validation errors for step', currentStep.value, ':', error)
//     return false
//   }
// }

const validateCurrentStep = async (): Promise<boolean> => {
  try {
    const currentValues = getCurrentStepValues()

    switch (currentStep.value) {
      case 1:
        await step1Schema.parseAsync(currentValues)
        break
      case 2:
        await step2Schema.parseAsync(currentValues)
        break
      case 3:
        await step3Schema.parseAsync(currentValues)
        break
    }

    return true
  } catch (error) {
    const result = await validate()
    console.warn('Zod validation failed, fallback veevalidate errors:', result)
    console.error('err', error)
    return false
  }
}

const getCurrentStepValues = () => {
  switch (currentStep.value) {
    case 1:
      return {
        dateReceived: dateReceived.value || '',
        timeReceived: timeReceived.value || '',
        customerTitle: customerTitle.value || '',
        customerName: customerName.value || '',
        firstName: firstName.value || '',
        dateOfBirth: dateOfBirth.value || '',
        sex: sex.value || '',
      }
    case 2:
      return {
        nameOpj: nameOpj.value || '',
        servicePolice: servicePolice.value || '',
        opjGrade: opjGrade.value || '',
        pvNumber: pvNumber.value || '',
        nationality: nationality.value || '',
        tgiOf: tgiOf.value || '',
        magistrateName: magistrateName.value || '',
        magistrateGrade: magistrateGrade.value || '',
        prosecutorOfficeNumber: prosecutorOfficeNumber.value || '',
        instructionNumber: instructionNumber.value || '',
        justiceIdentifier: justiceIdentifier.value || '',
      }
    case 3:
      return {
        seals: seals.value || [],
      }
    default:
      return {}
  }
}

// Step navigation
const nextStep = async () => {
  if (currentStep.value < totalSteps) {
    const isValid = await validateCurrentStep()
    console.log('Step validation result:', isValid)
    if (isValid) {
      currentStep.value++
    } else {
      const result = await validate()
      console.log('res', result)
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const isLastStep = computed(() => currentStep.value === totalSteps)

const currentStepErrors = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (
        !dateReceived.value ||
        !timeReceived.value ||
        !customerTitle.value ||
        dateReceivedError.value ||
        timeReceivedError.value ||
        customerTitleError.value
      )
    case 2:
      return !nameOpj.value || nameOpjError.value
    case 3:
      return seals.value.length === 0
  }
  return false
})

const handleUpdateSeals = (updated: Seal[]) => {
  seals.value = updated
  setFieldValue('seals', updated)
}

setFieldValue('seals', seals.value)

const submitForm = handleSubmit((values) => {
  console.log('Final Submission:', values)
})

const handleNextOrSubmit = () => {
  console.log('herererer')
  if (isLastStep.value) {
    console.log('hey', isLastStep.value)

    submitForm()
  } else {
    nextStep()
  }
}
</script>

<template>
  <div class="flex flexcol itemscenter wfull px4">
    <div class="flex justifycenter wfull mb4">
      <Stepper :currentStep="currentStep" :totalSteps="totalSteps" />
    </div>
    <h3 class="textlg fontsemibold mb6">{{ stepLabels[currentStep - 1] }}</h3>

    <template vif="currentStep === 1">
      <div class="wfull maxw5xl">
        <div class="grid gridcols1 gap4 sm:gap6 md:gridcols2 lg:gridcols3 mb8">
          <BaseInput
            label="Date received"
            type="date"
            v-model="dateReceived"
            :error="dateReceivedError"
            required
          />
          <BaseSelect
            label="Time received"
            :options="timeSlots"
            v-model="timeReceived"
            :error="timeReceivedError"
            required
          />
          <BaseSelect
            label="Customer title"
            :options="['Mr', 'Ms', 'Mrs']"
            v-model="customerTitle"
            :error="customerTitleError"
            required
          />
          <BaseInput label="Customer name" v-model="customerName" :error="customerNameError" />
          <BaseInput label="First name" v-model="firstName" :error="firstNameError" />
          <BaseInput
            label="Date of birth"
            placeholder="DD/MM/YYYY"
            v-model="dateOfBirth"
            :error="dateOfBirthError"
          />
          <BaseSelect label="Sex" :options="['Male', 'Female']" v-model="sex" :error="sexError" />
        </div>
      </div>
    </template>

    <template velseif="currentStep === 2">
      <div class="wfull maxw5xl">
        <div class="grid gridcols1 gap4 sm:gap6 md:gridcols2 lg:gridcols3 mb8">
          <BaseSelect
            label="Name OPJ"
            :options="['John Doe', 'Jane Smith']"
            v-model="nameOpj"
            :error="nameOpjError"
            required
          />
          <BaseInput label="Service Police" v-model="servicePolice" :error="servicePoliceError" />
          <BaseInput label="OPJ Grade" v-model="opjGrade" :error="opjGradeError" />
          <BaseInput label="PV Number" v-model="pvNumber" :error="pvNumberError" />
          <BaseSelect
            label="Nationality"
            :options="['French', 'German', 'Pakistani']"
            v-model="nationality"
            :error="nationalityError"
          />
          <BaseSelect
            label="TGI of"
            :options="['Paris', 'Lyon', 'Marseille']"
            v-model="tgiOf"
            :error="tgiOfError"
          />
          <BaseSelect
            label="Magistrate Name"
            :options="['Mr. Lambert', 'Ms. Sophie']"
            v-model="magistrateName"
            :error="magistrateNameError"
          />
          <BaseSelect
            label="Magistrate Grade"
            :options="['Grade 1', 'Grade 2']"
            v-model="magistrateGrade"
            :error="magistrateGradeError"
          />
          <BaseInput
            label="Prosecutor's office number"
            v-model="prosecutorOfficeNumber"
            :error="prosecutorOfficeNumberError"
          />
          <BaseInput
            label="Instruction number"
            v-model="instructionNumber"
            :error="instructionNumberError"
          />
          <BaseInput
            label="Justice identifier"
            v-model="justiceIdentifier"
            :error="justiceIdentifierError"
          />
        </div>
      </div>
    </template>

    <template velse>
      <div class="wfull maxw5xl">
        <SealTabs :sealsData="seals" :errors="errors" @updateseals="handleUpdateSeals" />
      </div>
    </template>

    <div class="flex flexcol sm:flexrow justifyend gap4 mt8 wfull maxw5xl">
      <BaseButton
        vif="currentStep > 1"
        @click="prevStep"
        variant="secondary"
        class="wfull sm:wauto px4 py2"
      >
        <i class="fas faarrowleft mr2"></i> Previous
      </BaseButton>
      <BaseButton
        @click="handleNextOrSubmit"
        variant="primary"
        class="wfull sm:wauto px4 py2"
        :disable="currentStepErrors"
      >
        {{ isLastStep ? 'Finish' : 'Next' }}
        <i :class="isLastStep ? 'fas facheck ml2' : 'fas faarrowright ml2'"></i>
      </BaseButton>
    </div>
  </div>
</template>
