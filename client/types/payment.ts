export type PaymentMethod = {
  id: string;                // unique identifier for easy updates/deletion
  name: string;              // name on card
  cardType: "Visa" | "MasterCard" | "Amex" | "RuPay" | "Other";  // helps show card logo/UI
  cardNumber: string;        // full or masked version
  expiryMonth: string;       // easier for validation and form binding
  expiryYear: string;
  cvv: string;               // sensitive; consider not storing this permanently
  phoneNo: string;
  isDefault?: boolean;       // mark preferred card
  addedOn?: string;          // track when added (ISO date string)
  billingAddress?: string;   // optional for full checkout flow
};
