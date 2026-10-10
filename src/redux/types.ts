export type IUser = {
    id : number
    "email": string,
    phone: string,
    name: string,
    whatsapp: string | null
    picture: { url: string, key: string } | null
    auth: {
        role: "ADMIN",
        isActive: boolean,
        isVerified: boolean
    },
    address: string | null,

    facebook: string | null
    twitter: string | null,
    youtube: string | null,
    instagram: string | null
    linkedin: string | null,
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED" | string;
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | string;
export type PaymentMethodType = "BKASH" | "NAGAD" | "ROCKET";

export interface PlaceOrderPayload {
    serviceId: string;
    variantId: string;
    customerName: string;
    customerEmail: string;
    customerWhatsapp: string;
    customerNote?: string;
    paymentMethod: PaymentMethodType;
    accountNumber: string;
    transactionId: string;
    amount?: number;
}

export interface IOrderPayment {
    id: string | number;
    amount: number;
    paymentMethod: string;
    accountNumber: string;
    transactionId: string;
    status: PaymentStatus;
    userId?: string;
    createdAt?: string | Date;
    lastActionAt?: string | Date;
}

export interface IOrder {
    id: string | number;
    userId: string;
    serviceId: string | number;
    variantId: string | number;
    paymentId: string | number;
    customerName: string;
    customerEmail: string;
    customerWhatsapp?: string;
    customerNote?: string | null;
    status: OrderStatus;
    user: IUser;
    service: IService;
    variant: IServiceVariant;
    payment: IOrderPayment;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface INotification {
    id: string
    title: string,
    message: string,
    "isRead": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": 0
}

export interface Icontact {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    description: string;
    isReplied: boolean;
    reply_message: null | string,
    replied_At: Date
    createdAt: Date
}

export interface ICategory {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export type AccountType = "PERSONAL" | "BUSINESS";

export interface IServiceVariant {
    id: string;
    timeLine: string;
    base_price: number;
    discount: number;
    final_price: number;
    badges: VariantBadge[];
    note: string | null;
    accountType: AccountType | string;
    isDeleted: boolean;
}

export interface IServiceImage {
    id: string;
    url: string;
    key: string;
}

export interface IService {
    id: string;
    title: string;
    slug: string;
    description: string;
    note: string | null;
    minPrice: number;
    maxPrice: number;
    categoryId: string;
    category: ICategory;
    images: IServiceImage[];
    variants: IServiceVariant[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

enum VariantBadge {
  BEST_VALUE = "BEST_VALUE",
  MOST_POPULAR = "MOST_POPULAR",
  BEST_SELLER = "BEST_SELLER",
  BEST_DEAL = "BEST_DEAL",
  PREMIUM = "PREMIUM",
  RECOMMENDED = "RECOMMENDED",
  NEW = "NEW",
  LIMITED_STOCK = "LIMITED_STOCK",
  TRENDING = "TRENDING",
  EXCLUSIVE = "EXCLUSIVE",
  SPECIAL_OFFER = "SPECIAL_OFFER",
  TOP_PICK = "TOP_PICK"
}