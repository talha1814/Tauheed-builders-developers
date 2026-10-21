import { PaymentPlan, PaymentPlanItem } from './types';

export interface PaymentCalculationResult {
  totalAmountPKR: number;
  bookingAmountPKR: number;
  confirmationAmountPKR: number;
  allocationAmountPKR: number;
  totalInstallmentsAmountPKR: number;
  possessionAmountPKR: number;
  customMilestonesTotalPKR: number;
  calculatedSumPKR: number;
  differencePKR: number;
  isValid: boolean;
  schedule: Array<{
    title: string;
    percentage: number;
    amountPKR: number;
    timeline: string;
    type: 'booking' | 'confirmation' | 'allocation' | 'installment' | 'milestone' | 'possession';
  }>;
}

/**
 * Calculates and validates all payment plan amounts and generates a transparent breakdown.
 * Ensures calculatedSum == totalAmount and catches any discrepancies.
 */
export function calculatePaymentSchedule(plan: {
  totalAmountPKR: number;
  bookingAmountPKR: number;
  confirmationAmountPKR: number;
  allocationAmountPKR: number;
  numberOfInstallments: number;
  installmentAmountPKR: number;
  possessionAmountPKR: number;
  installmentFrequency?: 'monthly' | 'quarterly' | 'bi-annual';
  milestones?: Array<{
    milestoneTitle: string;
    amountPKR: number;
    percentage?: number;
    dueDateDescription?: string;
  }>;
}): PaymentCalculationResult {
  const totalAmount = Math.round(Number(plan.totalAmountPKR) || 0);
  const booking = Math.round(Number(plan.bookingAmountPKR) || 0);
  const confirmation = Math.round(Number(plan.confirmationAmountPKR) || 0);
  const allocation = Math.round(Number(plan.allocationAmountPKR) || 0);
  const numInstallments = Math.max(0, Math.round(Number(plan.numberOfInstallments) || 0));
  const installmentAmount = Math.round(Number(plan.installmentAmountPKR) || 0);
  const possession = Math.round(Number(plan.possessionAmountPKR) || 0);

  const totalInstallmentsAmount = numInstallments * installmentAmount;

  // Custom milestones if any
  const customMilestones = (plan.milestones || []).map(m => ({
    title: m.milestoneTitle,
    amountPKR: Math.round(Number(m.amountPKR) || 0),
    percentage: totalAmount > 0 ? Number(((m.amountPKR / totalAmount) * 100).toFixed(2)) : 0,
    timeline: m.dueDateDescription || 'As per construction milestone',
    type: 'milestone' as const,
  }));

  const customMilestonesTotal = customMilestones.reduce((acc, curr) => acc + curr.amountPKR, 0);

  const calculatedSum = booking + confirmation + allocation + totalInstallmentsAmount + possession + customMilestonesTotal;
  const difference = calculatedSum - totalAmount;
  const isValid = totalAmount > 0 && Math.abs(difference) === 0;

  const schedule: PaymentCalculationResult['schedule'] = [];

  if (booking > 0) {
    schedule.push({
      title: 'Booking Deposit',
      percentage: totalAmount > 0 ? Number(((booking / totalAmount) * 100).toFixed(2)) : 0,
      amountPKR: booking,
      timeline: 'At the time of booking registration',
      type: 'booking',
    });
  }

  if (confirmation > 0) {
    schedule.push({
      title: 'Confirmation (Allocation Agreement)',
      percentage: totalAmount > 0 ? Number(((confirmation / totalAmount) * 100).toFixed(2)) : 0,
      amountPKR: confirmation,
      timeline: 'Within 30 days of booking',
      type: 'confirmation',
    });
  }

  if (allocation > 0) {
    schedule.push({
      title: 'Allocation (Plot/Unit Allotment)',
      percentage: totalAmount > 0 ? Number(((allocation / totalAmount) * 100).toFixed(2)) : 0,
      amountPKR: allocation,
      timeline: 'Within 60 days of booking',
      type: 'allocation',
    });
  }

  // Add custom milestones before or during installments
  customMilestones.forEach(m => schedule.push(m));

  if (numInstallments > 0 && installmentAmount > 0) {
    const freqLabel = plan.installmentFrequency === 'quarterly' 
      ? 'Quarterly' 
      : plan.installmentFrequency === 'bi-annual' 
        ? 'Semi-Annual' 
        : 'Monthly';

    schedule.push({
      title: `${numInstallments} ${freqLabel} Installments (${numInstallments} x PKR ${installmentAmount.toLocaleString()})`,
      percentage: totalAmount > 0 ? Number(((totalInstallmentsAmount / totalAmount) * 100).toFixed(2)) : 0,
      amountPKR: totalInstallmentsAmount,
      timeline: `Spread across ${numInstallments} ${plan.installmentFrequency || 'monthly'} cycles`,
      type: 'installment',
    });
  }

  if (possession > 0) {
    schedule.push({
      title: 'On Physical Possession & Handover',
      percentage: totalAmount > 0 ? Number(((possession / totalAmount) * 100).toFixed(2)) : 0,
      amountPKR: possession,
      timeline: 'At final project completion & key handover',
      type: 'possession',
    });
  }

  return {
    totalAmountPKR: totalAmount,
    bookingAmountPKR: booking,
    confirmationAmountPKR: confirmation,
    allocationAmountPKR: allocation,
    totalInstallmentsAmountPKR: totalInstallmentsAmount,
    possessionAmountPKR: possession,
    customMilestonesTotalPKR: customMilestonesTotal,
    calculatedSumPKR: calculatedSum,
    differencePKR: difference,
    isValid,
    schedule,
  };
}
