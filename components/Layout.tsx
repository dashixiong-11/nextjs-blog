import React, {FunctionComponent, ReactElement, ReactNode} from "react";
import {SideCover} from "./SideCover";

type PropsWithChildren<P> = P & { children?: ReactNode };

export const Layout: React.FC = (props:PropsWithChildren<any>) => {
    return <div className='layout'>
            <div className="left-side">
                <SideCover />
            </div>
            <div className="right-side">
                {props.children}
            </div>
        <style jsx>
            {`
              .layout {
                display: flex;
                flex-grow: 1;
              }

              .left-side {
                width: 40%;
                border-right: 1px solid #cecece;
              }

              .right-side {
                position: relative;
                height: 88vh;
                width: 60%;
                overflow: auto;
              }
            `}

        </style>
    </div>
}
