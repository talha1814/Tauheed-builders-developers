'use client';

import React, { useState, useMemo } from 'react';
import { PaymentPlan, Project } from '@/lib/types';
import { formatPKR, slugify } from '@/lib/utils';
import { calculatePaymentSchedule } from '@/lib/payment-calculator';
import { Plus, Trash2, AlertTriangle, CheckCircle, X, CreditCard, Calculator } from 'lucide-react';

interface PaymentPlansClientManagerProps {
  initialPlans: PaymentPlan[];
  projects: Project[];
}

export default function PaymentPlansClientManager({
  initialPlans,
  projects,
}: PaymentPlansClientManagerProps) {
  const [plans, setPlans] = useState<PaymentPlan[]>(initialPlans);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form inputs
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [name, setName] = useState('Standard 36-Month Construction Schedule');
  const [totalAmountPKR, setTotalAmountPKR] = useState(25000000);
  const [bookingAmountPKR, setBookingAmountPKR] = useState(2500000); // 10%
  const [confirmationAmountPKR, setConfirmationAmountPKR] = useState(2500000); // 10%
  const [allocationAmountPKR, setAllocationAmountPKR] = useState(2500000); // 10%
  const [installmentFrequency, setInstallmentFrequency] = useState<'monthly' | 'quarterly' | 'bi-annual'>('monthly');
  const [numberOfInstallments, setNumberOfInstallments] = useState(36);
  const [installmentAmountPKR, setInstallmentAmountPKR] = useState(400000); // 36 * 400k = 14.4M
  const [possessionAmountPKR, setPossessionAmountPKR] = useState(3100000); // Remaining
  const [isPublic, setIsPublic] = useState(true);

  // Live calculation & discrepancy analysis
  const calculation = useMemo(() => {
    return calculatePaymentSchedule({
      totalAmountPKR,
      bookingAmountPKR,
      confirmationAmountPKR,
      allocationAmountPKR,
      numberOfInstallments,
      installmentAmountPKR,
      possessionAmountPKR,
      installmentFrequency,
    });
  }, [
    totalAmountPKR,
    bookingAmountPKR,
    confirmationAmountPKR,
    allocationAmountPKR,
    numberOfInstallments,
    installmentAmountPKR,
    possessionAmountPKR,
    installmentFrequency,
  ]);

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!calculation.isValid) {
      if (!confirm(`Warning: There is a discrepancy of ${formatPKR(Math.abs(calculation.differencePKR))} between entered components and the total contract amount. Do you still wish to save?`)) {
        return;
      }
    }

    const payload = {
      projectId,
      name,
      slug: slugify(name),
      totalAmountPKR: Number(totalAmountPKR),
      bookingAmountPKR: Number(bookingAmountPKR),
      confirmationAmountPKR: Number(confirmationAmountPKR),
      allocationAmountPKR: Number(allocationAmountPKR),
      installmentFrequency,
      numberOfInstallments: Number(numberOfInstallments),
      installmentAmountPKR: Number(installmentAmountPKR),
      possessionAmountPKR: Number(possessionAmountPKR),
      isPublic,
      publicationStatus: 'published',
    };

    try {
      const res = await fetch('/api/admin/payment-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.plan) {
        setPlans([json.plan, ...plans]);
        setShowAddModal(false);
      } else {
        alert(json.error || 'Failed to save plan');
      }
    } catch {
      alert('Error saving plan');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment plan?')) return;
    try {
      const res = await fetch(`/api/admin/payment-plans?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPlans(plans.filter(p => p.id !== id));
      }
    } catch {
      alert('Failed to delete plan');
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between bg-[#16191D] p-4 rounded-lg border border-[#252A30]">
        <div className="text-xs text-[#8E9296]">
          Configured Plans: <strong className="text-white">{plans.length}</strong>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Payment Schedule</span>
        </button>
      </div>

      {/* Plans List Table */}
      <div className="bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8E7E2]">
            <thead>
              <tr className="border-b border-[#252A30] bg-[#14171A] text-[#8E9296] uppercase font-semibold">
                <th className="py-3 px-4">Plan Name</th>
                <th className="py-3 px-4">Associated Project</th>
                <th className="py-3 px-4">Total Contract</th>
                <th className="py-3 px-4">Booking (Down)</th>
                <th className="py-3 px-4">Installment Frequency</th>
                <th className="py-3 px-4">Discrepancy Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252A30]">
              {plans.map((p) => {
                const check = calculatePaymentSchedule({
                  totalAmountPKR: p.totalAmountPKR,
                  bookingAmountPKR: p.bookingAmountPKR,
                  confirmationAmountPKR: p.confirmationAmountPKR,
                  allocationAmountPKR: p.allocationAmountPKR,
                  numberOfInstallments: p.numberOfInstallments,
                  installmentAmountPKR: p.installmentAmountPKR,
                  possessionAmountPKR: p.possessionAmountPKR,
                });

                return (
                  <tr key={p.id} className="hover:bg-[#1A1E24] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-4 text-[#8E9296]">
                      {p.projectName || 'General'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#B89A68]">
                      {formatPKR(p.totalAmountPKR)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#C8C7C2]">
                      {formatPKR(p.bookingAmountPKR)}
                    </td>
                    <td className="py-3.5 px-4 capitalize text-[#8E9296]">
                      {p.numberOfInstallments} x {p.installmentFrequency}
                    </td>
                    <td className="py-3.5 px-4">
                      {check.isValid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle className="w-3 h-3" />
                          <span>100% Balanced</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Diff: {formatPKR(check.differencePKR)}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Builder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#16191D] border border-[#252A30] rounded-lg max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#252A30]">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#B89A68]" />
                <h3 className="font-serif text-lg font-bold text-white">Payment Schedule Builder</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-[#8E9296] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Discrepancy Alert */}
            {calculation.isValid ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Components perfectly balance to 100% of Total Contract Price ({formatPKR(calculation.totalAmountPKR)}).</span>
              </div>
            ) : (
              <div className="p-3 bg-amber-950/40 border border-amber-800 text-amber-300 text-xs rounded flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Schedule Balance Discrepancy Detected</div>
                  <div>
                    Entered components sum to {formatPKR(calculation.calculatedSumPKR)}, which is {formatPKR(Math.abs(calculation.differencePKR))} {calculation.differencePKR > 0 ? 'over' : 'short of'} the Total Amount.
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#C8C7C2] mb-1">Associated Development *</label>
                <select
                  required
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#C8C7C2] mb-1">Plan Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                />
              </div>

              <div>
                <label className="block text-[#C8C7C2] mb-1">Total Contract Price (PKR) *</label>
                <input
                  type="number"
                  required
                  value={totalAmountPKR}
                  onChange={(e) => setTotalAmountPKR(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-[#D4BD8F] font-mono font-bold rounded"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Booking Deposit</label>
                  <input
                    type="number"
                    value={bookingAmountPKR}
                    onChange={(e) => setBookingAmountPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white font-mono rounded"
                  />
                </div>
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Confirmation (30 Days)</label>
                  <input
                    type="number"
                    value={confirmationAmountPKR}
                    onChange={(e) => setConfirmationAmountPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white font-mono rounded"
                  />
                </div>
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Allocation (60 Days)</label>
                  <input
                    type="number"
                    value={allocationAmountPKR}
                    onChange={(e) => setAllocationAmountPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white font-mono rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Frequency</label>
                  <select
                    value={installmentFrequency}
                    onChange={(e) => setInstallmentFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="bi-annual">Bi-Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#C8C7C2] mb-1">No. of Installments</label>
                  <input
                    type="number"
                    value={numberOfInstallments}
                    onChange={(e) => setNumberOfInstallments(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white font-mono rounded"
                  />
                </div>
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Installment Amount</label>
                  <input
                    type="number"
                    value={installmentAmountPKR}
                    onChange={(e) => setInstallmentAmountPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white font-mono rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C8C7C2] mb-1">Possession & Handover Final Payment</label>
                <input
                  type="number"
                  value={possessionAmountPKR}
                  onChange={(e) => setPossessionAmountPKR(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white font-mono rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1F242B] text-[#8E9296] hover:text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] font-bold uppercase rounded tracking-wider"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
