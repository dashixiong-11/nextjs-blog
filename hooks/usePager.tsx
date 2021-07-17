import React, {useEffect} from "react";
import Link from "next/link";
import _ from 'lodash'

type Options = {
    page: number,
    totalPage: number,
    callback: (n: number) => string
}
const defaultCallback = (n: number) => `/blog?page=${n}`
export const usePager = (options: Options) => {
    const {page, totalPage, callback} = options
    const _callback = callback || defaultCallback
    const pageArray: number[] = []
    pageArray.push(1)
    for (let i = page - 3; i <= page + 3; i++) {
        pageArray.push(i)
    }
    pageArray.push(totalPage)
    const pageNumbers = _.uniq(pageArray).sort().filter(n => n >= 1 && n <= totalPage).reduce((accumulator, currentValue) => currentValue - (accumulator[accumulator.length - 1] || 0) === 1 ?
        accumulator.concat(currentValue) : accumulator.concat(-1, currentValue)
        , [])


    const pager = (
        <div className='page-wrapper'>
            {page > 1 && <Link href={_callback(page-1)}><a> 上一页</a></Link>}
            {pageNumbers.map(n =>
                n === -1 ? <span key={n}>...</span> :
                    n === page ?
                        <span className='current-page' key={n}>{n}</span> : <Link key={n} href={_callback(n)}>
                            <a>{n}</a>
                        </Link>)}
            {page < totalPage && <Link href={_callback(page + 1)}><a> 下一页</a></Link>}
            <style jsx>{`
            .page-wrapper {
            -moz-user-select:none; /*火狐*/
            -webkit-user-select:none; /*webkit浏览器*/
            -ms-user-select:none; /*IE10*/
            -khtml-user-select:none; /*早期浏览器*/
            user-select:none;
            margin-top: 1em;
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