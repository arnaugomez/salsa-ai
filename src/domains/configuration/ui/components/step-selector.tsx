'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DanceStep, DanceCourse } from '@/domains/dance/domain/entities';
import { courseRepository, stepRepository } from '@/domains/dance/data/repositories';

interface StepSelectorProps {
  selectedSteps: string[];
  danceType: string;
  mode: string;
  onStepsChange: (selectedSteps: string[]) => void;
}

export function StepSelector({
  selectedSteps,
  danceType,
  mode,
  onStepsChange
}: StepSelectorProps) {
  // State for courses and steps
  const [courses, setCourses] = useState<DanceCourse[]>([]);
  const [stepsByCourse, setStepsByCourse] = useState<Record<string, DanceStep[]>>({});
  
  // Load courses and steps on mount or when dance type or mode changes
  useEffect(() => {
    // Get courses for the selected dance type
    const danceCourses = courseRepository.getByDanceType(danceType);
    setCourses(danceCourses);
    
    // Get steps for each course
    const stepsMap: Record<string, DanceStep[]> = {};
    danceCourses.forEach(course => {
      const courseSteps = courseRepository.getStepsForCourseByDanceAndMode(
        course.id,
        danceType,
        mode
      );
      stepsMap[course.id] = courseSteps;
    });
    
    setStepsByCourse(stepsMap);
  }, [danceType, mode]);
  
  // Handle step selection change
  const handleStepChange = (stepId: string, checked: boolean) => {
    if (checked) {
      // Add step to selected steps
      onStepsChange([...selectedSteps, stepId]);
    } else {
      // Remove step from selected steps
      onStepsChange(selectedSteps.filter(id => id !== stepId));
    }
  };
  
  // Handle select all steps in a course
  const handleSelectAllCourse = (courseId: string, checked: boolean) => {
    const courseSteps = stepsByCourse[courseId] || [];
    const courseStepIds = courseSteps.map(step => step.id);
    
    if (checked) {
      // Add all course steps to selected steps
      const newSelectedSteps = [...selectedSteps];
      courseStepIds.forEach(stepId => {
        if (!newSelectedSteps.includes(stepId)) {
          newSelectedSteps.push(stepId);
        }
      });
      onStepsChange(newSelectedSteps);
    } else {
      // Remove all course steps from selected steps
      onStepsChange(selectedSteps.filter(id => !courseStepIds.includes(id)));
    }
  };
  
  // Check if all steps in a course are selected
  const isAllCourseSelected = (courseId: string) => {
    const courseSteps = stepsByCourse[courseId] || [];
    return courseSteps.every(step => selectedSteps.includes(step.id));
  };
  
  // Check if some steps in a course are selected
  const isSomeCourseSelected = (courseId: string) => {
    const courseSteps = stepsByCourse[courseId] || [];
    return courseSteps.some(step => selectedSteps.includes(step.id)) && 
           !isAllCourseSelected(courseId);
  };
  
  return (
    <div className="space-y-6">
      {courses.map(course => (
        <Card key={course.id}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`course-${course.id}`}
                checked={isAllCourseSelected(course.id)}
                indeterminate={isSomeCourseSelected(course.id)}
                onCheckedChange={(checked) => 
                  handleSelectAllCourse(course.id, checked === true)
                }
              />
              <Label 
                htmlFor={`course-${course.id}`}
                className="text-lg font-semibold cursor-pointer"
              >
                {course.name}
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(stepsByCourse[course.id] || []).map(step => (
                <div key={step.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`step-${step.id}`}
                    checked={selectedSteps.includes(step.id)}
                    onCheckedChange={(checked) => 
                      handleStepChange(step.id, checked === true)
                    }
                  />
                  <Label 
                    htmlFor={`step-${step.id}`}
                    className="cursor-pointer"
                  >
                    {step.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
