import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function Images() {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Imagens</CardTitle>
        <CardDescription>Adicione imagens à sua questão</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Upload</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
