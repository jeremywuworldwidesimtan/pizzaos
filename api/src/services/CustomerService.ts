// Handle business logic

import { AppDataSource } from "../config/database";
import { CustomerDTO } from "../dto/CustomerDTO";
import { Customer } from "../entities/Customer";

export class CustomerService {
    private customerRepository = AppDataSource.getRepository(Customer);

    // Create customers
    async create(custDTO: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerRepository.create(custDTO);
        return await this.customerRepository.save(newCustomer);
    }

    // Get all customers
    async getAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }

    // Get cust by id
    async getById(id: number): Promise<Customer | null> {
        return await this.customerRepository.findOneBy({ id });
    }

    // Update cust
    async update(id: number, custDTO: Partial<CustomerDTO>): Promise<Customer | null> {
        const customer = await this.customerRepository.findOneBy({ id });
        if (!customer) {
            return null;
        }
        this.customerRepository.merge(customer, custDTO);
        return await this.customerRepository.save(customer);
    }

    // Delete cust
    async delete(id: number): Promise<boolean> {
        const result = await this.customerRepository.delete(id);
        return result.affected !== 0;
    }
}