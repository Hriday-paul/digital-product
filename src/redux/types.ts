export type IUser = {
    id: number
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

export interface OrderServicePayloadItem {
    serviceId: string;
    varientId: string;
    quantity: number;
}

export interface PlaceOrderPayload {
    services: OrderServicePayloadItem[];
    customerName: string;
    customerEmail: string;
    customerWhatsapp: string;
    customerNote?: string;
    paymentMethod: PaymentMethod;
    accountNumber: string;
    transactionId: string;
}


export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export enum PaymentMethod {
    BKASH = "BKASH",
    NAGAD = "NAGAD",
    ROCKET = "ROCKET",
    CARD = "CARD",
    CASH = "CASH",
}

export interface IOrder {
    id: string;
    userId: string;

    customerName: string;
    customerEmail: string;
    customerWhatsapp: string;
    customerNote: string | null;

    price: number;

    couponCode: string | null;
    couponDiscount: number;
    couponApplied: boolean;

    paymentMethod: PaymentMethod;
    accountNumber: string | null;
    transactionId: string;

    status: OrderStatus;

    createdAt: Date;
    updatedAt: Date;

    items: OrderItem[];
}

export interface OrderItem {
    id: string;
    orderId: string;

    serviceId: string;
    variantId: string;

    quantity: number;
    unitPrice: number;
    totalPrice: number;

    service?: IService;
    variant?: IServiceVariant;

    createdAt: Date;
    updatedAt: Date;
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
    services: IService[];
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

export interface IBanner {
    id: string;
    url: string;
    key: string;
    link?: string;
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