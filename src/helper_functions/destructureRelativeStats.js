
export default function destructureRelativeStats(state, res) {
    let copyStats = { ...state}
    copyStats.order.today = res.today.total_order
    copyStats.refund.today = res.today.total_refund
    copyStats.avg.today = res.today.average_sales
    copyStats.income.today = res.today.total_income
    copyStats.order.diff = res.prev.total_order === 0 ? (res.today.total_order * 100).toFixed(2) :  (((res.today.total_order - res.prev.total_order) / res.prev.total_order) * 100).toFixed(2)
    copyStats.refund.diff = res.prev.total_refund === 0 ? (res.today.total_refund * 100).toFixed(2) : (((res.today.total_refund - res.prev.total_refund) / res.prev.total_refund) * 100).toFixed(2)
    copyStats.avg.diff = res.prev.average_sales === 0 ? (res.today.average_sales * 100).toFixed(2) : (((res.today.average_sales - res.prev.average_sales) / res.prev.average_sales) * 100).toFixed(2)
    copyStats.income.diff = res.prev.total_income === 0 ? (res.today.total_income).toFixed(2) :  (((res.today.total_income - res.prev.total_income) / res.prev.total_income) * 100).toFixed(2)
    return copyStats
}