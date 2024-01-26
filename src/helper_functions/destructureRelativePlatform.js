
export default function destructureRelativePlatform(state, res) {
    let copyStats = { }
    let statsArr = []
    for (let items in res.today.platformStats) {
        if (Object.keys(copyStats).includes(items)) {
            copyStats[items] += res.today.platformStats[items] 
        } else {
            copyStats[items] = res.today.platformStats[items]
        }
        // res.today.total_income
    }

    for (let items in copyStats) {
        statsArr.push({percentage: Math.round((copyStats[items] / res.today.total_income )*100), val: copyStats[items], name: items })
    }

    return statsArr
}