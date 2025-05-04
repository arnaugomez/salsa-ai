"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  courseRepository,
  danceRepository,
} from "@/domains/dance/data/repositories";
import {
  Dance,
  DanceCourse,
  DanceMode,
  DanceStep,
  getDanceDisplayName,
  getDanceModeDisplayName,
} from "@/domains/dance/domain/entities";
import { useEffect, useState } from "react";

interface StepSelectorProps {
  selectedSteps: string[];
  danceType: string; // Kept for backward compatibility
  mode: string; // Kept for backward compatibility
  onStepsChange: (selectedSteps: string[]) => void;
}

// Interface for grouped steps structure
interface GroupedSteps {
  [danceId: string]: {
    dance: Dance;
    modes: {
      [modeId: string]: {
        mode: DanceMode;
        courses: {
          [courseId: string]: {
            course: DanceCourse;
            steps: DanceStep[];
          };
        };
      };
    };
  };
}

export function StepSelector({
  selectedSteps,
  onStepsChange,
}: StepSelectorProps) {
  // State for grouped steps
  const [groupedSteps, setGroupedSteps] = useState<GroupedSteps>({});
  const [dances, setDances] = useState<Dance[]>([]);

  // Load dances, modes, courses and steps on mount
  useEffect(() => {
    // Get all dances
    const allDances = danceRepository.getAllDances();
    setDances(allDances);

    // Create grouped structure
    const grouped: GroupedSteps = {};

    // For each dance
    allDances.forEach((dance) => {
      grouped[dance.id] = {
        dance,
        modes: {},
      };

      // Get available modes for this dance
      const danceModes = danceRepository.getModesForDance(dance.id);

      // For each mode
      danceModes.forEach((danceMode) => {
        grouped[dance.id].modes[danceMode.id] = {
          mode: danceMode,
          courses: {},
        };

        // Get courses for this dance
        const danceCourses = courseRepository.getByDanceType(dance.id);

        // For each course
        danceCourses.forEach((course) => {
          // Get steps for this course, dance, and mode
          const courseSteps = courseRepository.getStepsForCourseByDanceAndMode(
            course.id,
            dance.id,
            danceMode.id
          );

          // Only add if there are steps
          if (courseSteps.length > 0) {
            grouped[dance.id].modes[danceMode.id].courses[course.id] = {
              course,
              steps: courseSteps,
            };
          }
        });
      });
    });

    setGroupedSteps(grouped);
  }, []);

  // Handle step selection change
  const handleStepChange = (stepId: string, checked: boolean) => {
    if (checked) {
      // Add step to selected steps
      onStepsChange([...selectedSteps, stepId]);
    } else {
      // Remove step from selected steps
      onStepsChange(selectedSteps.filter((id) => id !== stepId));
    }
  };

  // Handle select all steps in a course
  const handleSelectAllCourse = (
    courseSteps: DanceStep[],
    checked: boolean
  ) => {
    const courseStepIds = courseSteps.map((step) => step.id);

    if (checked) {
      // Add all course steps to selected steps
      const newSelectedSteps = [...selectedSteps];
      courseStepIds.forEach((stepId) => {
        if (!newSelectedSteps.includes(stepId)) {
          newSelectedSteps.push(stepId);
        }
      });
      onStepsChange(newSelectedSteps);
    } else {
      // Remove all course steps from selected steps
      onStepsChange(selectedSteps.filter((id) => !courseStepIds.includes(id)));
    }
  };

  // Handle select all steps in a mode
  const handleSelectAllMode = (modeSteps: DanceStep[], checked: boolean) => {
    const modeStepIds = modeSteps.map((step) => step.id);

    if (checked) {
      // Add all mode steps to selected steps
      const newSelectedSteps = [...selectedSteps];
      modeStepIds.forEach((stepId) => {
        if (!newSelectedSteps.includes(stepId)) {
          newSelectedSteps.push(stepId);
        }
      });
      onStepsChange(newSelectedSteps);
    } else {
      // Remove all mode steps from selected steps
      onStepsChange(selectedSteps.filter((id) => !modeStepIds.includes(id)));
    }
  };

  // Handle select all steps in a dance
  const handleSelectAllDance = (danceSteps: DanceStep[], checked: boolean) => {
    const danceStepIds = danceSteps.map((step) => step.id);

    if (checked) {
      // Add all dance steps to selected steps
      const newSelectedSteps = [...selectedSteps];
      danceStepIds.forEach((stepId) => {
        if (!newSelectedSteps.includes(stepId)) {
          newSelectedSteps.push(stepId);
        }
      });
      onStepsChange(newSelectedSteps);
    } else {
      // Remove all dance steps from selected steps
      onStepsChange(selectedSteps.filter((id) => !danceStepIds.includes(id)));
    }
  };

  // Check if all steps in a group are selected
  const areAllStepsSelected = (steps: DanceStep[]) => {
    return (
      steps.length > 0 && steps.every((step) => selectedSteps.includes(step.id))
    );
  };

  // Check if some steps in a group are selected
  const areSomeStepsSelected = (steps: DanceStep[]) => {
    return (
      steps.some((step) => selectedSteps.includes(step.id)) &&
      !areAllStepsSelected(steps)
    );
  };

  // Get all steps for a dance
  const getAllStepsForDance = (danceId: string): DanceStep[] => {
    const dance = groupedSteps[danceId];
    if (!dance) return [];

    const allSteps: DanceStep[] = [];

    Object.values(dance.modes).forEach((modeData) => {
      Object.values(modeData.courses).forEach((courseData) => {
        allSteps.push(...courseData.steps);
      });
    });

    return allSteps;
  };

  // Get all steps for a mode
  const getAllStepsForMode = (danceId: string, modeId: string): DanceStep[] => {
    const dance = groupedSteps[danceId];
    if (!dance) return [];

    const mode = dance.modes[modeId];
    if (!mode) return [];

    const allSteps: DanceStep[] = [];

    Object.values(mode.courses).forEach((courseData) => {
      allSteps.push(...courseData.steps);
    });

    return allSteps;
  };

  return (
    <div className="space-y-8">
      {/* Dance Groups */}
      {dances.map((dance) => {
        const danceData = groupedSteps[dance.id];
        if (!danceData) return null;

        const allDanceSteps = getAllStepsForDance(dance.id);
        if (allDanceSteps.length === 0) return null;

        return (
          <Card key={dance.id} className="border-amber-200 pt-0 overflow-hidden">
            <CardHeader className="bg-amber-50 pt-4 pb-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`dance-${dance.id}`}
                  checked={
                    areSomeStepsSelected(allDanceSteps)
                      ? "indeterminate"
                      : areAllStepsSelected(allDanceSteps)
                  }
                  onCheckedChange={(checked) =>
                    handleSelectAllDance(allDanceSteps, checked === true)
                  }
                />
                <Label
                  htmlFor={`dance-${dance.id}`}
                  className="text-xl font-bold cursor-pointer text-amber-800"
                >
                  {getDanceDisplayName(dance)}
                </Label>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Mode Groups */}
                {Object.values(danceData.modes).map((modeData) => {
                  const allModeSteps = getAllStepsForMode(
                    dance.id,
                    modeData.mode.id
                  );
                  if (allModeSteps.length === 0) return null;

                  return (
                    <Card
                      key={`${dance.id}-${modeData.mode.id}`}
                      className="border-lime-200 pt-0 overflow-hidden"
                    >
                      <CardHeader className="bg-lime-50">
                        <div className="flex items-center space-x-2 pt-3 pb-2">
                          <Checkbox
                            id={`mode-${dance.id}-${modeData.mode.id}`}
                            checked={
                              areSomeStepsSelected(allModeSteps)
                                ? "indeterminate"
                                : areAllStepsSelected(allModeSteps)
                            }
                            onCheckedChange={(checked) =>
                              handleSelectAllMode(
                                allModeSteps,
                                checked === true
                              )
                            }
                          />
                          <Label
                            htmlFor={`mode-${dance.id}-${modeData.mode.id}`}
                            className="text-lg font-semibold cursor-pointer text-lime-800"
                          >
                            {getDanceModeDisplayName(modeData.mode)}
                          </Label>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          {/* Course Groups */}
                          {Object.values(modeData.courses).map((courseData) => (
                            <Card
                              key={`${dance.id}-${modeData.mode.id}-${courseData.course.id}`}
                              className="border-orange-200 pt-0 overflow-hidden"
                            >
                              <CardHeader className="bg-orange-50 pt-3 pb-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`course-${dance.id}-${modeData.mode.id}-${courseData.course.id}`}
                                    checked={
                                      areSomeStepsSelected(courseData.steps)
                                        ? "indeterminate"
                                        : areAllStepsSelected(courseData.steps)
                                    }
                                    onCheckedChange={(checked) =>
                                      handleSelectAllCourse(
                                        courseData.steps,
                                        checked === true
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor={`course-${dance.id}-${modeData.mode.id}-${courseData.course.id}`}
                                    className="text-md font-medium cursor-pointer text-orange-800"
                                  >
                                    {courseData.course.name}
                                  </Label>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {courseData.steps.map((step) => (
                                    <div
                                      key={step.id}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`step-${step.id}`}
                                        checked={selectedSteps.includes(
                                          step.id
                                        )}
                                        onCheckedChange={(checked) =>
                                          handleStepChange(
                                            step.id,
                                            checked === true
                                          )
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
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
