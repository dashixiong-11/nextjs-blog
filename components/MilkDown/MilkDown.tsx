import {ReactEditor, useEditor} from "@milkdown/react";
import React, {FunctionComponent, useRef, useState} from "react";
import {Editor, editorViewCtx, rootCtx, serializerCtx, defaultValueCtx, editorViewOptionsCtx} from "@milkdown/core";
import {nordLight} from "@milkdown/theme-nord";
import {commonmark} from "@milkdown/preset-commonmark";
import {slash} from '@milkdown/plugin-slash';
import {history} from "@milkdown/plugin-history";
import axios, {AxiosResponse} from "axios";

type Props = {
    id?: string,
    defaultContent?: string,
    readOnly?: Boolean,
    defaultTitle?: string
}
export const MilkDown: FunctionComponent<Props> = ({id, defaultContent, defaultTitle, readOnly}) => {
    const [title, setTitle] = useState(defaultTitle)
    const ref = useRef<any>({})

    const editor = useEditor((root) =>
        Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, defaultContent);
                ctx.set(editorViewOptionsCtx, {editable: () => !readOnly});
            })
            .use(nordLight)
            .use(commonmark).use(history).use(slash)
    );


    const getMarkdown = () => {
        return ref.current.get().action((ctx: any) => {
            const editorView = ctx.get(editorViewCtx);
            const serializer = ctx.get(serializerCtx);
            return serializer(editorView.state.doc);
        });
    }
    const release = async () => {
        const content = getMarkdown()
        if (title.trim() === '') {
            window.alert('标题不能为空')
            return
        }
        await axios.post('/api/v1/posts', {
            title: title,
            content: content,
            id: id
        }).then(() => {
            window.alert('发布成功')
            // window.location.href = '/posts'
        }, error => {
            if (error.response) {
                const response: AxiosResponse = error.response;
                if (response.status === 422) {
                    console.log(response);
                } else if (response.status === 401) {
                    window.alert('请先登录')
                }
            }
        })
    }
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    // @ts-ignore
    return <div className='editor-view'>
        {readOnly ?
            <h1>{title}</h1> :
            <div className="title">
                <input type="text" value={title} onChange={onTitleChange} placeholder='请输入文章标题'/>
                <button className='submit' onClick={release}>发布</button>
            </div>
        }
        <ReactEditor  ref={ref} editor={editor}/>
        <style jsx>{`
                .editor-view {
                  display: flex;
                  flex-direction: column;
                  padding: 20px 10%;
                  //background: #1e2931;
                }
                  .milkdown {
                    box-shadow: none;
                  }
                .title > .submit {
                  border: none;
                  line-height: 30px;
                  border-radius: 8px;
                  background: #198;
                  color: #fff;
                  padding: 2px 20px;
                }
                .title {
                  padding: 20px 0;
                  display: flex;
                  align-items: center;
                
                }
                .title > input {
                  border:1px solid #198;
                  flex-grow: 1;
                  color: #fff;
                  padding: 10px 18px;
                  border-radius: 6px;
                  margin-right: 2em;
                  background: #2f343f;
                }
            `}</style>

    </div>
}

export default MilkDown

MilkDown.defaultProps = {
    defaultContent: '',
    defaultTitle: '',
    readOnly: false
}