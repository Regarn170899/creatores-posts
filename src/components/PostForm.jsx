import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";


const PostForm = ({create}) => {

    const [post,setPost]=useState({
        title:'',
        body:''
    })

    const addNewPost =(e)=>{
        e.preventDefault()
        const newPost={
            ...post,id:Date.now()
        }
        create(newPost)// Функиция которая позволяет возвращать значение в родительский компонент(новый пост)
        setPost({title:'', body:''})
    }


    return (
        <form action="">
            <MyInput
                value={post.title} // Передаём значение из useState
                onChange={e=>setPost({...post,title: e.target.value})} //Перезатераем с помощью setPost только выбранное поле
                type="text"
                placeholder={'Название поста'}
            />
            <MyInput
                type="text"
                placeholder={'Описание поста'}
                value={post.body} // Передаём значение из useState
                onChange={e=>setPost({...post,body: e.target.value})} //Перезатераем с помощью setPost только выбранное поле
            />
            <MyButton onClick={addNewPost} >Создать пост</MyButton>
        </form>
    );
};

export default PostForm;