// 分发获取用户信息的mutation
export const userInit = store => store.dispatch('USERINIT')
export const userInfo = store => store.dispatch('USERINFO')
// 分发获取所有商品信息的mutation
export const waresInfo = store => store.dispatch('WARESINFO')
// 分发获取选购商品信息的mutation
export const wareInit = store => store.dispatch('WAREINIT')
export const wareInfo = (store, wareId) => store.dispatch('WAREINFO', wareId)
// 分发修改订单信息的mutation
export const orderInit = store => store.dispatch('ORDERINIT')
export const orderWares = (store, ware) => store.dispatch('ORDERWARES', ware)
