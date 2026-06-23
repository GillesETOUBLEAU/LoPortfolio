import React, { useState, FormEvent } from 'react';
import { useContactForm } from '../hooks/useContactForm';

export const ContactForm: React.FC = () => {
  const { status, errorMessage, submit, reset } = useContactForm();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    company: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await submit(formData);
    if (success) {
      setFormData({ first_name: '', last_name: '', role: '', company: '', message: '' });
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-white placeholder-white/30 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-white/70 mb-1.5";

  if (status === 'success') {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-10 text-center max-w-md mx-4">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2">Merci !</h3>
          <p className="text-white/60 mb-6">Votre message a bien été envoyé.</p>
          <button
            onClick={reset}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-4">
      <div className="max-w-lg w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Contact</span>
        </h2>
        <p className="text-white/40 text-center mb-8">Une question, un projet ? Échangeons.</p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="first_name" className={labelClass}>Prénom</label>
                <input
                  id="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  className={inputClass}
                  placeholder="Votre prénom"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label htmlFor="last_name" className={labelClass}>Nom</label>
                <input
                  id="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  className={inputClass}
                  placeholder="Votre nom"
                  disabled={status === 'submitting'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className={labelClass}>Fonction</label>
              <input
                id="role"
                type="text"
                required
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className={inputClass}
                placeholder="Votre fonction"
                disabled={status === 'submitting'}
              />
            </div>

            <div>
              <label htmlFor="company" className={labelClass}>Société</label>
              <input
                id="company"
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className={inputClass}
                placeholder="Votre société"
                disabled={status === 'submitting'}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>Commentaires</label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Votre message..."
                disabled={status === 'submitting'}
              />
            </div>

            {status === 'error' && (
              <div role="alert" className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-200">
                {errorMessage || 'Une erreur est survenue. Veuillez réessayer.'}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};