import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { CreateQuestion } from "../../../../../types/questions";

export default function Details() {
  const form = useFormContext<CreateQuestion>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificuldade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma dificuldade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EASY">Fácil</SelectItem>
                        <SelectItem value="MEDIUM">Médio</SelectItem>
                        <SelectItem value="HARD">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Dificuldade aproximada da questão.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
