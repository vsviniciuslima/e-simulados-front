import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateQuestion } from "../formSchema";

const subcategoriesMap: Record<
  string,
  Array<{ value: string; label: string }>
> = {
  human_science: [
    { value: "brazil_history", label: "História do Brasil" },
    { value: "world_history", label: "História Mundial" },
  ],
  exact_science: [{ value: "trigonometry", label: "Trigonometria" }],
  biological_science: [],
};

export default function Categories() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CreateQuestion>();

  const selectedCategory = watch("category");

  // Reset subcategory when category changes
  const handleCategoryChange = (value: string) => {
    setValue("category", value);
    setValue("subcategory", "");
  };

  const availableSubcategories = selectedCategory
    ? subcategoriesMap[selectedCategory]
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias da questão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="category">Categoria</Label>
            <Select
              onValueChange={handleCategoryChange}
              value={selectedCategory}
              {...register("category")}
            >
              <SelectTrigger id="category" aria-label="Selecione uma categoria">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human_science">Ciências Humanas</SelectItem>
                <SelectItem value="exact_science">Ciências Exatas</SelectItem>
                <SelectItem value="biological_science">
                  Ciências Biológicas
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="subcategory">Subcategoria (opcional)</Label>
            <Select
              onValueChange={(value) => setValue("subcategory", value)}
              value={watch("subcategory")}
              disabled={!selectedCategory}
              {...register("subcategory")}
            >
              <SelectTrigger
                id="subcategory"
                aria-label="Selecione uma subcategoria"
              >
                <SelectValue placeholder="Selecione uma subcategoria" />
              </SelectTrigger>
              <SelectContent>
                {availableSubcategories.map((sub) => (
                  <SelectItem key={sub.value} value={sub.value}>
                    {sub.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
