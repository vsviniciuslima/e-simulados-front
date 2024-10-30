import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { CreateQuestion } from "../formSchema";

export default function MainInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateQuestion>();

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Informações principais</CardTitle>
        <CardDescription>Informações básicas da questão.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="statement">Enunciado</Label>
            <Input
              id="statement"
              type="text"
              className="w-full"
              placeholder="Enunciado da questão"
              {...register("statement")}
            />
            {errors.statement && (
              <span className="text-sm text-red-500">
                {errors.statement.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              {...register("description")}
              id="description"
              placeholder="Descrição detalhada da questão"
              className="min-h-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
