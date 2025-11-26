
import { Request, Response } from "express";
import { PaymentService, PaymentStatus } from "../services/PaymentService";

const PaymentServiceInstance = new PaymentService();

// GET payment/
export const getPayments = async (req: Request, res: Response) => {
    try {
        const payments = await PaymentServiceInstance.getAll();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
}

// GET payment/:id
export const getPaymentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const payment = await PaymentServiceInstance.getById(id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ message: "Payment not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
}

// GET payment/order/:order_id
export const getPaymentsByOrderId = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.order_id, 10);
        if (isNaN(orderId)) {
            res.status(400).json({ message: "Invalid order ID" });
            return;
        }
        const payments = await PaymentServiceInstance.getByOrderId(orderId);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// GET payment/status/:status
export const getPaymentsByStatus = async (req: Request, res: Response) => {
    try {
        const status = req.params.status as PaymentStatus;
        const payments = await PaymentServiceInstance.getByStatus(status);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// POST payment/
export const createPayment = async (req: Request, res: Response) => {
    try {
        const paymentData = req.body;
        const newPayment = await PaymentServiceInstance.create(paymentData);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// PUT payment/:id
export const updatePayment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const paymentData = req.body;
        const updatedPayment = await PaymentServiceInstance.update(id, paymentData);
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// PATCH payment/:id/status
export const updatePaymentStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const status = req.body.status as PaymentStatus;
        const updatedPayment = await PaymentServiceInstance.updateStatus(id, status);
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// DELETE payment/:id
export const deletePayment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await PaymentServiceInstance.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};