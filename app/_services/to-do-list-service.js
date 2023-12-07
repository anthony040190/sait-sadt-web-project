import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../_utils/firebase";

export const createToDoList = async (newToDoList) => {
    try {
        const docRef = await addDoc(collection(db, "toDoLists"), {
            title: newToDoList.title,
            description: newToDoList.description,
        });

        console.log(`New TodoList successfully created with ID: ${docRef.id}`);
    } catch (error) {
        console.error(`New ToDoList not able to add due to error: ${error}`);
    }
}

export const getToDoLists = async () => {
    const toDoListsArray = [];

    try {
        const q = collection(db, "toDoLists");
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(element => {
            toDoListsArray.push({...element.data(), id: element.id});
        });
    } catch (error) {
        console.error(`Error getting ToDoLists: ${error}`);
    }
    
    return toDoListsArray;
}

export const deleteToDoList = async (id) => {
    try {
        await deleteDoc(doc(db, "toDoLists", id));
        console.log(`ToDoList with ID: ${id} successfully deleted`);
    } catch (error) {
        console.error(`Error deleting ToDoList with ID: ${id} due to error: ${error}`);
    }
}