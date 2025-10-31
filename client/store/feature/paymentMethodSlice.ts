import { PaymentMethod } from "@/types/payment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentMethodState {
  paymentMethods: PaymentMethod[];
  activeMethod: PaymentMethod | null;
}

const initialState: PaymentMethodState = {
  paymentMethods: [
    {
      id: "1",
      name: "Amit Arora",
      cardType: "Visa",
      cardNumber: "4111 1111 1111 1111",
      expiryMonth: "12",
      expiryYear: "2027",
      cvv: "123",
      phoneNo: "+91 9876543210",
      isDefault: true,
      addedOn: "2025-10-25",
      billingAddress: "New Delhi, India",
    },
    {
      id: "2",
      name: "Riya Sharma",
      cardType: "MasterCard",
      cardNumber: "5500 0000 0000 0004",
      expiryMonth: "08",
      expiryYear: "2026",
      cvv: "456",
      phoneNo: "+91 9988776655",
      addedOn: "2025-10-24",
    },
  ],
  activeMethod: {
    id: "1",
    name: "Amit Arora",
    cardType: "Visa",
    cardNumber: "4111 1111 1111 1111",
    expiryMonth: "12",
    expiryYear: "2027",
    cvv: "123",
    phoneNo: "+91 9876543210",
    isDefault: true,
    addedOn: "2025-10-25",
    billingAddress: "New Delhi, India",
  },
};

const PaymentSlice = createSlice({
  name: "PaymentSlice",
  initialState,
  reducers: {
    setPaymentMethodActive: (
      state,
      action: PayloadAction<{ paymentMethodId: string }>
    ) => {
      state.activeMethod = state.paymentMethods.find(
        (p) => p.id === action.payload.paymentMethodId
      )!;
    },
    setPaymentMethodInActive: (state) => {
      state.activeMethod = null;
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    removePaymentMethod: (
      state,
      action: PayloadAction<{ paymentMethodId: string }>
    ) => {
      state.paymentMethods = state.paymentMethods.filter(
        (p) => p.id !== action.payload.paymentMethodId
      );
    },
  },
});

export const {
  addPaymentMethod,
  removePaymentMethod,
  setPaymentMethodActive,
  setPaymentMethodInActive,
} = PaymentSlice.actions;

export default PaymentSlice.reducer;
