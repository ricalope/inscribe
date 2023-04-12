export const sortDates = array => {
    return array.sort((a, b) => {
        if(new Date(a.created_at) < new Date(b.created_at)) {
            return 1
        } else if(new Date(a.created_at) > new Date(b.created_at)) {
            return -1
        } else {
            return 0
        }
    })
}
