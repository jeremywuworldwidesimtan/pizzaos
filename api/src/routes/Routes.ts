import { Router } from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomerController";
import { validateDto } from "../middleware/ValidateDTO";
import { CustomerDTO } from "../dto/CustomerDTO";
import { getOrders, getOrderById, getOrdersByCustomerId, createOrder, updateOrder, updateOrderStatus, deleteOrder } from "../controllers/OrderController";
import { OrderDTO } from "../dto/OrderDTO";
import { getPayments, getPaymentById, createPayment, updatePayment, updatePaymentStatus, deletePayment, getPaymentsByOrderId, getPaymentsByStatus } from "../controllers/PaymentController";
import { PaymentDTO } from "../dto/PaymentDTO";
import { getInventoryAdjustments, getInventoryAdjustmentById, getInventoryAdjustmentsByInventoryItemId, getInventoryAdjustmentsByRelatedOrderId, createInventoryAdjustment, updateInventoryAdjustment, deleteInventoryAdjustment } from "../controllers/InventoryAdjustmentController";
import { getInventoryItems, getInventoryItemById, getInventoryItemBySku, createInventoryItem, updateInventoryItem, deleteInventoryItem } from "../controllers/InventoryItemController";
import { getMenuItems, getMenuItemById, getMenuItemsByCategory, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/MenuItemController";
import { getOrderItems, getOrderItemById, getOrderItemsByOrderId, getOrderItemsByMenuItemId, createOrderItem, updateOrderItem, deleteOrderItem } from "../controllers/OrderItemController";
import { InventoryAdjustmentDTO } from "../dto/InventoryAdjustmentDTO";
import { InventoryItemDTO } from "../dto/InventoryItemDTO";
import { MenuItemDTO } from "../dto/MenuItemDTO";
import { OrderItemDTO } from "../dto/OrderItemDTO";

const router = Router();

// Customer routes
router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomerById);
router.post("/customer", validateDto(CustomerDTO), createCustomer);
router.put("/customer/:id", validateDto(CustomerDTO), updateCustomer);
router.delete("/customer/:id", deleteCustomer);

// Order routes
router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.get("/order/customer/:customer_id", getOrdersByCustomerId);
router.post("/order", validateDto(OrderDTO), createOrder);
router.put("/order/:id", validateDto(OrderDTO), updateOrder);
router.put("/order/:id/status", validateDto(OrderDTO), updateOrderStatus);
router.delete("/order/:id", deleteOrder);

// Payment routes
router.get("/payment", getPayments);
router.get("/payment/:id", getPaymentById);
router.get("/payment/order/:order_id", getPaymentsByOrderId);
router.get("/payment/status/:status", getPaymentsByStatus);
router.post("/payment", validateDto(PaymentDTO), createPayment);
router.put("/payment/:id", validateDto(PaymentDTO), updatePayment);
router.patch("/payment/:id/status", validateDto(PaymentDTO), updatePaymentStatus);
router.delete("/payment/:id", deletePayment);

// Menu item routes
router.get("/menuitem", getMenuItems);
router.get("/menuitem/:id", getMenuItemById);
router.get("/menuitem/category/:category", getMenuItemsByCategory);
router.post("/menuitem", validateDto(MenuItemDTO), createMenuItem);
router.put("/menuitem/:id", validateDto(MenuItemDTO), updateMenuItem);
router.delete("/menuitem/:id", deleteMenuItem);

// Inventory item routes
router.get("/inventoryitem", getInventoryItems);
router.get("/inventoryitem/:id", getInventoryItemById);
router.get("/inventoryitem/sku/:sku", getInventoryItemBySku);
router.post("/inventoryitem", validateDto(InventoryItemDTO), createInventoryItem);
router.put("/inventoryitem/:id", validateDto(InventoryItemDTO), updateInventoryItem);
router.delete("/inventoryitem/:id", deleteInventoryItem);

// Order item routes
router.get("/orderitem", getOrderItems);
router.get("/orderitem/:id", getOrderItemById);
router.get("/orderitem/order/:order_id", getOrderItemsByOrderId);
router.get("/orderitem/menuitem/:menu_item_id", getOrderItemsByMenuItemId);
router.post("/orderitem", validateDto(OrderItemDTO), createOrderItem);
router.put("/orderitem/:id", validateDto(OrderItemDTO), updateOrderItem);
router.delete("/orderitem/:id", deleteOrderItem);

// Inventory adjustment routes
router.get("/inventoryadjustment", getInventoryAdjustments);
router.get("/inventoryadjustment/:id", getInventoryAdjustmentById);
router.get("/inventoryadjustment/inventoryitem/:inventory_item_id", getInventoryAdjustmentsByInventoryItemId);
router.get("/inventoryadjustment/relatedorder/:related_order_id", getInventoryAdjustmentsByRelatedOrderId);
router.post("/inventoryadjustment", validateDto(InventoryAdjustmentDTO), createInventoryAdjustment);
router.put("/inventoryadjustment/:id", validateDto(InventoryAdjustmentDTO), updateInventoryAdjustment);
router.delete("/inventoryadjustment/:id", deleteInventoryAdjustment);

export default router;