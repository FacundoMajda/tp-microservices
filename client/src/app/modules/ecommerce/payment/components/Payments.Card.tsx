import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { CreditCard } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Payment } from "../api/repository";

const PaymentsCard: React.FC<{ payment: Payment }> = ({ payment }) => {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'secondary';
            case 'completed': return 'default';
            case 'failed': return 'destructive';
            case 'refunded': return 'outline';
            default: return 'secondary';
        }
    };

    return (
        <Card
            key={payment.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/payments/${payment.id}`)}
        >
            <CardHeader>
                <CardTitle className="text-lg">Payment #{payment.id}</CardTitle>
                <CardDescription>
                    Order #{payment.orderId}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold">${payment.amount}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                            {payment.method}
                        </p>
                    </div>
                </div>

                <Button className="w-full" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export { PaymentsCard };