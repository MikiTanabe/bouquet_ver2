export function formatDate ( date, strDigit ) {
    var rtnDate = ''
    var tYear = date.getFullYear()
    var tMonth = date.getMonth() + 1
    tMonth = '0' + tMonth
    tMonth = tMonth.slice(-2)
    var tDate = date.getDate()
    tDate = '0' + tDate
    tDate = tDate.slice(-2)
    rtnDate = tYear + strDigit + tMonth + strDigit + tDate
    return rtnDate
}

export function bqDateParse ( strDate ) {
    //YYYY-MM-DD用
    let year = strDate.substr( 0, 4 )
    let month = strDate.substr( 5, 2 ) - 1
    let date = strDate.substr( 8, 2 )
    return new Date( year, month, date)
}

export function getMidnight ( date ) {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let tmpDate = new Date(year, month, day, 0, 0, 0)
    return tmpDate
}

//タイムスタンプを含む配列を日付順に並び替える
export function sortObjectArrayTS (array) {
    var wkArray = array.concat()
    wkArray.sort((a, b) => {
        return a.timestamp - b.timestamp
    })
    return wkArray
}

//メニュー配列を文字列に変換する
export function generateMenuStr(objMenu){

    var menuStr = ''
    Object.keys(objMenu).forEach(key => {
        objMenu[key].forEach(menu => {
            menuStr += menu + '/'
        })
    })
    return menuStr.slice(0, -1)
}