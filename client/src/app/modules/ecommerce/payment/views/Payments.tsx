import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useState } from "react";

import { useEffect } from "react";
import {
    PaymentsEmpty,
    PaymentsHeader,
    PaymentsList,
    PaymentsSkeleton,
} from "../components";
import { PaymentsRepository } from "../api/repository";

const Payments = () => {
    const { setBreadcrumbs } = useBreadcrumbs();
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Queries
    const { data: paymentsData, isLoading: paymentsLoading } =
        PaymentsRepository.usePayments();

    const payments = selectedStatus !== "all"
        ? paymentsData?.payments?.filter((payment: any) => payment.status === selectedStatus)
        : paymentsData?.payments;
    const isLoading = paymentsLoading;

    useEffect(() => {
        setBreadcrumbs([{ label: "Payments" }]);
    }, [setBreadcrumbs]);

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Filters */}
            <PaymentsHeader
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
            />

            {/* Payments Grid */}
            {isLoading ? (
                <PaymentsSkeleton />
            ) : (
                <PaymentsList payments={payments || []} />
            )}

            {!isLoading && payments?.length === 0 && <PaymentsEmpty />}
        </div>
    );
};

export default Payments;