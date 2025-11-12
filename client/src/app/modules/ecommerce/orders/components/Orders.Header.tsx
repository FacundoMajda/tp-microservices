import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { ShoppingBag } from "lucide-react";
import React from "react";

interface OrdersHeaderProps {
    selectedStatus: string;
    handleStatusChange: (status: string) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
    selectedStatus,
    handleStatusChange,
}) => {
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <ShoppingBag className="h-8 w-8" />
                    Órdenes
                </h1>
                <p className="text-muted-foreground">Gestiona tus pedidos</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="shipped">Enviado</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export { OrdersHeader };