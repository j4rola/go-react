import {useState} from 'react'
import {useForm} from '@mantine/hooks'
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core'
import { ENDPOINT, Todo } from '../App'
import { KeyedMutator } from 'swr'

function AddTodo({mutate}: { mutate: KeyedMutator<Todo[]>}) {

    const [open, setOpen] = useState(false) 

    const form = useForm({
        initialValues: {
            title:'',
            body: ''
        }
        
    })

    async function createTodo (args: {title: string, body: string}) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json" 
                },
                body: JSON.stringify(args), 
            }).then((r) => r.json())

        mutate(updated)  
        form.reset()  
        setOpen(false)
    }

  return (
    <>
        <Modal opened={open} onClose={() => {setOpen(false)}} title="Create Todo">
            <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput required mb={12} label="Todo" placeholder='What do you want to do today?' {...form.getInputProps("title")}></TextInput>
                <Textarea required mb={12} label="Body" placeholder='Tell me more...' {...form.getInputProps("body")}></Textarea>
                <Button type="submit">Create Todo</Button>
            </form>
        
        </Modal> 
        <Group position="center">
            <Button fullWidth mb={12} onClick={()=>setOpen(true)}>Add Todo</Button>
        </Group>
    </> 
  )
}

export default AddTodo