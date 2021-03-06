export const kLogin = '/login'
export const kNotYet = '/*'
export const kIndex = '/'
export const kIndexMessage = '/index/index-message'
export const kUserManager = '/usermanager/list'
export const kUserEdit = '/usermanager/list/edit/:userId'
export const kUserAdd = '/usermanager/list/add'
export const kUserFunc = '/usermanager/list/func/:userId'
export const kUserSet = '/userset'

export const kReleaseGoods = '/goods/release-goods'
export const kGoodsManager = '/goods/goodsmanager'
export const kGoodsEdit = '/goods/goodsmanager/edit/:goodsId'
export const kGoodsDetail = '/goods/detail/:goodsId'
export const kSkuList = '/goods/sku-list/:goodsId'
export const kTransportManager = '/goods/transport-manager'
export const kTransportAdd = '/goods/transport-manager/add'
export const kTransportEdit = '/goods/transport-manager/edit/:transportTplId'
export const kTransportCopy = '/goods/transport-manager/copy/:transportTplId'
export const kGoodsCate = '/goods/category'
export const kGoodsCateAdd = '/goods/category/add'
export const kGoodsCateEdit = '/goods/category/edit/:supplierCatId'
export const kSpecManager = '/goods/spec-manager'
export const kSpecAdd = '/goods/spec-manager/add'
export const kSpecEdit = '/goods/spec-manager/edit/:specId'
export const kArrivalNotice = '/goods/arrival-notice'

export const kLevelManager = '/membermanager/member-level'
export const kLevelEdit = '/membermanager/member-level/edit/:memberLevelId'
export const kLevelAdd = '/membermanager/member-level/add'
export const kLevelList = '/membermanager/level-list'

export const kDeliveryMode = '/shop/delivery-mode'
export const kDeliveryAdd = '/shop/delivery-mode/add'
export const kDeliveryEdit = '/shop/delivery-mode/edit/:deliveryModeId'
export const kShippingAddress = '/shop/shipping-address'
export const kShippingAddressAdd = '/shop/shipping-address/add'
export const kShippingAddressEdit = '/shop/shipping-address/edit/:addressId'
export const kShopSet = '/shop/set'
export const kShopInfo = '/shop/info'

export const kFullFolding = '/salespromotion/fullfolding'
export const kFullAdd = '/salespromotion/fullfolding/add'
export const kFullEdit = '/salespromotion/fullfolding/edit/:discountId'
export const kFullView = '/salespromotion/fullfolding/view/:discountId'

export const kFullCutManager = '/salespromotion/fullcut'
export const kFullCutAdd = '/salespromotion/fullcut/add'
export const kFullCutEdit = '/salespromotion/fullcut/edit/:discountAmountId'
export const kFullCutView = '/salespromotion/fullcut/view/:discountAmountId'
export const kCouponManager = '/salespromotion/coupon'
export const kCouponAdd = '/salespromotion/coupon/add'
export const kCouponEdit = '/salespromotion/coupon/edit/:couponId'
export const kCouponView = '/salespromotion/coupon/view/:couponId'
export const kCouponDetail = '/salespromotion/coupon/detail/:couponId'

export const kLogManager = '/sys/log-manager/list'

export const kOrderManager = '/order/order-manager'
export const kOrderDetail = '/order/detail/:orderCode'
export const kOrderDelivery = '/order/delivery'
export const kOrderRefund = '/order/refund'
export const kOrderView = '/order/refund/view/:refundRequestCode'
export const kOrderExamine = '/order/refund/examine/:refundRequestCode'
export const kRefundDetail = '/order/refund/detail/:refundRequestCode'
export const kOrderComment = '/order/comment'

export const kSettlementBill = '/settlementmanager/bill'
export const kSettlementDetail = '/settlementmanager/bill/detail/:settlementBillCode'
