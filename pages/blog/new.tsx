import React from "react";
import {NextPage} from "next";
import {useForm} from "../../hooks/useForm";
import axios from "axios";

const PostsNew: NextPage = () => {
    const {form} = useForm({
        initFormData: {title: '', content: ''},
        fields: [
            {label: '标题', type: 'text', key: 'title',},
            {label: '内容', type: 'textarea', key: 'content',},
        ],
        buttons: <button type="submit">提交</button>,
        submit: {
            request: formData => axios.post(`/api/v1/posts`, formData),
            successCallback: () => {
                window.alert('发布成功')
            }
        }
    });
    return (
        <div>
            {form}
        </div>
    );
}

export default PostsNew