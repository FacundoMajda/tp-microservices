import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useState } from "react";

import { useEffect } from "react";
import {
    OrdersEmpty,
    OrdersHeader,
    OrdersList,
    OrdersSkeleton,
} from "../components";
import { OrdersRepository } from "../api/repository";

const Orders = () => {
    const { setBreadcrumbs } = useBreadcrumbs();
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Queries
    const { data: ordersData, isLoading: ordersLoading } =
        OrdersRepository.useOrders();

    const orders = selectedStatus !== "all"
        ? ordersData?.orders?.filter(order => order.status === selectedStatus)
        : ordersData?.orders;
    const isLoading = ordersLoading;

    useEffect(() => {
        setBreadcrumbs([{ label: "Orders" }]);
    }, [setBreadcrumbs]);

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Filters */}
            <OrdersHeader
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
            />

            {/* Orders Grid */}
            {isLoading ? (
                <OrdersSkeleton />
            ) : (
                <OrdersList orders={orders || []} />
            )}

            {!isLoading && orders?.length === 0 && <OrdersEmpty />}
        </div>
    );
};

export default Orders;