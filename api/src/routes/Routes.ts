import { Router } from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomerController";
import { validateDto } from "../middleware/ValidateDTO";
import { CustomerDTO } from "../dto/CustomerDTO";
import { getOrders, getOrderById, getOrdersByCustomerId, createOrder, updateOrder, updateOrderStatus, deleteOrder } from "../controllers/OrderController";
import { OrderDTO } from "../dto/OrderDTO";
import { getPayments, getPaymentById, createPayment, updatePayment, updatePaymentStatus, deletePayment, getPaymentsByOrderId, getPaymentsByStatus } from "../controllers/PaymentController";
import { PaymentDTO } from "../dto/PaymentDTO";

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

export default router;