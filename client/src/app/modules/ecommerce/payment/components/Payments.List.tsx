import React from "react";
import type { Payment } from "../api/repository";
import { PaymentsCard } from "./Payments.Card";

const PaymentsList: React.FC<{ payments: Payment[] }> = ({ payments }) => {
    return (
        <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {payments?.map((payment) => (
                <PaymentsCard key={payment.id} payment={payment} />
            ))}
        </div>
    );
};

export { PaymentsList };