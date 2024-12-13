import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Question } from "@/types/questions";
import { ListCollapse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { mapDifficulty } from "@/types/common";

export default function QuestionDetails({ question }: { question: Question }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhes da questão</SheetTitle>
            <SheetDescription>Veja os detalhes da questão</SheetDescription>
          </SheetHeader>
          <QuestionBody question={question} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Detalhes da questão</DrawerTitle>
          <DrawerDescription>Veja os detalhes da questão</DrawerDescription>
        </DrawerHeader>
        <QuestionBody question={question} />
        {/* <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}

export function QuestionBody({ question }: { question: Question }) {
  const mappedDifficulty = mapDifficulty(question.difficulty);
  const variant =
    mappedDifficulty === "Fácil"
      ? "success"
      : mappedDifficulty === "Médio"
      ? "warning"
      : "destructive";
  return (
    <div className="grid gap-4 p-4 md:p-0 md:my-4">
      <div className="flex space-x-2">
        <Badge>{question.discipline.name}</Badge>
        <Badge variant="outline">{question.topic.name}</Badge>
        <Badge variant={variant}>{mappedDifficulty}</Badge>
      </div>
      <div className="grid gap-2">
        <p className="text-sm">{question.statement}</p>
      </div>
    </div>
  );
}
