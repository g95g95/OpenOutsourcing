import { z } from 'zod'

export const leadMagnetSchema = z.object({
  nome: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  azienda: z.string().optional(),
  settore: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Devi accettare la privacy policy',
  }),
  newsletter: z.boolean().optional(),
})

export const contactSchema = z.object({
  nome: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  telefono: z.string().optional(),
  messaggio: z.string().min(10, 'Il messaggio deve avere almeno 10 caratteri'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Devi accettare la privacy policy',
  }),
})

export const consultationSchema = z.object({
  nome: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  telefono: z.string().min(6, 'Inserisci un numero di telefono valido'),
  azienda: z.string().min(2, 'Il nome azienda deve avere almeno 2 caratteri'),
  settore: z.string().optional(),
  budget_outsourcing: z.string().optional(),
  esigenza: z.string().min(20, 'Descrivi la tua esigenza in almeno 20 caratteri'),
  fonte: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Devi accettare la privacy policy',
  }),
})
