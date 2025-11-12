import React from "react";
import type { Order } from "../api/repository";
import { OrdersCard } from "./Orders.Card";

const OrdersList: React.FC<{ orders: Order[] }> = ({ orders }) => {
    return (
        <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orders?.map((order) => (
                <OrdersCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export { OrdersList };