import { z } from "zod";

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  address1: z.string().min(3, "Street address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State / Province is required"),
  postalCode: z.string().min(3, "ZIP / Postal Code is required"),
  country: z.string().default("US"),
});

export const cartItemSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().positive().max(99),
});

export const checkoutRequestSchema = z.object({
  shippingAddress: shippingAddressSchema,
  items: z.array(cartItemSchema).min(1, "Your cart is empty"),
  discountCode: z.string().optional(),
  paymentMethod: z.enum(["CARD", "PAYPAL", "SHOP_PAY"]).default("CARD"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const discountSchema = z.object({
  code: z.string().min(2, "Discount code is required").toUpperCase(),
});
