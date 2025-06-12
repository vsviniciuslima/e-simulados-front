import { Badge } from '@/components/ui/badge';
import { Exam } from '@/types/exams';
import { BookOpen, Calendar, ClipboardList, Layers, Tag } from 'lucide-react';

export function ExamDetails({ exam }: { exam: Exam }) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="px-1 py-1">
      <div className="my-1 px-2 flex flex-col space-y-2">
        <section>
          <div className="flex space-x-2 items-center">
            <ClipboardList className="w-5 h-5" />
            <h4 className="font-semibold scroll-m-20">Tipo</h4>
            <div className="text-muted-foreground">
              {capitalizeFirstLetter(exam.examType)}
            </div>
          </div>

          {exam.discipline && (
            <div className="flex space-x-2 items-center">
              <BookOpen className="w-5 h-5" />
              <h4 className="font-semibold scroll-m-20">Disciplina</h4>
              <p className="text-muted-foreground capitalize">
                {exam.discipline.name}
              </p>
            </div>
          )}
          {exam.topic && (
            <div className="flex space-x-2 items-center">
              <Layers className="w-5 h-5" />
              <h4 className="font-semibold scroll-m-20">Tópico</h4>
              <p className="text-muted-foreground capitalize">
                {exam.topic.name}
              </p>
            </div>
          )}
        </section>
        <section>
          {exam.year && (
            <div className="flex space-x-2 items-center">
              <Calendar className="w-5 h-5" />
              <h4 className="font-semibold scroll-m-20">Ano</h4>
              <p className="pl-2 text-muted-foreground">{exam.year}</p>
            </div>
          )}
        </section>
        <section>
          <div className="flex my-1 space-x-2 items-center">
            <Tag className="w-5 h-5" />
            <h4 className="font-semibold scroll-m-20">Tags</h4>
            {exam.tags?.map((tag) => {
              return (
                <Badge variant={'outline'} key={tag}>
                  {tag}
                </Badge>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
