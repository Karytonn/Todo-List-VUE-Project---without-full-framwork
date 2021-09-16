import { createApp } from 'vue';
import Todos from './api/todos'
import './assets/css/main.css'


const apiTodos = new Todos();

const app = createApp({
    data() {
        return {
            title: "Todo List",
            todos: [],
            form: {
                text: '',
                done: false
            }
        }
    },
    created() {
        this.fatchTodos();
    },
    methods: {
        async fatchTodos() {
            try {
                this.todos = await apiTodos.index();
            } catch (error) {
                console.warn(error);
            }
        },
        async createTodo() {
            try {
                const data = await apiTodos.store(this.form);
                this.todos.push(data);
                this.form = { text: '', done: false };
            } catch (error) {
                console.warn(error);
            }
        },
        async toggleTodoStatus(todo) {
            try {
                //Update API
                const data = await apiTodos.update({
                    ...todo,
                    done: !todo.done
                })
                // Check which index received an update
                const index = this.todos.findIndex(({ id }) => id === data.id);

                // Update todos local array
                this.todos[index] = data;
            } catch (error) {
                console.warn(error);
            }

        },
        async deleteTodo(id) {
            try {
                //Update API
                await apiTodos.delete({ id });

                //Check which index was removed and update local array
                const index = this.todos.findIndex((todo) => todo.id === id);
                this.todos.splice(index, 1);
            } catch (error) {
                console.warn(error);
            }
        }
    },
});

app.mount('#app');



// async function exec() {

//     const todos = new Todos();

//     const response = await todos.index();
//     console.log(response);

//     // const response = await todos.store({text: "teste", done: false});

//     // const response = await todos.update({
//     //     id: 1,
//     //     text: "lavar roupas", 
//     //     done: false
//     // });

//     // const response = await todos.delete({id: 1});


// }

// exec();