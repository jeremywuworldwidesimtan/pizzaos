import { Router } from "express";
import { getOrders, getOrderById, getOrdersByCustomerId, createOrder, updateOrder, updateOrderStatus, deleteOrder } from "../controllers/OrderController";
import { validateDto } from "../middleware/ValidateDTO";
import { OrderDTO } from "../dto/OrderDTO";


const router = Router();

router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.get("/order/customer/:customer_id", getOrdersByCustomerId);
router.post("/order", validateDto(OrderDTO), createOrder);
router.put("/order/:id", validateDto(OrderDTO), updateOrder);
router.put("/order/:id/status", validateDto(OrderDTO), updateOrderStatus);
router.delete("/order/:id", deleteOrder);

export default router;