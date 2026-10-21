import { describe, it, expect } from 'vitest';
import { calculatePaymentSchedule } from '../payment-calculator';

describe('Payment Calculator', () => {
  it('correctly calculates matching payment schedule', () => {
    const plan = {
      totalAmountPKR: 10000000, // 1 Crore
      bookingAmountPKR: 1000000, // 10%
      confirmationAmountPKR: 1000000, // 10%
      allocationAmountPKR: 1000000, // 10%
      numberOfInstallments: 30, // 30 months
      installmentAmountPKR: 200000, // 30 * 200,000 = 6,000,000 (60%)
      possessionAmountPKR: 1000000, // 10%
      installmentFrequency: 'monthly' as const,
    };

    const result = calculatePaymentSchedule(plan);

    expect(result.isValid).toBe(true);
    expect(result.calculatedSumPKR).toBe(10000000);
    expect(result.differencePKR).toBe(0);
    expect(result.totalInstallmentsAmountPKR).toBe(6000000);
    expect(result.schedule.length).toBe(5);
  });

  it('detects discrepancy when amounts do not match total', () => {
    const plan = {
      totalAmountPKR: 10000000,
      bookingAmountPKR: 1000000,
      confirmationAmountPKR: 1000000,
      allocationAmountPKR: 1000000,
      numberOfInstallments: 20, // 20 * 200,000 = 4,000,000
      installmentAmountPKR: 200000,
      possessionAmountPKR: 1000000,
    };

    const result = calculatePaymentSchedule(plan);

    expect(result.isValid).toBe(false);
    expect(result.differencePKR).toBe(-2000000); // 20 lacs short
  });

  it('handles custom milestone schedules', () => {
    const plan = {
      totalAmountPKR: 5000000,
      bookingAmountPKR: 500000,
      confirmationAmountPKR: 500000,
      allocationAmountPKR: 500000,
      numberOfInstallments: 10,
      installmentAmountPKR: 250000, // 2,500,000
      possessionAmountPKR: 500000,
      milestones: [
        {
          milestoneTitle: 'On Plinth Level Completion',
          amountPKR: 250000,
        },
        {
          milestoneTitle: 'On 5th Floor Slab Casting',
          amountPKR: 250000,
        },
      ],
    };

    const result = calculatePaymentSchedule(plan);

    expect(result.isValid).toBe(true);
    expect(result.customMilestonesTotalPKR).toBe(500000);
    expect(result.calculatedSumPKR).toBe(5000000);
    expect(result.differencePKR).toBe(0);
  });
});
