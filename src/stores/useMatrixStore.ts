'use client';

import { create } from 'zustand';
import type { UnifiedMatrix } from '@/engine';

export interface MatrixInput {
  fullName: string;
  currentName?: string;
  birthDate: string;
  birthTime?: string;
  birthCity?: string;
}

export type MatrixView = 'overview' | 'wheel' | 'loshu' | 'clock' | 'optimizer' | 'synastry' | 'oracle';

interface MatrixState {
  input: MatrixInput;
  targetDate: string;
  matrix: UnifiedMatrix | null;
  view: MatrixView;
  loading: boolean;
  error: string | null;
  setInput: (patch: Partial<MatrixInput>) => void;
  setTargetDate: (date: string) => void;
  setMatrix: (matrix: UnifiedMatrix | null) => void;
  setView: (view: MatrixView) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const initialInput: MatrixInput = {
  fullName: '',
  birthDate: '1990-01-01',
};

export const useMatrixStore = create<MatrixState>((set) => ({
  input: initialInput,
  targetDate: todayISO(),
  matrix: null,
  view: 'overview',
  loading: false,
  error: null,
  setInput: (patch) => set((state) => ({ input: { ...state.input, ...patch } })),
  setTargetDate: (date) => set({ targetDate: date }),
  setMatrix: (matrix) => set({ matrix }),
  setView: (view) => set({ view }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ matrix: null, error: null, input: initialInput, targetDate: todayISO() }),
}));
