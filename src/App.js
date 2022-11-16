
import './App.css';
import {useMemo, useState} from "react";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {

    const [posts,setPosts]=useState([
        {id:1,title:'JavaScript',body:'Description'},
        {id:2,title:'JavaScript 2',body:'Description'},
        {id:3,title:'JavaScript 3',body:'Description'},
    ])

    const[selectedSort,setSelectedSort]=useState('')
    const[searchQuery,setSearchQuery]=useState('')

    const sortedPosts=useMemo(()=>{// В функции обязательно должно быть какое-то вычисление
        if (selectedSort){
            return [...posts].sort((a,b)=>a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    },[selectedSort,posts])//Массив зависимостей,если хоть одно из значений меняется функция выше срабатывает

    const sortedAndSearchedPosts=useMemo(()=>{
        return sortedPosts.filter(post=>post.title.toLowerCase().includes(searchQuery))
    },[searchQuery,sortedPosts])

    const createPost=(newPost)=>{
       setPosts([...posts,newPost])
    }

    const removePost=(post)=>{
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const sortPost = (sort) => {
      setSelectedSort(sort);
      setPosts([...posts].sort((a,b)=>a[sort].localeCompare(b[sort])))
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin:'15px 0'}}/>
        <div>
            <MyInput
                plaseholder={'Поиск...'}
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
            />
            <MySelect value={selectedSort} onChange={sortPost} defaultValue={'Сортировка'} options={[
                {value:'title',name:'По назвнаию'},
                {value:'body',name:'По описанию'}
            ]}/>
        </div>
        {sortedAndSearchedPosts.length
            ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов 1'} />
            : <h1 style={{textAlign:'center'}}> Посты не найдены</h1>
        }
    </div>
  );
}

export default App;
