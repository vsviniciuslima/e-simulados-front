import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function DashCards(){
    return(
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

        <Card className="sm:col-span-1" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-8">
          <CardTitle>Seus simulados</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Crie, compartilhe e responda simulados.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Criar simulado</Button>
        </CardFooter>
      </Card>

      <Card className="sm:col-span-1" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-8">
          <CardTitle>Adicione Questões</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Adicione questões e contribua com a comunidade.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Adicionar Questão</Button>
        </CardFooter>
      </Card>

      <Card className="sm:col-span-1" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-8">
          <CardTitle>Estatísticas </CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Compare seu desempenho e aprimore seus pontos fracos.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Estatísticas completas</Button>
        </CardFooter>
      </Card>
      </div>
    )
}