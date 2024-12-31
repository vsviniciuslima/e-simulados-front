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
import { CreateQuestion } from "../../../../../types/questions";
import Editor from "./editor";

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
            <Editor />
            {errors.statement && (
              <span className="text-sm text-red-500">
                {errors.statement.message}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
