// Controller to handle HTTP requests related to Customers
import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";
import { CustomerDTO } from "../dto/CustomerDTO";

const CustomerServiceInstance = new CustomerService();

// GET customer/
export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await CustomerServiceInstance.getAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

// GET customer/:id
export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const customer = await CustomerServiceInstance.getById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

// POST customer/
export const createCustomer = async (req: Request, res: Response) => {
    try {
        const custDTO: CustomerDTO = req.body;
        const newCustomer = await CustomerServiceInstance.create(custDTO);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

// PUT customer/:id
export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const custDTO: Partial<CustomerDTO> = req.body;
        const updatedCustomer = await CustomerServiceInstance.update(id, custDTO);
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

// DELETE customer/:id
export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const success = await CustomerServiceInstance.delete(id);
        if (!success) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}