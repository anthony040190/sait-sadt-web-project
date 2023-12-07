"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, CardActions } from '@mui/material';
import { createToDoList, getToDoLists, deleteToDoList } from '../_services/to-do-list-service';

export default function TodoList() {
    const [toDoLists, setToDoLists] = useState([]);
    const [newTask, setNewTask] = useState({title: '', description: ''});

    const addTask = async () => {
        await createToDoList(newTask);
        setNewTask({title: '', description: ''});
    };

    const loadToDoLists = async () => {
        try {
            const toDoListsArray = await getToDoLists();
            setToDoLists(toDoListsArray);
        } catch (error) {
            console.error(`Error getting ToDoLists: ${error}`);
        }
        
    };


    useEffect(() => {
        loadToDoLists();
    }, [toDoLists]);

    return (
        <div className='bg-slate-400 p-3'>
            <div className='mb-4'>
                <TextField 
                    id="outlined-basic" 
                    label="New Task" 
                    variant="outlined" 
                    onChange={(e) => setNewTask({...newTask, title: e.target.value} )}
                    value={newTask.title}
                    fullWidth
                    required
                />
            </div>

            <div className='mb-4'>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Multiline"
                    multiline
                    value={newTask.description}
                    onChange={(e) => { setNewTask({...newTask, description: e.target.value}) }}
                    fullWidth
                    required
                />
            </div>

            <div className='mb-4'>
                <Button 
                    variant="contained"
                    onClick={addTask}
                    fullWidth
                    sx={{ padding: 2 }}
                >
                    Add To Do
                </Button>
            </div>
            
            

            
            {
            toDoLists.map((toDoList, id) => {
                return (
                    <Card key={id} sx={{ minWidth: 275, marginBottom: 1 }} >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {toDoList.title}
                            </Typography>

                            <Typography variant="body2">
                                {toDoList.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => { deleteToDoList(toDoList.id) }} size="small">Delete</Button>
                        </CardActions>
                    </Card>
                )
            
            })
            }

    




        </div>
    );
};