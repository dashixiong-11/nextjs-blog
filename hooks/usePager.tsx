import React, {useEffect} from "react";
import Link from "next/link";
import _ from 'lodash'

type Options = {
    page: number,
    totalPage: number,
    callback?: (n: number) => string
}
const defaultCallback = (n: number) => `/posts?page=${n}`
export const usePager = (options: Options) => {
    const {page, totalPage, callback} = options
    const _callback = callback || defaultCallback
    const numbers: number[] = []
    numbers.push(1)
    for (let i = page - 3; i <= page + 3; i++) {
        numbers.push(i)
    }
    numbers.push(totalPage)
    const pageNumbers = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage)
        .reduce((accumulator, currentValue) => currentValue - (accumulator[accumulator.length - 1] || 0) === 1 ?
            accumulator.concat(currentValue) : accumulator.concat(-1, currentValue), [])

    const pager = (
        <div className='page-wrapper'>
            {page > 1 && <Link href={_callback(page - 1)}><a> 上一页</a></Link>}
            {pageNumbers.map(n =>
                n === -1 ? <span key={n}>...</span> :
                    n === page ?
                        <span className='current-page' key={n}>{n}</span> : <Link key={n} href={_callback(n)}>
                            <a>{n}</a>
                        </Link>)}
            {page < totalPage && <Link href={_callback(page + 1)}><a> 下一页</a></Link>}
            <style jsx>{`
            .page-wrapper {
            -moz-user-select:none; 
            -webkit-user-select:none;
            -ms-user-select:none; 
            user-select:none;
            margin-top: 1em;
            display: flex;
            justify-content: center;
            position: fixed;
            width: 100%;
            left: 50%;
            bottom: 10px;
            transform: translateX(-50%);
            }
            .page-wrapper > *{
              margin: 0 .5em;
            }
            .current-page {
            text-decoration: underline;
            cursor: no-drop;
            }
`}</style>
        </div>
    )
    return {pager}
}