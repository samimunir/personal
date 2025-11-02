export type Role = "ADMIN" | "STAFF" | "CUSTOMER";

export const Events = {
  ORDER_PAID: "order.paid",
  ORDER_CANCELLED: "order.cancelled",
  INVENTORY_LOW: "inventory.low",
  BOOKING_CONFIRMED: "booking.confirmed",
  BOOKING_CANCALLED: "booking.cancelled",
  CATALOG_PRODUCT_UPDATED: "catalog.product.updated",
  CATALOG_SERVICE_UPDATED: "catalog.service.updated",
} as const;
