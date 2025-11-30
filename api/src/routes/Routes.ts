import { Router } from "express";
import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../controllers/CustomerController";
import { validateDto } from "../middleware/ValidateDTO";
import { CustomerDTO } from "../dto/CustomerDTO";
import {
    getOrders,
    getOrderById,
    getOrdersByCustomerId,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/OrderController";
import { OrderDTO } from "../dto/OrderDTO";
import {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    updatePaymentStatus,
    deletePayment,
    getPaymentsByOrderId,
    getPaymentsByStatus,
} from "../controllers/PaymentController";
import { PaymentDTO } from "../dto/PaymentDTO";
import {
    getInventoryAdjustments,
    getInventoryAdjustmentById,
    getInventoryAdjustmentsByInventoryItemId,
    getInventoryAdjustmentsByRelatedOrderId,
    createInventoryAdjustment,
    updateInventoryAdjustment,
    deleteInventoryAdjustment,
} from "../controllers/InventoryAdjustmentController";
import {
    getInventoryItems,
    getInventoryItemById,
    getInventoryItemBySku,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
} from "../controllers/InventoryItemController";
import {
    getMenuItems,
    getMenuItemById,
    getMenuItemsByCategory,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from "../controllers/MenuItemController";
import {
    getOrderItems,
    getOrderItemById,
    getOrderItemsByOrderId,
    getOrderItemsByMenuItemId,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
} from "../controllers/OrderItemController";
import { InventoryAdjustmentDTO } from "../dto/InventoryAdjustmentDTO";
import { InventoryItemDTO } from "../dto/InventoryItemDTO";
import { MenuItemDTO } from "../dto/MenuItemDTO";
import { OrderItemDTO } from "../dto/OrderItemDTO";
import {
    login,
    createUser,
    changePassword,
} from "../controllers/AuthController";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { authorizeRoles } from "../middleware/roleAuth";
import { changePasswordDTO, UserDTO } from "../dto/UserDTO";

const router = Router();

// Auth routes
router.post("/auth/login", login);
router.post(
    "/auth/create-user",
    authenticateJWT,
    authorizeRoles("admin"),
    validateDto(UserDTO),
    createUser
);
router.put(
    "/auth/change-password",
    authenticateJWT,
    validateDto(changePasswordDTO),
    changePassword
);

// Customer routes
router.get(
    "/customer",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getCustomers
);
router.get(
    "/customer/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getCustomerById
);
router.post(
    "/customer",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(CustomerDTO),
    createCustomer
);
router.put(
    "/customer/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(CustomerDTO),
    updateCustomer
);
router.delete(
    "/customer/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deleteCustomer
);

// Order routes
router.get(
    "/order",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrders
);
router.get(
    "/order/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrderById
);
router.get(
    "/order/customer/:customer_id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrdersByCustomerId
);
router.post(
    "/order",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(OrderDTO),
    createOrder
);
router.put(
    "/order/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(OrderDTO),
    updateOrder
);
router.put(
    "/order/:id/status",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(OrderDTO),
    updateOrderStatus
);
router.delete(
    "/order/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deleteOrder
);

// Payment routes
router.get(
    "/payment",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getPayments
);
router.get(
    "/payment/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getPaymentById
);
router.get(
    "/payment/order/:order_id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getPaymentsByOrderId
);
router.get(
    "/payment/status/:status",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getPaymentsByStatus
);
router.post(
    "/payment",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(PaymentDTO),
    createPayment
);
router.put(
    "/payment/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(PaymentDTO),
    updatePayment
);
router.patch(
    "/payment/:id/status",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(PaymentDTO),
    updatePaymentStatus
);
router.delete(
    "/payment/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deletePayment
);
// Menu item routes
router.get(
    "/menuitem",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getMenuItems
);
router.get(
    "/menuitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getMenuItemById
);
router.get(
    "/menuitem/category/:category",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getMenuItemsByCategory
);
router.post(
    "/menuitem",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    validateDto(MenuItemDTO),
    createMenuItem
);
router.put(
    "/menuitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    validateDto(MenuItemDTO),
    updateMenuItem
);
router.delete(
    "/menuitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deleteMenuItem
);

// Inventory item routes
router.get(
    "/inventoryitem",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryItems
);
router.get(
    "/inventoryitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryItemById
);
router.get(
    "/inventoryitem/sku/:sku",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryItemBySku
);
router.post(
    "/inventoryitem",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    validateDto(InventoryItemDTO),
    createInventoryItem
);
router.put(
    "/inventoryitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    validateDto(InventoryItemDTO),
    updateInventoryItem
);
router.delete(
    "/inventoryitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deleteInventoryItem
);
// Order item routes
router.get(
    "/orderitem",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrderItems
);
router.get(
    "/orderitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrderItemById
);
router.get(
    "/orderitem/order/:order_id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrderItemsByOrderId
);
router.get(
    "/orderitem/menuitem/:menu_item_id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getOrderItemsByMenuItemId
);
router.post(
    "/orderitem",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(OrderItemDTO),
    createOrderItem
);
router.put(
    "/orderitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    validateDto(OrderItemDTO),
    updateOrderItem
);
router.delete(
    "/orderitem/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deleteOrderItem
);

// Inventory adjustment routes
router.get(
    "/inventoryadjustment",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryAdjustments
);
router.get(
    "/inventoryadjustment/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryAdjustmentById
);
router.get(
    "/inventoryadjustment/inventoryitem/:inventory_item_id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryAdjustmentsByInventoryItemId
);
router.get(
    "/inventoryadjustment/relatedorder/:related_order_id",
    authenticateJWT,
    authorizeRoles("admin", "manager", "staff"),
    getInventoryAdjustmentsByRelatedOrderId
);
router.post(
    "/inventoryadjustment",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    validateDto(InventoryAdjustmentDTO),
    createInventoryAdjustment
);
router.put(
    "/inventoryadjustment/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    validateDto(InventoryAdjustmentDTO),
    updateInventoryAdjustment
);
router.delete(
    "/inventoryadjustment/:id",
    authenticateJWT,
    authorizeRoles("admin", "manager"),
    deleteInventoryAdjustment
);
export default router;
