import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface ContactFormData {
  first_name: string;
  last_name: string;
  role: string;
  company: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = useCallback(async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          company: data.company,
          message: data.message,
        }]);

      if (error) {
        setErrorMessage(error.message);
        setStatus('error');
        return false;
      }

      setStatus('success');
      return true;
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue');
      setStatus('error');
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

  return { status, errorMessage, submit, reset };
}