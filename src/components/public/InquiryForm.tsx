'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InquirySchema } from '@/lib/validations';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Loader2, MessageSquare, Send } from 'lucide-react';
import { Project, Unit } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/utils';

type InquiryFormData = z.infer<typeof InquirySchema>;

interface InquiryFormProps {
  projects?: Project[];
  preselectedProjectId?: string;
  preselectedProjectName?: string;
  preselectedUnitNumber?: string;
  whatsappNumber?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function InquiryForm({
  projects = [],
  preselectedProjectId = '',
  preselectedProjectName = '',
  preselectedUnitNumber = '',
  whatsappNumber = '+92 300 824 5511',
  className = '',
  title = "Register Your Private Consultation",
  subtitle = "Our senior property advisors will provide verified site plans, payment options, and arrange an exclusive site visit.",
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      projectId: preselectedProjectId,
      projectOfInterest: preselectedProjectName,
      unitOfInterest: preselectedUnitNumber,
      preferredContact: 'phone',
      source: preselectedProjectName ? `Project: ${preselectedProjectName}` : 'General Inquiry Form',
    },
  });

  const selectedProjectId = watch('projectId');

  const onSubmit = async (data: InquiryFormData) => {
    setServerError('');
    try {
      // Find project name if id selected
      if (data.projectId && !data.projectOfInterest) {
        const found = projects.find(p => p.id === data.projectId);
        if (found) data.projectOfInterest = found.name;
      }

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit inquiry. Please try again.');
      }

      setInquiryId(json.inquiry?.id || `INQ-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred. Please contact us via WhatsApp.');
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    `Hello Tauheed Builders, I just submitted an inquiry (Ref: ${inquiryId}). I would like to speak directly with an advisor.`
  );

  if (submitted) {
    return (
      <div className={`bg-white p-8 rounded-lg border border-[#B89A68]/30 shadow-md text-center ${className}`}>
        <div className="w-16 h-16 bg-[#B89A68]/15 text-[#B89A68] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#171A1D]">
          Consultation Request Received
        </h3>
        <p className="text-sm text-[#73777C] mt-2 max-w-md mx-auto">
          Thank you for choosing Tauheed Builders & Developers. Your reference identifier is:
        </p>
        <div className="my-3 inline-block bg-[#F7F6F2] border border-[#E8E7E2] px-4 py-1.5 rounded font-mono font-bold text-[#B89A68]">
          {inquiryId}
        </div>
        <p className="text-xs text-[#73777C] mb-6">
          A dedicated property concierge will contact you within business hours with complete verified documentation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded shadow hover:bg-[#20ba5a] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#F7F6F2] text-[#171A1D] text-xs font-semibold uppercase tracking-wider rounded border border-[#E8E7E2] hover:bg-[#E8E7E2] transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 sm:p-8 rounded-lg border border-[#E8E7E2] shadow-sm ${className}`}>
      <div className="mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B89A68]">
          Direct Developer Advisory
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#171A1D] mt-1">
          {title}
        </h3>
        <p className="text-xs text-[#73777C] mt-1 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-[#202124] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Tariq Mahmood"
            {...register('name')}
            className={`w-full px-3.5 py-2.5 text-sm bg-[#F7F6F2] border rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68] transition-colors ${
              errors.name ? 'border-red-400' : 'border-[#E8E7E2]'
            }`}
          />
          {errors.name && (
            <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#202124] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              {...register('email')}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#F7F6F2] border rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68] transition-colors ${
                errors.email ? 'border-red-400' : 'border-[#E8E7E2]'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#202124] mb-1">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+92 300 1234567"
              {...register('phone')}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#F7F6F2] border rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68] transition-colors ${
                errors.phone ? 'border-red-400' : 'border-[#E8E7E2]'
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Project Selection & Preferred Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#202124] mb-1">
              Project of Interest
            </label>
            <select
              {...register('projectId')}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F7F6F2] border border-[#E8E7E2] rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
            >
              <option value="">General Inquiries (Any Project)</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#202124] mb-1">
              Preferred Contact Channel
            </label>
            <select
              {...register('preferredContact')}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F7F6F2] border border-[#E8E7E2] rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
            >
              <option value="phone">Direct Phone Call</option>
              <option value="whatsapp">WhatsApp Message</option>
              <option value="email">Email Detailed Dossier</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium text-[#202124] mb-1">
            Requirements / Inquiries <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Specify your budget range, preferred unit type (e.g. 3-bed apartment, corporate floor), or preferred site visit schedule..."
            {...register('message')}
            className={`w-full px-3.5 py-2.5 text-sm bg-[#F7F6F2] border rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68] transition-colors ${
              errors.message ? 'border-red-400' : 'border-[#E8E7E2]'
            }`}
          />
          {errors.message && (
            <p className="text-[11px] text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider text-[#171A1D] bg-[#B89A68] hover:bg-[#D4BD8F] transition-all duration-200 rounded shadow hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying & Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Consultation Request</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-[#73777C]">
          Strict privacy guaranteed. We will never share your contact information with external brokers.
        </p>
      </form>
    </div>
  );
}
