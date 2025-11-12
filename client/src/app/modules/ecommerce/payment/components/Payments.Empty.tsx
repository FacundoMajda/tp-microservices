import { CreditCard } from "lucide-react";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@/app/components/ui/empty";

const PaymentsEmpty = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CreditCard />
                </EmptyMedia>
                <EmptyTitle>No se encontraron pagos</EmptyTitle>
                <EmptyDescription>
                    Aún no has realizado ningún pago
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};

export { PaymentsEmpty };