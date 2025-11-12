import { Card, CardContent } from "@/app/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import React from "react";

interface DetailsInfoProps {
  description: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  returnPolicy?: string;
  shippingInformation?: string;
  weight?: number;
  warrantyInformation?: string;
}

// Small presentational component to keep the table markup separate
export const DetailsTable: React.FC<{
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
}> = ({ dimensions, weight }) => {
  return (
    <div className="xl:col-span-1">
      <h3 className="mb-2 font-semibold">Detalles del Producto:</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Propiedad</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dimensions != null && (
            <>
              <TableRow>
                <TableCell>Ancho</TableCell>
                <TableCell>{dimensions.width} cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alto</TableCell>
                <TableCell>{dimensions.height} cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Profundidad</TableCell>
                <TableCell>{dimensions.depth} cm</TableCell>
              </TableRow>
            </>
          )}
          {weight != null && (
            <TableRow>
              <TableCell>Peso</TableCell>
              <TableCell>{weight} kg</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const DetailsInfo: React.FC<DetailsInfoProps> = ({
  description,
  dimensions,
  returnPolicy,
  shippingInformation,
  weight,
  warrantyInformation,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6">
      <CardContent className="px-6 space-y-4">
        <div className="grid items-start gap-8 xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-2">
            <h3 className="mb-2 font-semibold">Description:</h3>
            <Collapsible>
              <CollapsibleTrigger className="underline text-sm text-primary">
                <Plus className="mr-2 inline-block h-4 w-4" />
                Show Description
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CollapsibleContent>
            </Collapsible>
            {(returnPolicy || shippingInformation || warrantyInformation) && (
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold">
                    Additional Information
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ChevronsUpDown />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="flex flex-col gap-2">
                  {returnPolicy && (
                    <div className="rounded-md border px-4 py-2 text-sm">
                      <strong>Return Policy:</strong> {returnPolicy}
                    </div>
                  )}
                  {shippingInformation && (
                    <div className="rounded-md border px-4 py-2 text-sm">
                      <strong>Shipping Information:</strong>{" "}
                      {shippingInformation}
                    </div>
                  )}
                  {warrantyInformation && (
                    <div className="rounded-md border px-4 py-2 text-sm">
                      <strong>Warranty Information:</strong>{" "}
                      {warrantyInformation}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
          <DetailsTable dimensions={dimensions} weight={weight} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsInfo;
