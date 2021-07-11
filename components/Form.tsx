import React from "react";

type Props = {
    fields: { label: string,type:'text'|'password' }[]
}
export const Form: React.FC<Props> = props => {
    return <form>
        {props.fields.map(field =>
            <div>
                <label>
                    {field.label}
                    <input type={field.type}/>
                </label>
            </div>
        )}
    </form>
}