import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from 'lucide-react';

const TaskCard = ({ task, index }) => {
  let isEditing = false; // Placeholder for editing state

  return (
    <Card
      className={cn(
        'p-4 border-0 bg-gradient-card shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200 animate-fade-in group',
        task.status === 'complete' && ' opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* circular button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'flex-shrink-0 size-8 rounded-full transition-colors duration-200',
            task.status === 'complete'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          {task.status === 'complete' ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* task title or input field */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="What needs to be done?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'complete'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}

          {/* date */}
          <div className="flex items-center gap-2">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.completeAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completeAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* date */}
        <div className="flex items-center gap-2">
          <Calendar className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          {task.completeAt && (
            <>
              <span className="text-xs text-muted-foreground"> - </span>
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.completeAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>

        {/* edit button and delete button */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Edit button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-info"
          >
            <SquarePen className="size-4" />
          </Button>

          {/* Delete button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return <div>TaskCard</div>;
};

export default TaskCard;
