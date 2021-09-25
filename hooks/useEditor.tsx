import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

let BraftEditor: any = dynamic(() => import('braft-editor').then((module: any) => {
    BraftEditor = module.default
    return BraftEditor
}), {
    ssr: false // 禁用服务端渲染
})
import 'braft-editor/dist/index.css'
import dynamic from "next/dynamic";

type useEditorOptions = {
    title?: string,
    content?: string,
    method: 'get' | 'post' | 'patch',
    path: string,
    id?: number
}
export const useEditor = (options: useEditorOptions) => {
    const [editorValue, setEditorValue] = useState<any>(null)
    const [title, setTitle] = useState('')
    useEffect(() => {
        if (options.title && options.content) {
            setTimeout(() => {
                setEditorValue(BraftEditor.createEditorState(options.content))
                setTitle(options.title)
            }, 1000)
        }
    }, [])
    /*
        const submitContent = async (content: any) => {
            window.localStorage.setItem('newBlogContent', content.toHTML())
            window.localStorage.setItem('newBlogTitle', title)
            window.alert('保存成功')
        }
    */
    const release = async () => {
        if (title.trim() === '') {
            window.alert('标题不能为空')
            return
        }
        await axios[options.method](options.path, {
            title: title,
            content: editorValue.toHTML(),
            id: options.id
        }).then(() => {
            /*
                        window.localStorage.removeItem('newBlogContent')
                        window.localStorage.removeItem('newBlogTitle')
            */
            window.alert('发布成功')
            window.location.href = '/posts'
        }, error => {
            if (error.response) {
                const response: AxiosResponse = error.response;
                if (response.status === 422) {
                    //...
                    console.log(response);
                } else if (response.status === 401) {
                    window.alert('请先登录')
                }
            }
        })
    }
    const onChangeContent = (content: any) => {
        setEditorValue(content)
    }
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const Editor = <>
        <div>
            <div className="title">
                <input type="text" value={title} onChange={onTitleChange} placeholder='请输入文章标题'/>
                <button className='submit' onClick={release}>发布</button>
            </div>
            <BraftEditor
                value={editorValue}
                onChange={onChangeContent}
                onSave={() => {
                }}
            />
            <style jsx>{`
                .title > .submit {
                  border: none;
                  line-height: 30px;
                  border-radius: 8px;
                  background: #198;
                  color: #fff;
                  padding: 2px 20px;
                }
                .title {
                  padding: 10px 20px;
                  display: flex;
                  align-items: center;
                
                }
                .title > input {
                  border: 1px solid #198;
                  flex-grow: 1;
                  padding: 10px 18px;
                  border-radius: 6px;
                  margin-right: 2em;
                }
                

            `}</style>

        </div>
    </>
    return {Editor}
}