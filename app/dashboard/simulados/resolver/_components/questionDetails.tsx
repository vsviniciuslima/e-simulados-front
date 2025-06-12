import React from 'react';
import {
  BookOpen,
  Layers,
  Calendar,
  Tag,
  BadgeCheckIcon,
  BookCheck,
  Book,
  BadgeInfoIcon,
} from 'lucide-react';
import { Question } from '@/types/questions';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const QuestionDetails = ({ question }: { question: Question }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex space-x-1">
          {' '}
          <BadgeInfoIcon className="h-4 w-4" /> Detalhes da questão
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Detalhes da questão</DrawerTitle>
            <DrawerDescription>
              Informações detalhadas da questão
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-3 space-y-1">
            <div>
              {/* <h4 className="font-semibold scroll-m-20 my-1">
                Informações da Questão
              </h4> */}
              {question.discipline && (
                <div className="flex space-x-2 items-center">
                  <BookOpen className="w-5 h-5" />
                  <h4 className="font-semibold scroll-m-20">Disciplina</h4>
                  <p className="text-muted-foreground capitalize">
                    {question.discipline.name}
                  </p>
                </div>
              )}
              {question.topic && (
                <div className="flex space-x-2 items-center">
                  <Layers className="w-5 h-5" />
                  <h4 className="font-semibold scroll-m-20">Tópico</h4>
                  <p className="text-muted-foreground capitalize">
                    {question.topic.name}
                  </p>
                </div>
              )}
              <div className="flex my-1 space-x-2 items-center">
                <Tag className="w-5 h-5" />
                <h4 className="font-semibold scroll-m-20">Tags</h4>
                {question.tags?.map((tag) => (
                  <Badge variant={'outline'} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />
              {/* <h3 className="text-lg font-semibold">Status da Questão</h3> */}

              <div className="flex space-x-2 items-center">
                {true ? (
                  <>
                    <BookCheck className="w-5 h-5" />
                    <h4 className="font-semibold scroll-m-20">
                      Questão Oficial
                    </h4>
                    {question.year && (
                      <div className="flex space-x-2 items-center">
                        <Calendar className="w-5 h-5" />
                        <h4 className="font-semibold scroll-m-20">Ano</h4>
                        <p className="text-muted-foreground">{question.year}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Book className="w-5 h-5" />
                    <h4 className="font-semibold scroll-m-20">
                      Questão Simulada
                    </h4>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center">
                <BadgeCheckIcon className="w-5 h-5" />
                <h4 className="font-semibold scroll-m-20">Verificada</h4>
              </div>
              <Alert>
                <BadgeCheckIcon className="h-4 w-4" />
                <AlertTitle>Questão verificada</AlertTitle>
                <AlertDescription>
                  Essa questão foi verificada pelo E-Simulados!
                </AlertDescription>
              </Alert>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QuestionDetails;
