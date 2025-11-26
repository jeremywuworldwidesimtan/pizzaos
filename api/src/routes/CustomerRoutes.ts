import { Router } from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomerController";
import { validateDto } from "../middleware/ValidateDTO";
import { CustomerDTO } from "../dto/CustomerDTO";

const router = Router();

router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomerById);
router.post("/customer", validateDto(CustomerDTO), createCustomer);
router.put("/customer/:id", validateDto(CustomerDTO), updateCustomer);
router.delete("/customer/:id", deleteCustomer);

export default router;