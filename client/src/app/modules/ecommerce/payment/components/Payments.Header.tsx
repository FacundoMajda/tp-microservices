import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { CreditCard } from "lucide-react";
import React from "react";

interface PaymentsHeaderProps {
    selectedStatus: string;
    handleStatusChange: (status: string) => void;
}

const PaymentsHeader: React.FC<PaymentsHeaderProps> = ({
    selectedStatus,
    handleStatusChange,
}) => {
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <CreditCard className="h-8 w-8" />
                    Pagos
                </h1>
                <p className="text-muted-foreground">Gestiona tus pagos</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                        <SelectItem value="failed">Fallido</SelectItem>
                        <SelectItem value="refunded">Reembolsado</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export { PaymentsHeader };