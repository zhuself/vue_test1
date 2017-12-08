<template>
  <Row v-if="doneInit" class="layout" type="flex">
    <Col span="4" class="layout-menu-left">
      <div class="layout-user">
        <Avatar :src="supplier.thumbnailUrl" size="large" />
        <div class="layout-user__info">
          <div class="layout-user__name">{{user.realName}}</div>
          <div class="layout-user__role">{{user.userName}}</div>
        </div>
      </div>

      <Menu @on-select="onMenuSelect" ref="menu" :active-name="activeName" theme="dark" width="auto" :open-names="openNames">  
        <Submenu v-for="m in menus" :key="m.supplierMenuId" :name="m.menuName">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            {{m.menuName}}
          </template>
          <MenuItem v-for="sm in m.children" :key="sm.supplierMenuId" :name="sm.menuName">
            {{sm.menuName}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
    <Col ref="body" class="right-panel" span="20">
      <div class="layout-header">
        <router-link :to="{ path: '/index/index-message'}" class="layout-header__logo">
            烟宝订货-店铺端
        </router-link>
        <div @click="userset" class="layout-header__btn">
          <Icon type="gear-a"></Icon>
          用户设置
        </div>
        <div @click="logout" class="layout-header__btn">
          <Icon type="log-out"></Icon>
          退出登录
        </div>
      </div>
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem v-for="b in breadcrumb" :key="b.url" :href="b.url ? b.url : ''">
            {{b.name}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <keep-alive>
          <router-view  class="layout-content-main" v-if="$route.meta.keepAlive">
          </router-view>
        </keep-alive>
        <router-view class="layout-content-main" v-if="!$route.meta.keepAlive">
        </router-view>
      </div>
    </Col>
    <div class="tool">
      <div v-if="toTopOpacity > 0.1" @click="toTop" class="to-top" :style="{ opacity: toTopOpacity }">
        <Icon class="tool__icon" type="arrow-up-b"></Icon>
      </div>
      <div v-if="!$route.meta.topLevel" @click="goback" class="goback">
        <Icon class="tool__icon" type="arrow-left-b"></Icon>
      </div>
    </div>
  </Row>
  <div v-else></div>
</template>

<script>
import sysApi from '@/api/Sys'
import * as R from '@/router/router-types'
import UserService from '@/service/UserService'
import SysDict from '@/service/SysDict'
import DistrictService from '@/service/DistrictService'
import PlatformCateService from '@/service/PlatformCateService'

/**
 * 适配器，适配原有的html页面的url到当前项目的router的url
 */
let adaptor = {
  'uw/supplieruseraccount/supplieruseraccount.html': R.kUserManager,
  'release_goods_menu': R.kReleaseGoods,
  'goods/goods/goods.html': R.kGoodsManager,
  'goods/arrivalnotice/arrivalnotice.html': R.kArrivalNotice,
  'syslog/syslog/syslog.html': R.kLogManager,
  'cate_menu': R.kGoodsCate,
  'spec_menu': R.kSpecManager,
  'three_menu': R.kTransportManager,
  'order/ordermanage/order.html': R.kOrderManager,
  'shop_set_menu': R.kShopSet,
  'shop_info_menu': R.kShopInfo,
  'send_way_menu': R.kDeliveryMode,
  'coupon_menu': R.kCouponManager,
  'full_cut_menu': R.kFullCutManager,
  'member_level_menu': R.kLevelManager,
  'member_list_menu': R.kLevelList,
  'discount_menu': R.kFullFolding,
  'order/delivergoodsmanage/delivergoods.html': R.kOrderDelivery,
  'order/refundrequest/refundrequest.html': R.kOrderRefund,
  'trade/comment/comment.html': R.kOrderComment,
  'finance/settlementmanage/settlementbill.html': R.kSettlementBill,
  'send_or_back_addr_menu': R.kShippingAddress
}

export default {
  data () {
    return {
      logoUrl: require('@/assets/imgs/yanbao.png'),
      user: {},
      supplier: {},
      menus: [],
      openNames: [],
      activeName: '',
      bodyTop: 0,
      doneInit: false,
      shopMenu: {
        id: 14,
        menuGrade: 1,
        menuName: '店铺',
        parentSupplierMenuId: -1,
        supplierMenuId: 14,
        text: '店铺',
        url: null,
        attributes: {},
        children: [{
          attributes: {leaf: true},
          children: [],
          id: 141,
          menuGrade: 2,
          menuName: '店铺设置',
          parentSupplierMenuId: 14,
          supplierMenuId: 141,
          text: '店铺设置',
          url: 'shop_set_menu'
        }, {
          attributes: {leaf: true},
          children: [],
          id: 142,
          menuGrade: 2,
          menuName: '店铺信息',
          parentSupplierMenuId: 14,
          supplierMenuId: 142,
          text: '店铺信息',
          url: 'shop_info_menu'
        }, {
          attributes: {leaf: true},
          children: [],
          id: 143,
          menuGrade: 2,
          menuName: '配送方式',
          parentSupplierMenuId: 14,
          supplierMenuId: 143,
          text: '配送方式',
          url: 'send_way_menu'
        }, {
          attributes: {leaf: true},
          children: [],
          id: 144,
          menuGrade: 2,
          menuName: '发/退货地址',
          parentSupplierMenuId: 14,
          supplierMenuId: 144,
          text: '发/退货地址',
          url: 'send_or_back_addr_menu'
        }]
      },
      activityMenu: {
        id: 15,
        menuGrade: 1,
        menuName: '促销',
        parentSupplierMenuId: -1,
        supplierMenuId: 15,
        text: '促销',
        url: null,
        attributes: {},
        children: [{
          attributes: {leaf: true},
          children: [],
          id: 151,
          menuGrade: 2,
          menuName: '优惠券',
          parentSupplierMenuId: 15,
          supplierMenuId: 151,
          text: '优惠券',
          url: 'coupon_menu'
        }, {
          attributes: {leaf: true},
          children: [],
          id: 152,
          menuGrade: 2,
          menuName: '满折活动',
          parentSupplierMenuId: 15,
          supplierMenuId: 152,
          text: '满折活动',
          url: 'discount_menu'
        }, {
          attributes: {leaf: true},
          children: [],
          id: 153,
          menuGrade: 2,
          menuName: '满减活动',
          parentSupplierMenuId: 15,
          supplierMenuId: 153,
          text: '满减活动',
          url: 'full_cut_menu'
        }]
      },
      memberMenu: {
        id: 16,
        menuGrade: 1,
        menuName: '会员',
        parentSupplierMenuId: -1,
        supplierMenuId: 16,
        text: '会员',
        url: null,
        attributes: {},
        children: [{
          attributes: {leaf: true},
          children: [],
          id: 161,
          menuGrade: 2,
          menuName: '会员等级',
          parentSupplierMenuId: 16,
          supplierMenuId: 161,
          text: '会员等级',
          url: 'member_level_menu'
        }, {
          attributes: {leaf: true},
          children: [],
          id: 162,
          menuGrade: 2,
          menuName: '会员列表',
          parentSupplierMenuId: 16,
          supplierMenuId: 162,
          text: '会员列表',
          url: 'member_list_menu'
        }]
      }
    }
  },
  mounted () {
    this.$indicator.open()
    Promise.all([
      UserService.loadUserFunc(),
      SysDict.load(),
      DistrictService.load(),
      PlatformCateService.load()
    ]).then(() => {
      this.$indicator.close()
      this.doneInit = true
      this.$nextTick(() => {
        // 加载初始数据成功后开始初始化页面
        this.user = UserService.getUser()
        this.supplier = UserService.getSupplier()
        this.$refs.body.$el.addEventListener('scroll', this.handleScroll)
        this.$indicator.open()
        // this.loadData()
        sysApi.findLicensedMenuEasyUI().then((res) => {
          // 注：商品分类和规格管理菜单未配置，暂时先手动添加
          this.menus = res.map(_r => {
            if (_r.id === 3) {
              _r.children = [{
                menuName: '商品发布',
                url: 'release_goods_menu',
                supplierMenuId: 111,
                parentSupplierMenuId: 3
              },
                ..._r.children,
              {
                menuName: '商品分类',
                url: 'cate_menu',
                supplierMenuId: 112,
                parentSupplierMenuId: 3
              }, {
                menuName: '规格管理',
                url: 'spec_menu',
                supplierMenuId: 113,
                parentSupplierMenuId: 3
              }, {
                menuName: '运费模板',
                url: 'three_menu',
                supplierMenuId: 114,
                parentSupplierMenuId: 3
              }].filter(_sub => {
                return _sub.id !== 4
              })
            }
            if (_r.id === 6) {
              _r.children = _r.children.filter(_c => {
                return _c.id !== 17
              })
            }
            return _r
          })
          this.menus = [...this.menus, this.shopMenu, this.activityMenu, this.memberMenu]
          this.activeMenu(this.$route)
          this.$indicator.close()
        }).catch(err => {
          this.$Modal.error({ title: '失败', content: `获取数据失败${err.message || ''}` })
          this.$indicator.close()
        })
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.activeMenu(to)
    next()
  },
  methods: {
    activeMenu (to) {
      // 层级菜单转化成菜单数组
      let allMenuItem = this.menus.reduce((sofar, m) => {
        return [...sofar, ...m.children]
      }, [])

      // 将当前的url映射成新旧的url
      let url = ''
      for (let key in adaptor) {
        if (adaptor[key] && to.path.indexOf(adaptor[key]) !== -1) {
          // 旧的菜单
          url = key
          break
        }
      }

      // 根据旧的url找到菜单
      let menu = allMenuItem.find(m => {
        return m.url === url
      })

      // 如果找到了菜单，那么找到他的父菜单，并展开
      if (menu) {
        this.activeName = menu.menuName
        let parent = this.menus.find(m => {
          return m.supplierMenuId === menu.parentSupplierMenuId
        })
        if (!this.openNames.find(op => op === parent.menuName)) {
          this.openNames.push(parent.menuName)
        }
      } else {
        this.activeName = ''
        this.openNames = []
      }

      this.$nextTick(() => {
        if (this.$refs.menu) {
          this.$refs.menu.updateOpened()
          this.$refs.menu.updateActiveName()
        }
      })
    },
    onMenuSelect (name) {
      let allMenuItem = this.menus.reduce((sofar, m) => {
        return [...sofar, ...m.children]
      }, [])

      let menu = allMenuItem.find(m => {
        return m.menuName === name
      })
      if (menu.url) {
        this.showIndex = false
      } else {
        this.showIndex = true
      }
      this.$router.push({ path: adaptor[menu.url] })
    },
    handleScroll (e) {
      this.bodyTop = e.target.scrollTop
    },
    toTop () {
      this.bodyTop = 0
      this.$refs.body.$el.scrollTop = 0
    },
    userset () {
      this.$router.push({ path: R.kUserSet })
    },
    logout () {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认退出登录吗？',
        onOk: () => {
          this.$Notice.destroy()
          UserService.localLogout()
          this.$router.push({ path: R.kLogin })
        }
      })
    },
    goback () {
      this.$router.go(-1)
    }
  },
  computed: {
    toTopOpacity () {
      if (this.bodyTop > 200) {
        return 0.6
      }
      return this.bodyTop / 200 * 0.6
    },
    breadcrumb () {
      return this.$route.meta.bread
    }
  }
}
</script>

<style lang="less" scoped>
@tabbar-height: 60px;
@breadcrumb-height: 30px;
@content-margin: 15px;

.layout {
  background: #f5f7f9;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.layout-breadcrumb {
  height: @breadcrumb-height;
  padding: 10px 15px 0;
}

.layout-content {
  min-height: calc(~"100% - @{tabbar-height} - @{breadcrumb-height} - @{content-margin}");
  margin: @content-margin;
  margin-bottom: 0px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-menu-left {
  background: #464c5b;
  overflow-y: scroll;
  overflow-x: hidden;
}

.layout-header {
  text-align: right;
  height: @tabbar-height;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);

  &__btn {
    font-size: 13px;
    display: inline-block;
    padding: 20px 10px;
    height: 100%;
    cursor: pointer;
  }

  &__logo {
    float: left;
    font-size: 15px;
    font-style: italic;
    margin-left: 15px;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    cursor: pointer;
    color: gray;
  }

  &__btn:hover {
    background-color: #efefef;
  }
}

.layout-user {
  height: 50px;
  margin: 15px 24px;
  display: flex;
  align-items: center;
  color: white;

  &__info {
    margin-left: 10px;
  }

  &__name {
    font-size: 15px;
  }

  &__role {
    font-size: 12px;
    color: #aaa;
  }
}

.right-panel {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}

.tool {
  position: fixed;
  right: 40px;
  bottom: 60px;
  z-index: 999;

  &__icon {
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
}

.goback, .to-top {
  opacity: .6;
  color: white;
  background-color: #58b7ff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
}

.goback {
  background-color: #5f5f5f;
}

.to-top {
  transition: .3s;
  margin-bottom: 10px;

  &:hover {
    opacity: 1
  }
}

/*默认滚动条样式*/
::-webkit-scrollbar {
    width: 2px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: #eee;
}
::-webkit-scrollbar-thumb {
    border: 1px #808080 solid;
    border-radius: 10px;
    background: #999;
}
::-webkit-scrollbar-thumb:hover {
    background: #7d7d7d;
}
</style>
