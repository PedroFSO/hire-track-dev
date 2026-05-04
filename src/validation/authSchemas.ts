import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Informe um e-mail valido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(3, 'Informe seu nome completo.'),
  location: z.string().trim().min(2, 'Informe sua localizacao.'),
  mainStack: z.string().trim().min(2, 'Informe sua stack principal.'),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
