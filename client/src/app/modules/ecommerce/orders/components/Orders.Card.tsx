import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../api/repository";

const OrdersCard: React.FC<{ order: Order }> = ({ order }) => {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'secondary';
            case 'confirmed': return 'default';
            case 'shipped': return 'outline';
            case 'delivered': return 'default';
            case 'cancelled': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <Card
            key={order.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/orders/${order.id}`)}
        >
            <CardHeader>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <CardDescription>
                    {new Date(order.createdAt).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold">${order.total}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                            Items: {order.items.length}
                        </p>
                    </div>
                </div>

                <Button className="w-full" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export { OrdersCard };