import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../models/Task/Task";
import { ComplexityLevelTask } from "../../models/Task/ComplexityLevelTask";

const initialStateTasks: Task[] = [
    {
        id: 1,
        title: 'Задача 1',
        description: 'Описание задачи 1',
        complexityLevel: ComplexityLevelTask.Easy,
        tags: 'структуры; алгоритмы',
        ioParams: [
            {
                inputData: 'Параметры на вход к первой задаче',        
                outputData: 'Результат на выходе к первой задаче',
            },
            {
              inputData: 'Параметры на вход - 2 - к первой задаче',        
              outputData: 'Результат на выходе - 2 - к первой задаче',
            }
          ]

    }, 
    {
        id: 2,
        title: 'Задача 2',
        description: 'Описание задачи 2',
        complexityLevel: ComplexityLevelTask.Hard,
        tags: 'массивы; данные; js',
        ioParams: [
          {
            inputData: 'Параметры на вход ко 2 задаче',        
            outputData: 'Результат на выходе ко 2 задаче',
          }
        ]
    },
    {
        id: 3,
        title: 'Задача 3',
        description: 'Описание задачи 3',
        complexityLevel: ComplexityLevelTask.Easy,
        tags: 'typescript; типы данных ts',
        ioParams: [
          {
              inputData: 'Параметры на вход к 3 задаче',        
              outputData: 'Результат на выходе к 3 задаче',
          },
          {
            inputData: 'Параметры на вход - 2 - к 3  задаче',        
            outputData: 'Результат на выходе - 2 к 3  задаче',
          },
          {
            inputData: 'Параметры на вход - 3 - к 3 задаче',        
            outputData: 'Результат на выходе - 3 к 3 задаче',
          }
        ]
    }, 
    {
        id: 4,
        title: 'Задача 4',
        description: 'Описание задачи 4',
        complexityLevel: ComplexityLevelTask.Hard,
        tags: '',
        ioParams: []
    }
];

const tasksAdapter = createEntityAdapter({
  selectId: (task:Task) => task.id,
  sortComparer: (a, b) => (a.title).localeCompare(b.title),
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState(
      {
        loading: 'idle',
      },
      initialStateTasks
  ),
  reducers: {
    addTask: tasksAdapter.addOne,
    setTask: tasksAdapter.setOne,
    updateTask: tasksAdapter.updateOne
  }
});

export const { addTask, setTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;