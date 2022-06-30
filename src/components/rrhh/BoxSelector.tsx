import { Autocomplete, TabClassKey, TextField } from '@mui/material'
import React from 'react'
import { useProject } from '../../services/projects';
import { Options, Project, Task } from '../../services/types'
import { zeroPad } from '../../util/util';
import AutoComplete from '../common/AutoComplete'

export default function BoxSelector(props:{options:Project[],label:string}) {
    
    const [projectValue, setProjetc] = React.useState<Project | null>();
    const [inputValue, setInputValue] = React.useState('');
    const [tasks,setTasks] = React.useState<Task[] | null>();

    const { project, error, loading, mutate } = useProject((projectValue?.id ?? null) as unknown as string);
    //setTasks(project?.tasks ?? [])
    {project && console.log(project.tasks ?? []);}
    return (
        <>
        <div style={{display: 'flex',gap: '20px'}}>
            <Autocomplete
                id="controllable-states-demo"
                value={projectValue}
                options={props.options}
                onChange={(event: any, newProject: Project | null) => {
                    setProjetc(newProject);
                } }
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                } }
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Proyectos" />}
                getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option.name} />
            <TasksBox tasks={project?.tasks ?? []}/>
        </div>
        </>
      );

/*
    const [open, setOpen] = React.useState(false);
    let proyectId
  return (
    <div>
        <Autocomplete 
        id="controllable-states-demo"
        renderInput={(params) => (
            <TextField {...params} variant="standard" label={props.label} />
          )}
        options={props.options}
        getOptionLabel={(option) => option.name}
        fullWidth
        
        onChange={(_, value) => proyectId = value?.id}
        />
    </div>
    
  )*/
};

function TasksBox(props: {tasks:Task[] | null | undefined}) {
    
    const [task, setProjetc] = React.useState<Task | null| undefined>();
    const [inputValue, setInputValue] = React.useState('');
    
    return(
    <div>
    <Autocomplete
            id="controllable-states-demo"
            value={task}
            disabled = {(props.tasks?.length === 0)? true: false}
            options={props.tasks as Task[]}
            onChange={(event: any, newTask: Task | null | undefined) => {
                setProjetc(newTask);
            } }
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            } }
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tareas"  />}
            getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option.name} />
    </div>);
}
