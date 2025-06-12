import { Button } from '@/components/ui/button';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { Book, ChevronsDown, ChevronsUp } from 'lucide-react';

interface CollapsibleHeaderProps {
  examName: string;
  isCollapsibleOpen: boolean;
  toggleCollapsible: () => void;
}

const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
  examName,
  isCollapsibleOpen,
  toggleCollapsible,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="px-1 flex space-x-1">
        <div className="flex items-center">
          <Book className="w-5 h-5" />
        </div>
        <p>Detalhes do simulado</p>
      </div>
      <div className="flex space-x-2">
        <CollapsibleTrigger asChild>
          <div onClick={toggleCollapsible}>
            <CollapsibleToggleButton isOpen={isCollapsibleOpen} />
          </div>
        </CollapsibleTrigger>
      </div>
    </div>
  );
};

interface CollapsibleToggleButtonProps {
  isOpen: boolean;
}

const CollapsibleToggleButton: React.FC<CollapsibleToggleButtonProps> = ({
  isOpen,
}) => {
  return (
    <Button variant="ghost" size="sm" type="button">
      <div
        className={`transition-transform duration-300 transform ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <ChevronsDown className="h-4 w-4" />
      </div>
      <span className="sr-only">Toggle</span>
    </Button>
  );
};

export default CollapsibleHeader;
