import { Package } from "lucide-react";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@/app/components/ui/empty";

const OrdersEmpty = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Package />
                </EmptyMedia>
                <EmptyTitle>No se encontraron órdenes</EmptyTitle>
                <EmptyDescription>
                    Aún no has realizado ningún pedido
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};

export { OrdersEmpty };