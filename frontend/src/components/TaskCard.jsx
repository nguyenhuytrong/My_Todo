import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import api from '@/lib/axios'; // hoặc đường dẫn tới file axios.js
import { toast } from 'sonner';
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from 'lucide-react';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success(`Task deleted successfully!`);
      handleTaskChanged();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again later.');
    }
  };

  const updateTask = async () => {
    if (updateTaskTitle.trim()) {
      try {
        setIsEditing(false);
        await api.put(`/tasks/${task._id}`, {
          title: updateTaskTitle,
        });
        toast.success(`Task updated successfully!`);
        handleTaskChanged();
      } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Failed to update task. Please try again later.');
      }
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === 'active') {
        await api.put(`/tasks/${task._id}`, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        });

        toast.success(`Task marked as complete!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completedAt: null,
        });
        toast.success(`Task marked as active!`);
      }

      handleTaskChanged();
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast.error('Failed to toggle task completion. Please try again later.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        'p-4 border-0 bg-gradient-card shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200 animate-fade-in group',
        task.status === 'completed' && ' opacity-75'
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
            task.status === 'completed'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === 'completed' ? (
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
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || '');
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'completed'
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
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* edit button and delete button */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Edit button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || '');
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* Delete button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
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
